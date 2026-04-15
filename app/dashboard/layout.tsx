'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Sidebar ── */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all duration-300"
        style={{
          width: collapsed ? '68px' : '240px',
          background: '#1a181a',
          borderRight: '1px solid rgba(110,231,216,0.10)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center px-4 py-5"
          style={{ borderBottom: '1px solid rgba(110,231,216,0.08)' }}
        >
          <Link href="/" className="logo-wrap flex-shrink-0">
            {collapsed ? (
              /* Collapsed: icon-only fallback */
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)' }}
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 18 18">
                  <path d="M3 13V5.5C3 4.67 3.67 4 4.5 4H13.5C14.33 4 15 4.67 15 5.5V10.5C15 11.33 14.33 12 13.5 12H7L3 16V13Z"/>
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
              className="ml-auto p-1.5 rounded-lg opacity-40 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--primary)' }}
              aria-label="Collapse sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}

          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="mt-3 p-1.5 rounded-lg opacity-40 hover:opacity-100 transition-opacity self-center"
              style={{ color: 'var(--primary)', marginLeft: 'auto', marginRight: 'auto' }}
              aria-label="Expand sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
          {sidebarLinks.map(({ label, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  color:      active ? 'var(--primary)'    : 'var(--text-muted)',
                  background: active ? 'rgba(110,231,216,0.10)' : 'transparent',
                  boxShadow:  active ? 'var(--glow-sm)'    : 'none',
                }}
              >
                <svg className="w-4.5 h-4.5 flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.7} d={icon} />
                </svg>
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User/logout */}
        {!collapsed && (
          <div
            className="px-4 py-4"
            style={{ borderTop: '1px solid rgba(110,231,216,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)', color: '#111' }}
              >
                S
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-body)' }}>Student</p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>student@eduflowai.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
