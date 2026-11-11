import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  needsOnboardingStatus,
  resolveRedirect,
  type AccessState,
} from "@/lib/route-access";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

type ProxyClient = ReturnType<typeof createServerClient<Database>>;

/** null when the profile can't be read, so a database hiccup never locks the user out. */
async function getOnboardingCompleted(supabase: ProxyClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Could not read onboarding status", userId, error);
    return null;
  }

  return data?.onboarding_completed ?? null;
}

export async function updateSession(request: NextRequest) {
  const { url, publishableKey } = getSupabasePublicEnv();
  let response = NextResponse.next({ request });
  let cacheHeaders: Record<string, string> = {};

  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        cacheHeaders = headers;
        Object.entries(headers).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  // getUser() validates the token with Supabase. Don't replace it with getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const state: AccessState = user
    ? {
        signedIn: true,
        onboardingCompleted: needsOnboardingStatus(pathname)
          ? await getOnboardingCompleted(supabase, user.id)
          : null,
      }
    : { signedIn: false };

  const destination = resolveRedirect(pathname, state);
  if (!destination) return response;

  const target = request.nextUrl.clone();
  target.pathname = destination;
  target.search = "";
  const redirect = NextResponse.redirect(target);
  // Without this, the cookies of a just-refreshed session would be lost.
  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  Object.entries(cacheHeaders).forEach(([key, value]) =>
    redirect.headers.set(key, value),
  );
  return redirect;
}
