import { NextResponse } from "next/server";

import { MAX_QUESTIONS_PER_SIMULATION } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import {
  simulatorTranscriptSchema,
  simulatorTurnSchema,
} from "@/lib/validations/simulator";
import { CLAUDE_MODEL, getClaude } from "@/server/ai/claude";
import {
  buildSimulatorSystemPrompt,
  SIMULATOR_START_MESSAGE,
} from "@/server/ai/prompts/simulator";
import { getUser } from "@/server/auth";
import { hasProAccess } from "@/server/billing";

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return fail("unauthorized", 401);
  if (!(await hasProAccess(user.id))) return fail("pro_required", 403);

  const parsed = simulatorTurnSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) return fail("invalid_request", 400);
  const { simulationId, message } = parsed.data;

  // El historial sale de la base de datos, nunca del cuerpo de la petición.
  const supabase = await createClient();
  const { data: simulation, error } = await supabase
    .from("interview_simulations")
    .select("interview_type, target_role, transcript, started_at, ended_at")
    .eq("id", simulationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return fail("server_error", 500);
  if (!simulation) return fail("not_found", 404);
  if (simulation.ended_at) return fail("simulation_ended", 409);

  const stored = simulatorTranscriptSchema.safeParse(
    simulation.transcript ?? [],
  );
  if (!stored.success) return fail("invalid_transcript", 409);
  const transcript = stored.data;

  const asked = transcript.filter((turn) => turn.role === "assistant").length;
  if (asked >= MAX_QUESTIONS_PER_SIMULATION) {
    return fail("question_limit_reached", 409);
  }

  const userText =
    message ?? (transcript.length === 0 ? SIMULATOR_START_MESSAGE : null);
  if (!userText) return fail("invalid_request", 400);

  const conversation = [
    ...transcript,
    { role: "user" as const, content: userText },
  ];

  const claudeStream = getClaude().beta.messages.stream(
    {
      model: CLAUDE_MODEL,
      max_tokens: 8000,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: buildSimulatorSystemPrompt({
        interviewType: simulation.interview_type,
        targetRole: simulation.target_role,
        questionNumber: asked + 1,
      }),
      messages: conversation,
    },
    { signal: request.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let reply = "";
        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            reply += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await claudeStream.finalMessage();
        if (final.stop_reason === "refusal" || !reply) {
          throw new Error(`Turno no válido: ${final.stop_reason}`);
        }

        // Solo se guarda un turno completo; si falla, se puede repetir.
        const { error: saveError } = await supabase
          .from("interview_simulations")
          .update({
            transcript: [...conversation, { role: "assistant", content: reply }],
            started_at: simulation.started_at ?? new Date().toISOString(),
          })
          .eq("id", simulationId)
          .eq("user_id", user.id);
        if (saveError) throw saveError;

        controller.close();
      } catch (streamError) {
        console.error("Error en el simulador", simulationId, streamError);
        controller.error(new Error("simulator_failed"));
      }
    },
    cancel() {
      claudeStream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
