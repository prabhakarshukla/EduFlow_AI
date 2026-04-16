'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

const sidebarLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    label: 'Study Planner',
    href: '/dashboard/study-planner',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    label: 'AI Doubt Solver',
    href: '/dashboard/doubt-solver',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    label: 'Notes',
    href: '/dashboard/notes',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    label: 'Productivity',
    href: '/dashboard/productivity',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    label: 'Mood Tracker',
    href: '/dashboard/mood',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const lastProfileSyncUserId = useRef<string | null>(null);

  const currentPage = sidebarLinks.find(l => l.href === pathname)?.label ?? 'Dashboard';
  const nextPathForLogin = useMemo(() => `/auth/login?next=${encodeURIComponent(pathname || '/dashboard')}`, [pathname]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data.user ?? null);
      setAuthReady(true);
      if (!data.user) router.replace(nextPathForLogin);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
      if (!session?.user) router.replace(nextPathForLogin);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router, nextPathForLogin]);

  useEffect(() => {
    if (!authReady || !user) return;
    if (lastProfileSyncUserId.current === user.id) return;
    lastProfileSyncUserId.current = user.id;

    const fullName =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      null;
    const avatarUrl =
      (user.user_metadata?.avatar_url as string | undefined) ||
      (user.user_metadata?.picture as string | undefined) ||
      null;

    const basePayload = {
      id: user.id,
      ...(fullName ? { full_name: fullName } : {}),
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    };

    (async () => {
      try {
        // Try a richer payload first (in case your profiles table includes these columns).
        const richPayload = {
          ...basePayload,
          user_id: user.id,
          email: user.email ?? null,
        } as Record<string, unknown>;

        const { error: richError } = await supabase
          .from('profiles')
          .upsert(richPayload, { onConflict: 'id' });

        if (!richError) return;

        // Fallback: minimal columns that match the common profiles schema.
        await supabase.from('profiles').upsert(basePayload, { onConflict: 'id' });
      } catch {
        // Intentionally silent: profile sync should never block dashboard access.
      }
    })();
  }, [authReady, user]);

  const displayEmail = user?.email ?? '';
  const displayName = (user?.user_metadata?.full_name as string | undefined) ?? 'Student';
  const avatarLetter = (displayName?.trim()?.[0] ?? displayEmail?.trim()?.[0] ?? 'S').toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#222022', paddingTop: '64px' }}>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed md:relative z-30 flex flex-col h-full md:h-auto min-h-screen
          transition-all duration-300 flex-shrink-0
          ${mobileOpen ? 'left-0' : '-left-64 md:left-0'}
        `}
        style={{
          top: '64px',
          height: 'calc(100vh - 64px)',
          width: collapsed ? '68px' : '232px',
          background: '#1c1a1c',
          borderRight: '1px solid rgba(110,231,216,0.10)',
        }}
      >
        {/* Logo row */}
        <div
          className="flex items-center px-4 py-5 gap-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(110,231,216,0.08)', minHeight: '72px' }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              transition: 'filter 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.filter =
                'drop-shadow(0 0 8px rgba(110,231,216,0.45))';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.filter = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            {collapsed ? (
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)',
                  boxShadow: '0 0 12px rgba(110,231,216,0.25)',
                }}
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 18 18">
                  <path d="M3 13V5.5C3 4.67 3.67 4 4.5 4H13.5C14.33 4 15 4.67 15 5.5V10.5C15 11.33 14.33 12 13.5 12H7L3 16V13Z" />
                </svg>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/logo.png"
                alt="EduFlow AI"
                style={{ height: '52px', width: 'auto', display: 'block' }}
              />
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="ml-auto p-1.5 rounded-lg transition-all duration-150"
              style={{ color: 'rgba(110,231,216,0.4)' }}
              aria-label="Collapse sidebar"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#6EE7D8';
                (e.currentTarget as HTMLElement).style.background = 'rgba(110,231,216,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(110,231,216,0.4)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150"
              style={{
                background: '#1c1a1c',
                border: '1px solid rgba(110,231,216,0.22)',
                color: '#6EE7D8',
              }}
              aria-label="Expand sidebar"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Section label */}
        {!collapsed && (
          <p
            className="px-5 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(110,231,216,0.35)' }}
          >
            Navigation
          </p>
        )}

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5 px-2 pb-4 flex-1">
          {sidebarLinks.map(({ label, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  color:      active ? '#6EE7D8'                  : 'rgba(255,255,255,0.45)',
                  background: active ? 'rgba(110,231,216,0.10)'   : 'transparent',
                  borderLeft: active ? '2px solid #6EE7D8'        : '2px solid transparent',
                  boxShadow:  active ? '0 0 12px rgba(110,231,216,0.08)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color      = '#6EE7D8';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(110,231,216,0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color      = 'rgba(255,255,255,0.45)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.7} d={icon} />
                </svg>
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User row */}
        <div
          className="flex-shrink-0 px-3 py-4"
          style={{ borderTop: '1px solid rgba(110,231,216,0.08)' }}
        >
          {collapsed ? (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mx-auto"
              style={{ background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)', color: '#111' }}
            >
              {avatarLetter}
            </div>
          ) : (
            <div className="flex items-center gap-3 px-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)', color: '#111' }}
              >
                {avatarLetter}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: '#d1faf5' }}>
                  {displayName}
                </p>
                <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {displayEmail || ' '}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={!authReady}
                title="Log out"
                className="p-1.5 rounded-lg transition-all duration-150"
                style={{ color: 'rgba(255,255,255,0.3)', opacity: !authReady ? 0.6 : 1 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header
          className="flex-shrink-0 flex items-center gap-4 px-6 py-4"
          style={{
            borderBottom: '1px solid rgba(110,231,216,0.10)',
            background: 'rgba(34,32,34,0.95)',
            backdropFilter: 'blur(12px)',
            minHeight: '64px',
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-colors duration-150"
            style={{ color: '#6EE7D8' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page title breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>EduFlow AI</span>
            <span style={{ color: 'rgba(110,231,216,0.35)' }}>/</span>
            <span className="font-semibold" style={{ color: '#d1faf5' }}>{currentPage}</span>
          </div>

          {/* Right — search + avatar */}
          <div className="ml-auto flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(110,231,216,0.12)',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
              </svg>
              Search…
            </div>

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)', color: '#111' }}
            >
              S
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ background: '#222022' }}>
          {authReady && user ? children : null}
        </main>
      </div>
    </div>
  );
}
