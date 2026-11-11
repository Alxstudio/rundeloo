import { z } from "zod";

export const simulatorTurnSchema = z.strictObject({
  simulationId: z.uuid(),
  // Optional only on the first turn, when the interviewer starts.
  message: z.string().trim().min(1).max(4000).optional(),
});

export const simulatorTranscriptSchema = z.array(
  z.strictObject({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1),
  }),
);

export type SimulatorTurn = z.infer<typeof simulatorTurnSchema>;
