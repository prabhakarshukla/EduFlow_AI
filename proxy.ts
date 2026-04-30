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
  const searchParams = request.nextUrl.searchParams;

  // We only match the routes below via config.matcher, but keep logic explicit.
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  const publicAuthRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/update-password',
  ];
  const isPublicAuthRoute = publicAuthRoutes.includes(pathname);
  const hasRecoveryParams =
    searchParams.get('type') === 'recovery' ||
    searchParams.has('code') ||
    searchParams.has('access_token') ||
    searchParams.has('refresh_token');

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Supabase recovery URLs must never be routed away before the client restores a session.
  if (isPublicAuthRoute || hasRecoveryParams) {
    return response;
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
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
