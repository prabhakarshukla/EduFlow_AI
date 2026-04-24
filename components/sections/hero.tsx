'use client';

import Link from 'next/link';
import Image from 'next/image';

/* ─── Chip data ────────────────────────────────────────────────── */
const features = [
  { icon: '📚', label: 'Study Planner' },
  { icon: '🤖', label: 'AI Doubt Solver' },
  { icon: '📝', label: 'Notes Generator' },
  { icon: '📊', label: 'Productivity Tracker' },
  { icon: '😊', label: 'Mood Tracker' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#fcfcf9' }}>
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] lg:block pointer-events-none"
        style={{
          background:
            'linear-gradient(128deg, rgba(196,181,253,0.28) 0%, rgba(233,213,255,0.2) 24%, rgba(110,231,216,0.24) 58%, rgba(167,243,208,0.18) 76%, rgba(249,216,193,0.16) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-0 hidden h-[520px] w-[48%] lg:block pointer-events-none"
        style={{
          background:
            'linear-gradient(142deg, rgba(249,216,193,0.27) 4%, rgba(253,230,138,0.2) 36%, rgba(196,181,253,0.18) 66%, rgba(110,231,216,0.15) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-10 hidden h-[360px] w-[38%] lg:block pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 22px)',
          opacity: 0.55,
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.02fr,0.98fr] lg:gap-6">
        <div className="relative z-10 max-w-xl">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
            style={{ background: '#f5f7f4', border: '1px solid #e5e7eb', color: '#14b8a6' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#6ee7d8' }} />
            Premium student workspace
          </div>

          <h1
            className="mb-6 font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: '#1f2937', letterSpacing: '-0.02em' }}
          >
            Study with clarity.
            <br />
            Grow with flow.
          </h1>

          <p
            className="mb-8 max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.12rem)', color: '#6b7280' }}
          >
            EduFlow AI brings your planning, doubt solving, notes, and productivity habits
            into one beautifully organized space built for modern students.
          </p>

          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-200"
              style={{ background: '#14b8a6', color: '#ffffff', boxShadow: '0 10px 22px rgba(20,184,166,0.22)' }}
            >
              Start Learning Free
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/#features"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-colors duration-200"
              style={{ color: '#1f2937', border: '1px solid #e5e7eb', background: '#ffffff' }}
            >
              Explore features
            </Link>
          </div>

          <p className="text-sm" style={{ color: '#6b7280' }}>
            Trusted by students who want consistent, focused progress.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {features.map(f => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs"
                style={{ background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }}
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-end justify-center lg:justify-end">
          <div
            className="absolute bottom-2 right-4 h-[280px] w-[300px] rounded-[32px] sm:h-[330px] sm:w-[360px] lg:bottom-6 lg:right-12 lg:h-[390px] lg:w-[430px]"
            style={{
              background:
                'linear-gradient(132deg, rgba(196,181,253,0.31) 0%, rgba(233,213,255,0.24) 28%, rgba(110,231,216,0.23) 58%, rgba(167,243,208,0.17) 76%, rgba(249,216,193,0.19) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 right-20 hidden h-[240px] w-[300px] rounded-[28px] lg:block"
            style={{
              background:
                'linear-gradient(120deg, rgba(249,216,193,0.26) 0%, rgba(253,230,138,0.19) 30%, rgba(196,181,253,0.18) 74%, rgba(110,231,216,0.15) 100%)',
              boxShadow: '0 16px 34px rgba(196,181,253,0.12)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-12 right-12 hidden h-[220px] w-[280px] rounded-[28px] lg:block"
            style={{
              background:
                'repeating-linear-gradient(140deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)',
              opacity: 0.45,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 h-[120px] w-[140px] rounded-3xl sm:h-[150px] sm:w-[170px] lg:bottom-8 lg:right-2 lg:h-[180px] lg:w-[220px]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(196,181,253,0.3) 1.1px, transparent 1.1px)',
              backgroundSize: '14px 14px',
              opacity: 0.3,
            }}
            aria-hidden="true"
          />

          <div className="relative block w-full max-w-[540px] translate-x-0 sm:max-w-[560px] lg:max-w-[650px] lg:-translate-x-[260px] lg:-translate-y-20">
            <Image
              src="/images/hero.png"
              alt="EduFlow AI dashboard preview"
              width={1150}
              height={900}
              priority
              className="h-auto w-full object-contain align-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
