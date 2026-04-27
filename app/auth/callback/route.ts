import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase-config";

function getSafeNextPath(value: string | null) {
  if (!value) return "/dashboard";

  try {
    const decoded = value.startsWith("%2F") ? decodeURIComponent(value) : value;
    return decoded.startsWith("/") && !decoded.startsWith("//")
      ? decoded
      : "/dashboard";
  } catch {
    return "/dashboard";
  }
}

function redirectToLogin(request: NextRequest, message: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";
  url.search = "";
  url.searchParams.set("authError", message);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const providerError =
    request.nextUrl.searchParams.get("error_description") ||
    request.nextUrl.searchParams.get("error");

  if (providerError) {
    return redirectToLogin(request, providerError);
  }

  if (!code) {
    return redirectToLogin(
      request,
      "Confirmation link is missing or expired. Please request a new sign-in link.",
    );
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = nextPath;
  redirectUrl.search = "";

  let response = NextResponse.redirect(redirectUrl);
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectToLogin(
      request,
      error.message || "Could not confirm your email. Please try logging in again.",
    );
  }

  return response;
}
