'use client';

import Link from 'next/link';

function StudyPlannerCard() {
  const tasks = [
    { label: 'Linear Algebra Review', done: true, priority: 'high' },
    { label: 'Physics Problem Set 3', done: false, priority: 'medium' },
    { label: 'Write Essay Draft — Lit', done: false, priority: 'low' },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center glow-sm" style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-body)' }}>Study Planner</span>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(110,231,216,0.1)', color: 'var(--primary)' }}>Today</span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-3 group">
            <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
              task.done ? 'border-transparent' : 'border-[rgba(110,231,216,0.3)] group-hover:border-[var(--primary)]'
            }`} style={task.done ? { background: 'var(--primary)' } : {}}>
              {task.done && (
                <svg className="w-2.5 h-2.5" style={{ color: 'var(--bg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-xs flex-1 ${task.done ? 'line-through opacity-50' : ''}`} style={{ color: 'var(--text-body)' }}>
              {task.label}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{
              background: task.priority === 'high' ? 'rgba(239,68,68,0.1)' : task.priority === 'medium' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
              color: task.priority === 'high' ? '#f87171' : task.priority === 'medium' ? '#fbbf24' : 'var(--text-muted)'
            }}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
          <span>Daily progress</span>
          <span className="font-medium" style={{ color: 'var(--primary)' }}>33%</span>
        </div>
        <div className="w-full rounded-full h-1.5" style={{ background: 'var(--bg-surface)' }}>
          <div className="h-1.5 rounded-full glow-sm" style={{ width: '33%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }} />
        </div>
      </div>
    </div>
  );
}

function AiDoubtSolverCard() {
  return (
    <div className="card">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center glow-sm" style={{ background: 'var(--secondary)', color: 'var(--bg)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-body)' }}>AI Doubt Solver</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block glow-sm" style={{ background: 'var(--accent)' }} />
          Online
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-end">
          <div className="text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]" style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
            Explain Newton&apos;s 3rd Law with examples
          </div>
        </div>
        <div className="flex justify-start">
          <div className="text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed" style={{ background: 'var(--bg-surface)', color: 'var(--text-body)', border: '1px solid var(--border)' }}>
            For every action, there&apos;s an equal and opposite reaction. 🚀 Example: pushing a wall pushes you back equally.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <span className="text-xs flex-1" style={{ color: 'var(--text-muted)' }}>Ask anything academic...</span>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 glow-sm" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
          <svg className="w-3 h-3" style={{ color: 'var(--bg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProductivityStatsCard() {
  const stats = [
    { label: 'Focus Time', value: '4h 22m', delta: '+18%' },
    { label: 'Tasks Done', value: '12', delta: '+3' },
    { label: 'Streak', value: '7 days', delta: '🔥' },
  ];
  const bars = [65, 80, 55, 90, 70, 85, 60];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="card">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center glow-sm" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-body)' }}>Productivity Stats</span>
        <span className="ml-auto text-[10px]" style={{ color: 'var(--text-muted)' }}>This week</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: 'var(--bg-surface)' }}>
            <div className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{s.value}</div>
            <div className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            <div className="text-[10px] font-medium" style={{ color: 'var(--primary)' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-1 h-10">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-sm opacity-80"
              style={{ height: `${h}%`, background: 'linear-gradient(to top, var(--secondary), var(--primary))' }}
            />
            <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-16 flex items-center overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-10" style={{ background: 'var(--primary)' }} />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ background: 'var(--secondary)' }} />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, var(--text-muted) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-7">
            <div className="inline-flex items-center gap-2 self-start text-xs font-semibold px-4 py-2 rounded-full borderglow-sm" style={{ background: 'rgba(110,231,216,0.1)', color: 'var(--primary)', borderColor: 'var(--border)', borderWidth: '1px' }}>
              <span className="w-2 h-2 rounded-full animate-pulse glow-sm" style={{ background: 'var(--primary)' }} />
              AI-Powered Student Assistant
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--text-head)' }}>
              Turn Your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 gradient-text">
                  Academic Chaos
                </span>
                <span className="absolute inset-x-0 bottom-1 h-3 rounded -z-0 opacity-20" style={{ background: 'var(--primary)' }} />
              </span>
              {' '}into Clarity
            </h1>

            <p className="text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              EduFlow AI helps students plan smarter, solve doubts instantly, generate clean notes,
              and track daily productivity — all in one beautifully simple workspace.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Study Planner', 'AI Doubt Solver', 'Notes Generator', 'Productivity Tracker', 'Mood Tracker'].map((f) => (
                <span key={f} className="text-xs font-medium px-3 py-1.5 rounded-lg border" style={{ background: 'rgba(110,231,216,0.05)', color: 'var(--primary)', borderColor: 'var(--border)' }}>
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="btn-primary"
              >
                Get Started Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--bg)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="btn-ghost"
              >
                Explore Features
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {[
                  { bg: 'var(--primary)',   initial: 'A' },
                  { bg: 'var(--secondary)', initial: 'K' },
                  { bg: 'var(--accent)',    initial: 'M' },
                  { bg: '#3b82f6',          initial: 'P' },
                ].map((av, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm"
                    style={{ backgroundColor: av.bg, borderColor: 'var(--bg)', color: i === 3 ? 'white' : 'var(--bg)' }}
                  >
                    {av.initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Trusted by <span className="font-semibold" style={{ color: 'var(--text-body)' }}>10,000+</span> students worldwide
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Dashboard Mockup */}
          <div className="relative flex flex-col gap-4">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-20 pointer-events-none" style={{ background: 'var(--primary)' }} />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-xl opacity-20 pointer-events-none" style={{ background: 'var(--secondary)' }} />

            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <StudyPlannerCard />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <AiDoubtSolverCard />
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <ProductivityStatsCard />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-4 sm:bottom-8 border shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[180px] glow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 glow-sm" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--bg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>AI Ready</p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Instant answers, 24/7</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
