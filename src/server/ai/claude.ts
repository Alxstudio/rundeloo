import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import { requireServerEnv } from "@/server/env";

export const CLAUDE_MODEL = "claude-opus-5-5";

export function getClaude() {
  return new Anthropic({ apiKey: requireServerEnv("ANTHROPIC_API_KEY") });
}
