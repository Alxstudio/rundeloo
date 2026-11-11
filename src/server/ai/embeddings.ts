import "server-only";

import { z } from "zod";

import { requireServerEnv } from "@/server/env";

const VOYAGE_MODEL = "voyage-3.5";
const EMBEDDING_DIMENSIONS = 1024;

const responseSchema = z.object({
  data: z.array(z.object({ embedding: z.array(z.number()) })).min(1),
});

/** Returns the 1024-dimension vector stored in notes.embedding. */
export async function createEmbedding(
  input: string,
  inputType: "document" | "query",
) {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireServerEnv("VOYAGE_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: VOYAGE_MODEL,
      input: [input],
      input_type: inputType,
      output_dimension: EMBEDDING_DIMENSIONS,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Voyage AI responded with ${response.status}`);
  }

  const { embedding } = responseSchema.parse(await response.json()).data[0];
  if (embedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error("Voyage AI returned a vector of unexpected size");
  }

  return embedding;
}
