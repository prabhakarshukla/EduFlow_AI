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
    <section className="relative isolate overflow-hidden bg-[#fcfcf9] min-h-[min(100vh,980px)]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero1.png"
          alt="EduFlow AI hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(252,252,249,0.98) 0%, rgba(252,252,249,0.92) 32%, rgba(252,252,249,0.58) 48%, rgba(252,252,249,0.12) 66%, rgba(252,252,249,0.02) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[62%]"
          style={{
            background:
              'linear-gradient(90deg, rgba(252,252,249,0.98) 0%, rgba(252,252,249,0.94) 38%, rgba(252,252,249,0.78) 64%, rgba(252,252,249,0.12) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[48%] opacity-70"
          style={{
            background:
              'radial-gradient(circle at 18% 42%, rgba(110,231,216,0.22) 0%, rgba(110,231,216,0.12) 26%, rgba(110,231,216,0.02) 54%, rgba(110,231,216,0) 72%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex min-h-[min(100vh,980px)] w-full max-w-7xl items-center px-5 py-20 sm:px-8 sm:py-24 lg:px-8">
        <div className="relative z-10 max-w-2xl rounded-[32px] border border-white/40 bg-white/55 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-[10px] sm:p-8 lg:max-w-[46%] lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0">
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
      </div>
    </section>
  );
}
