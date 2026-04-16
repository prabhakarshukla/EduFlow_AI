'use client';

import Link from 'next/link';

/* ── Types ── */
type OverviewCard = {
  title: string;
  value: string;
  sub: string;
  delta: string;
  deltaPositive: boolean;
  href: string;
  accent: string;
  icon: React.ReactNode;
};

type QuickAction = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

/* ── Data ── */
const overviewCards: OverviewCard[] = [
  {
    title: 'Study Planner',
    value: '4 / 7',
    sub: 'tasks done today',
    delta: '+2 from yesterday',
    deltaPositive: true,
    href: '/dashboard/study-planner',
    accent: '#6EE7D8',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'AI Doubt Solver',
    value: '12',
    sub: 'questions solved',
    delta: 'This week',
    deltaPositive: true,
    href: '/dashboard/doubt-solver',
    accent: '#14B8A6',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Notes Generator',
    value: '8',
    sub: 'notes created',
    delta: '3 this week',
    deltaPositive: true,
    href: '/dashboard/notes',
    accent: '#5EEAD4',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Productivity',
    value: '4h 22m',
    sub: 'focus time today',
    delta: '+18% vs last week',
    deltaPositive: true,
    href: '/dashboard/productivity',
    accent: '#6EE7D8',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Mood Tracker',
    value: '😊 Good',
    sub: "today's check-in",
    delta: '7 day streak 🔥',
    deltaPositive: true,
    href: '/dashboard/mood',
    accent: '#14B8A6',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const todaysFocus = [
  { label: 'Linear Algebra Review',     done: true,  priority: 'high'   },
  { label: 'Physics Problem Set 3',     done: false, priority: 'medium' },
  { label: 'Write Essay Draft — Lit',   done: false, priority: 'low'    },
  { label: 'Mock Test: Chemistry Ch. 4',done: false, priority: 'high'   },
];

const recentActivity = [
  { text: 'Solved: Newton\'s 3rd Law',       time: '2m ago',  tag: 'AI Solver' },
  { text: 'Created note: Organic Chemistry', time: '1h ago',  tag: 'Notes'     },
  { text: 'Completed: Algebra Review',       time: '3h ago',  tag: 'Planner'   },
  { text: 'Focus session: 45 min',           time: 'Yesterday',tag: 'Tracker'  },
];

const quickActions: QuickAction[] = [
  {
    label: 'Ask AI a doubt',
    href: '/dashboard/doubt-solver',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Generate notes',
    href: '/dashboard/notes',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: 'Add a task',
    href: '/dashboard/study-planner',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    label: 'Log mood',
    href: '/dashboard/mood',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ── Helpers ── */
const priorityStyle = (p: string) => ({
  background:
    p === 'high'   ? 'rgba(239,68,68,0.10)'  :
    p === 'medium' ? 'rgba(245,158,11,0.10)' :
                     'rgba(255,255,255,0.05)',
  color:
    p === 'high'   ? '#f87171' :
    p === 'medium' ? '#fbbf24' :
                     'rgba(255,255,255,0.35)',
});

/* ── Dashboard page ── */
export default function DashboardPage() {
  const now     = new Date();
  const hour    = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 18 ? 'Good afternoon' :
                'Good evening';

  const progressPct = Math.round(
    (todaysFocus.filter(t => t.done).length / todaysFocus.length) * 100
  );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">

      {/* ── Welcome header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm mb-1" style={{ color: 'rgba(110,231,216,0.6)' }}>
            {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#6EE7D8' }}>
            {greeting}, Student 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
            You have <span style={{ color: '#6EE7D8', fontWeight: 600 }}>3 tasks</span> pending today and your focus streak is going strong.
          </p>
        </div>

        <Link
          href="/dashboard/study-planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 self-start sm:self-auto flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)',
            color: '#111',
            boxShadow: '0 4px 16px rgba(110,231,216,0.28)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(110,231,216,0.45)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(110,231,216,0.28)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </Link>
      </div>

      {/* ── Overview cards ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(110,231,216,0.45)' }}>
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {overviewCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-200 group"
              style={{
                background: '#2a282a',
                border: '1px solid rgba(110,231,216,0.12)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(110,231,216,0.32)';
                el.style.boxShadow   = '0 0 20px rgba(110,231,216,0.09)';
                el.style.transform   = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(110,231,216,0.12)';
                el.style.boxShadow   = 'none';
                el.style.transform   = 'translateY(0)';
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${card.accent}18`,
                    color: card.accent,
                    border: `1px solid ${card.accent}28`,
                  }}
                >
                  {card.icon}
                </div>
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'rgba(110,231,216,0.5)' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.40)' }}>{card.title}</p>
                <p className="text-xl font-bold leading-none mb-1" style={{ color: '#d1faf5' }}>{card.value}</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{card.sub}</p>
              </div>

              <p
                className="text-[10px] font-medium"
                style={{ color: card.deltaPositive ? card.accent : '#f87171' }}
              >
                {card.delta}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Two-col: Today's Focus + Quick Actions / Recent ── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Today's focus — wider */}
        <div
          className="lg:col-span-3 rounded-2xl p-6"
          style={{
            background: '#2a282a',
            border: '1px solid rgba(110,231,216,0.12)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: '#d1faf5' }}>Today&apos;s Focus</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {todaysFocus.filter(t => t.done).length} of {todaysFocus.length} tasks completed
              </p>
            </div>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(110,231,216,0.08)',
                color: '#6EE7D8',
                border: '1px solid rgba(110,231,216,0.18)',
              }}
            >
              {progressPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #6EE7D8, #14B8A6)',
                boxShadow: '0 0 8px rgba(110,231,216,0.35)',
              }}
            />
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {todaysFocus.map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-150"
                style={{ background: task.done ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.03)' }}
              >
                <div
                  className="w-4.5 h-4.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                  style={{
                    borderColor:     task.done ? '#6EE7D8'                   : 'rgba(110,231,216,0.25)',
                    background:      task.done ? '#6EE7D8'                   : 'transparent',
                  }}
                >
                  {task.done && (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="#111" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm flex-1 ${task.done ? 'line-through' : ''}`}
                  style={{ color: task.done ? 'rgba(255,255,255,0.30)' : '#d1faf5' }}
                >
                  {task.label}
                </span>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={priorityStyle(task.priority)}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/study-planner"
            className="mt-5 flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
            style={{ color: 'rgba(110,231,216,0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6EE7D8'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(110,231,216,0.5)'; }}
          >
            View all tasks
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right column: Quick actions + Recent activity */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Quick actions */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: '#2a282a',
              border: '1px solid rgba(110,231,216,0.12)',
            }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#d1faf5' }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl text-center text-xs font-medium transition-all duration-150"
                  style={{
                    background: 'rgba(110,231,216,0.04)',
                    border: '1px solid rgba(110,231,216,0.10)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(110,231,216,0.30)';
                    el.style.background  = 'rgba(110,231,216,0.08)';
                    el.style.color       = '#6EE7D8';
                    el.style.transform   = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(110,231,216,0.10)';
                    el.style.background  = 'rgba(110,231,216,0.04)';
                    el.style.color       = 'rgba(255,255,255,0.55)';
                    el.style.transform   = 'translateY(0)';
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(110,231,216,0.10)', color: '#6EE7D8' }}
                  >
                    {action.icon}
                  </div>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{
              background: '#2a282a',
              border: '1px solid rgba(110,231,216,0.12)',
            }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#d1faf5' }}>Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: '#6EE7D8', boxShadow: '0 0 4px rgba(110,231,216,0.5)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs" style={{ color: '#d1faf5' }}>{item.text}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.30)' }}>{item.time}</span>
                      <span
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(110,231,216,0.08)', color: '#6EE7D8' }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
