import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

// Lista de rutas públicas: cualquier ruta nueva nace protegida.
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
];
const GUEST_ONLY_PATHS = ["/login", "/register", "/forgot-password"];

const matches = (pathname: string, paths: string[]) =>
  paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

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

  // getUser() valida el token contra Supabase. No sustituir por getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const redirectTo = (path: string) => {
    const target = request.nextUrl.clone();
    target.pathname = path;
    target.search = "";
    const redirect = NextResponse.redirect(target);
    // Sin esto se perderían las cookies de una sesión recién refrescada.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    Object.entries(cacheHeaders).forEach(([key, value]) =>
      redirect.headers.set(key, value),
    );
    return redirect;
  };

  if (!user && pathname !== "/" && !matches(pathname, PUBLIC_PATHS)) {
    return redirectTo("/login");
  }

  if (user && matches(pathname, GUEST_ONLY_PATHS)) {
    return redirectTo("/dashboard");
  }

  return response;
}
