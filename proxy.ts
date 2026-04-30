import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseConfig } from './lib/supabase-config';

function redirectTo(request: NextRequest, pathname: string, searchParams?: Record<string, string>) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';

  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) url.searchParams.set(k, v);
  }

  return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  // We only match the routes below via config.matcher, but keep logic explicit.
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  const publicAuthRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/update-password',
  ];
  const redirectAuthenticatedAuthRoutes = ['/auth/login', '/auth/signup'];
  const isPublicAuthRoute = publicAuthRoutes.includes(pathname);
  const shouldRedirectAuthenticatedUser = redirectAuthenticatedAuthRoutes.includes(pathname);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Important: write auth cookie updates onto the response
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Validates the session using the auth cookies; returns null user if not authenticated.
  const { data: { user } } = await supabase.auth.getUser();

  // 1) Protect /dashboard/**
  if (isDashboardRoute && !user) {
    const next = `${pathname}${search ?? ''}`;
    return redirectTo(request, '/auth/login', { next });
  }

  // 2) Prevent logged-in users from visiting /auth/login or /auth/signup
  if (shouldRedirectAuthenticatedUser && user) {
    return redirectTo(request, '/dashboard');
  }

  // 3) Keep reset-password routes publicly reachable, including Supabase recovery URLs.
  if (isPublicAuthRoute) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/update-password',
  ],
};
