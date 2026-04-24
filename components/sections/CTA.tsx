'use client';

import Link from 'next/link';

const trust = [
  { icon: '✓', text: 'Free forever plan' },
  { icon: '✓', text: 'No credit card required' },
  { icon: '✓', text: 'Cancel anytime' },
];

export default function Cta() {
  return (
    <section
      className="relative py-36 overflow-hidden"
      style={{ background: '#fcfcf9' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.18), transparent)' }}
        aria-hidden="true"
      />

      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(110,231,216,0.22) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-48 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'rgba(249,216,193,0.33)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-48 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'rgba(196,181,253,0.30)' }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(20,184,166,0.06) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'transparent',
          border: '1px solid rgba(196,181,253,0.25)',
          boxShadow: 'inset 0 0 80px rgba(196,181,253,0.12)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center gap-8">

        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            background: '#f5f7f4',
            color: '#14b8a6',
            border: '1px solid #e5e7eb',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#6ee7d8' }}
          />
          Built for focused student workflows
        </div>

        <div className="flex flex-col gap-3">
          <h2
            className="font-extrabold tracking-tight leading-[1.06]"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              color: '#1f2937',
              letterSpacing: '-0.025em',
            }}
          >
            Your smarter study life{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #6ee7d8 60%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200%',
                animation: 'shimmer 4s ease infinite',
              }}
            >
              starts right now.
            </span>
          </h2>
          <p
            className="leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: '1.0625rem', color: '#6b7280' }}
          >
            No credit card. No setup. Just sign up in 30 seconds and start planning,
            learning, and achieving — with AI always by your side.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-sm font-bold transition-all duration-200"
            style={{
              background: '#14b8a6',
              color: '#ffffff',
              boxShadow: '0 8px 28px rgba(20,184,166,0.24)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 12px 34px rgba(20,184,166,0.32)';
              el.style.transform = 'translateY(-3px) scale(1.015)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 8px 28px rgba(20,184,166,0.24)';
              el.style.transform = 'translateY(0) scale(1)';
            }}
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = '#14b8a6';
              el.style.color = '#0f766e';
              el.style.background = '#f5fffe';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = '#e5e7eb';
              el.style.color = '#1f2937';
              el.style.background = '#ffffff';
              el.style.transform = 'translateY(0)';
            }}
          >
            See all features
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {trust.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: '#6b7280' }}
            >
              <span className="font-bold" style={{ color: '#14b8a6' }}>{icon}</span>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.12), transparent)' }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
