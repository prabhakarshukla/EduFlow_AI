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
      style={{ background: '#1a181a' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(110,231,216,0.18), transparent)' }}
        aria-hidden="true"
      />

      {/* Large ambient blobs */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(110,231,216,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-48 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'rgba(20,184,166,0.05)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-48 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'rgba(110,231,216,0.04)' }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(110,231,216,0.042) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Center glow ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'transparent',
          border: '1px solid rgba(110,231,216,0.06)',
          boxShadow: 'inset 0 0 80px rgba(110,231,216,0.04)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center gap-8">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            background: 'rgba(110,231,216,0.07)',
            color: '#6EE7D8',
            border: '1px solid rgba(110,231,216,0.20)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#6EE7D8', boxShadow: '0 0 8px rgba(110,231,216,0.80)' }}
          />
          10,000+ students already using EduFlow AI
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h2
            className="font-extrabold tracking-tight leading-[1.06]"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              color: '#e2fdf9',
              letterSpacing: '-0.025em',
            }}
          >
            Your smarter study life{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 60%, #6EE7D8 100%)',
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
            style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.42)' }}
          >
            No credit card. No setup. Just sign up in 30 seconds and start planning,
            learning, and achieving — with AI always by your side.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-sm font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)',
              color: '#0b1f1c',
              boxShadow: '0 6px 32px rgba(110,231,216,0.40)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 12px 48px rgba(110,231,216,0.58)';
              el.style.transform = 'translateY(-3px) scale(1.015)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 6px 32px rgba(110,231,216,0.40)';
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
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(110,231,216,0.16)',
              background: 'rgba(255,255,255,0.025)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(110,231,216,0.38)';
              el.style.color = '#e2fdf9';
              el.style.background = 'rgba(110,231,216,0.055)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(110,231,216,0.16)';
              el.style.color = 'rgba(255,255,255,0.55)';
              el.style.background = 'rgba(255,255,255,0.025)';
              el.style.transform = 'translateY(0)';
            }}
          >
            See all features
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {trust.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              <span className="font-bold" style={{ color: '#6EE7D8' }}>{icon}</span>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(110,231,216,0.10), transparent)' }}
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
