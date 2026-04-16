'use client';

import Link from 'next/link';

export default function Cta() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: '#1e1c1e' }}
    >
      {/* Radial gradient hint — top center only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(110,231,216,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Corner blobs — very subtle */}
      <div
        className="absolute -top-32 -right-32 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none"
        style={{ background: '#6EE7D8', opacity: 0.05 }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[320px] h-[320px] rounded-full blur-3xl pointer-events-none"
        style={{ background: '#14B8A6', opacity: 0.05 }}
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center gap-8">

        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            background: 'rgba(110,231,216,0.08)',
            color: '#6EE7D8',
            border: '1px solid rgba(110,231,216,0.20)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: '#6EE7D8',
              boxShadow: '0 0 6px rgba(110,231,216,0.7)',
            }}
          />
          Join 10,000+ students already using EduFlow AI
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1]"
            style={{ color: '#6EE7D8' }}
          >
            Your smarter study life{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #6EE7D8, #14B8A6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              starts today.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#7ca8a3' }}
          >
            No credit card. No setup. Just sign up and start planning, learning,
            and achieving — with AI by your side.
          </p>
        </div>

        {/* CTA button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)',
              color: '#111',
              boxShadow: '0 4px 24px rgba(110,231,216,0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 6px 32px rgba(110,231,216,0.55)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 24px rgba(110,231,216,0.35)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              color: '#6EE7D8',
              border: '1px solid rgba(110,231,216,0.22)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.45)';
              (e.currentTarget as HTMLElement).style.background  = 'rgba(110,231,216,0.06)';
              (e.currentTarget as HTMLElement).style.boxShadow   = '0 0 16px rgba(110,231,216,0.10)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.22)';
              (e.currentTarget as HTMLElement).style.background  = 'transparent';
              (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
            }}
          >
            See all features
          </Link>
        </div>

        {/* Trust micro-copy */}
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Free forever plan · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
