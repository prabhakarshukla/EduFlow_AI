'use client';

import Link from 'next/link';

/* ─── Chip data ────────────────────────────────────────────────── */
const features = [
  { icon: '📚', label: 'Study Planner' },
  { icon: '🤖', label: 'AI Doubt Solver' },
  { icon: '📝', label: 'Notes Generator' },
  { icon: '📊', label: 'Productivity Tracker' },
  { icon: '😊', label: 'Mood Tracker' },
];

const stats = [
  { value: '10K+', label: 'Active Students' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Average Rating' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#1a181a' }}
    >
      {/* ── Layered background ── */}
      {/* Large mint radial top-left */}
      <div
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(110,231,216,0.055)', opacity: 0.9 }}
        aria-hidden="true"
      />
      {/* Teal radial bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(20,184,166,0.055)' }}
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(110,231,216,0.045) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(110,231,216,0.06) 0%, transparent 65%)',
        }}
      />
      {/* Bottom fade into features section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #222022)' }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full pt-28 pb-20">

        {/* Eyebrow */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{
              background: 'rgba(110,231,216,0.08)',
              border: '1px solid rgba(110,231,216,0.22)',
              color: '#6EE7D8',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#6EE7D8', boxShadow: '0 0 8px rgba(110,231,216,0.80)' }}
            />
            AI-powered learning platform for serious students
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-6 max-w-5xl mx-auto">
          <h1
            className="font-extrabold tracking-tight leading-[1.05]"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)',
              color: '#e8fdf9',
              letterSpacing: '-0.02em',
            }}
          >
            Turn Your{' '}
            <span className="relative inline-block">
              <span
                style={{
                  background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 50%, #6EE7D8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 4s ease infinite',
                }}
              >
                Academic Chaos
              </span>
              {/* Underline glow */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #6EE7D8, #14B8A6, transparent)',
                  opacity: 0.6,
                }}
                aria-hidden="true"
              />
            </span>
            <br />
            into Clarity
          </h1>
        </div>

        {/* Sub-headline */}
        <p
          className="text-center max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.50)',
          }}
        >
          EduFlow AI gives every student a personal AI study partner — plan smarter,
          solve doubts instantly, generate clean notes, and track daily productivity.{' '}
          <span style={{ color: 'rgba(110,231,216,0.75)' }}>All in one workspace.</span>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Link
            href="/auth/signup"
            className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-200 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)',
              color: '#0b1f1c',
              boxShadow: '0 6px 28px rgba(110,231,216,0.38), 0 0 0 1px rgba(110,231,216,0.15)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 10px 40px rgba(110,231,216,0.55), 0 0 0 1px rgba(110,231,216,0.25)';
              el.style.transform = 'translateY(-2px) scale(1.01)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 6px 28px rgba(110,231,216,0.38), 0 0 0 1px rgba(110,231,216,0.15)';
              el.style.transform = 'translateY(0) scale(1)';
            }}
          >
            Start Learning Free
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold transition-all duration-200"
            style={{
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(110,231,216,0.15)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(110,231,216,0.35)';
              el.style.color = '#e2fdf9';
              el.style.background = 'rgba(110,231,216,0.06)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(110,231,216,0.15)';
              el.style.color = 'rgba(255,255,255,0.65)';
              el.style.background = 'rgba(255,255,255,0.03)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Explore features
          </Link>
        </div>

        {/* Social proof + stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {/* Avatar stack */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {['#6EE7D8', '#14B8A6', '#5EEAD4', '#0d9488'].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    borderColor: '#1a181a',
                    background: `linear-gradient(135deg, ${c}, #111)`,
                    color: '#e2fdf9',
                  }}
                >
                  {['AK', 'PS', 'RV', 'MK'][i]}
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
              <span style={{ color: '#6EE7D8', fontWeight: 700 }}>10,000+</span> students already studying smarter
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5" style={{ background: 'rgba(110,231,216,0.20)' }} />

          {/* Stars */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#6EE7D8">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
              4.9/5 average rating
            </span>
          </div>
        </div>

        {/* Feature chip strip */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16">
          {features.map(f => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(110,231,216,0.12)',
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* ── Dashboard mockup card ── */}
        <div
          className="relative rounded-3xl overflow-hidden mx-auto max-w-5xl"
          style={{
            background: '#222022',
            border: '1px solid rgba(110,231,216,0.18)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(110,231,216,0.08), inset 0 1px 0 rgba(110,231,216,0.10)',
          }}
        >
          {/* Mock topbar */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 border-b"
            style={{ borderColor: 'rgba(110,231,216,0.10)', background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex gap-1.5">
              {['#f87171', '#fbbf24', '#6EE7D8'].map(c => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div
              className="flex-1 h-5 rounded-full max-w-xs mx-auto flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>app.eduflow.ai/dashboard</span>
            </div>
          </div>

          {/* Mock dashboard body */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-x" style={{ divideColor: 'rgba(110,231,216,0.08)' }}>

            {/* Col 1 – Study Planner */}
            <div className="p-5 space-y-3" style={{ borderRight: '1px solid rgba(110,231,216,0.08)' }}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(110,231,216,0.50)' }}>
                  Study Planner
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(110,231,216,0.10)', color: '#6EE7D8' }}>Today</span>
              </div>
              {[
                { text: 'Linear Algebra Review', done: true, priority: 'high' },
                { text: 'Physics Problem Set 3', done: false, priority: 'medium' },
                { text: 'Write Essay Draft — Lit', done: false, priority: 'low' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: t.done ? '#6EE7D8' : 'rgba(110,231,216,0.30)',
                      background: t.done ? '#6EE7D8' : 'transparent',
                    }}
                  >
                    {t.done && <svg className="w-2 h-2" fill="none" stroke="#111" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span
                    className={`text-xs flex-1 ${t.done ? 'line-through' : ''}`}
                    style={{ color: t.done ? 'rgba(255,255,255,0.25)' : '#d1faf5' }}
                  >
                    {t.text}
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: t.priority === 'high' ? 'rgba(248,113,113,0.12)' : t.priority === 'medium' ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.05)',
                      color: t.priority === 'high' ? '#f87171' : t.priority === 'medium' ? '#fbbf24' : 'rgba(255,255,255,0.30)',
                    }}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
              {/* Progress */}
              <div>
                <div className="flex justify-between text-[9px] mb-1" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  <span>Daily progress</span><span>33%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-1.5 rounded-full w-1/3" style={{ background: 'linear-gradient(90deg,#6EE7D8,#14B8A6)', boxShadow: '0 0 8px rgba(110,231,216,0.40)' }} />
                </div>
              </div>
            </div>

            {/* Col 2 – AI Doubt Solver */}
            <div className="p-5 space-y-3" style={{ borderRight: '1px solid rgba(110,231,216,0.08)' }}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(110,231,216,0.50)' }}>
                  AI Doubt Solver
                </p>
                <span className="flex items-center gap-1 text-[9px]" style={{ color: '#6EE7D8' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6EE7D8' }} />
                  Live
                </span>
              </div>
              {/* Chat bubble */}
              <div className="rounded-xl px-3 py-2.5 text-xs" style={{ background: 'linear-gradient(135deg,rgba(110,231,216,0.14),rgba(20,184,166,0.08))', border: '1px solid rgba(110,231,216,0.18)', color: '#d1faf5' }}>
                Explain Newton&apos;s 3rd Law with examples
              </div>
              <div className="rounded-xl px-3 py-2.5 text-xs leading-relaxed" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.60)' }}>
                For every action there&apos;s an equal &amp; opposite reaction. A rocket expels gas downward → rocket pushed upward...
              </div>
              {/* Typing indicator */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(110,231,216,0.40)', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
                <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>AI is thinking…</span>
              </div>
            </div>

            {/* Col 3 – Stats */}
            <div className="p-5 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(110,231,216,0.50)' }}>
                Productivity
              </p>
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg,#6EE7D8,#14B8A6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                </div>
              ))}
              {/* Mood bar */}
              <div className="mt-2">
                <p className="text-[9px] mb-1.5" style={{ color: 'rgba(255,255,255,0.30)' }}>Today&apos;s Mood</p>
                <div className="flex gap-1">
                  {['😞', '😕', '😐', '🙂', '😁'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex-1 h-6 rounded-lg flex items-center justify-center text-[11px]"
                      style={{
                        background: i === 3 ? 'rgba(110,231,216,0.20)' : 'rgba(255,255,255,0.04)',
                        border: i === 3 ? '1px solid rgba(110,231,216,0.35)' : '1px solid transparent',
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shimmer keyframe */}
        <style>{`
          @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); opacity: 0.4; }
            50% { transform: translateY(-3px); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
