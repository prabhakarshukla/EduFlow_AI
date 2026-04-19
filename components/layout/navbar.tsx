'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

const navLinks = [
  { label: 'Home',     href: '/#home' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing',  href: '/pricing' },
  { label: 'About',    href: '/about' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!alive) return;
      setUser(data.user ?? null);
      setAuthReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        background: scrolled
          ? 'rgba(34, 32, 34, 0.90)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(110, 231, 216, 0.12)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 gap-5">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EduFlow AI"
              style={{
                height: '52px',
                width: 'auto',
                display: 'block',
                
              }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 flex-1 justify-center min-w-0 px-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 lg:px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color      = 'var(--primary)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(110,231,216,0.07)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color      = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 flex-shrink-0 whitespace-nowrap">
            {authReady && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 lg:px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(110,231,216,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  Open App
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 lg:px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(110,231,216,0.18)',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#f87171';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,113,113,0.35)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.18)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 lg:px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(110,231,216,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  Log in
                </Link>
                <Link href="/auth/signup" className="btn-primary text-xs px-5 py-2.5 whitespace-nowrap">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ color: 'var(--primary)' }}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div
            className="md:hidden pb-5 pt-3"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              {authReady && user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors"
                    style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
                  >
                    Open App
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors"
                    style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.30)', background: 'rgba(248,113,113,0.08)' }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors"
                    style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
                  >
                    Log in
                  </Link>
                  <Link href="/auth/signup" className="btn-primary justify-center py-2.5 text-xs">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
