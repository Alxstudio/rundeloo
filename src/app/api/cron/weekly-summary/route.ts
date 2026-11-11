import { createHash, timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { requireServerEnv } from "@/server/env";

const digest = (value: string) => createHash("sha256").update(value).digest();

function isAuthorized(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${requireServerEnv("CRON_SECRET")}`;
  return timingSafeEqual(digest(header), digest(expected));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // TODO: generate and store the summaries with createAdminClient().
  return NextResponse.json({ error: "not_implemented" }, { status: 501 });
}
