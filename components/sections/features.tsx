'use client';

import Link from 'next/link';

const features = [
  {
    title: 'Study Planner',
    description:
      'Organise your entire semester in minutes. Set tasks, deadlines, and daily goals — and let AI optimise your schedule automatically.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    accent: '#6EE7D8',
    tag: 'Planning',
    href: '/dashboard/study-planner',
    available: true,
  },
  {
    title: 'AI Doubt Solver',
    description:
      'Ask any academic question and get clear, instant explanations with examples — across every subject, 24 hours a day.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: '#14B8A6',
    tag: 'AI',
    href: '/dashboard/doubt-solver',
    available: true,
  },
  {
    title: 'Notes Generator',
    description:
      'Paste any lecture, textbook excerpt, or topic — and get structured, revision-ready notes in seconds. Clean formatting. Zero effort.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    accent: '#5EEAD4',
    tag: 'Notes',
    href: '/dashboard/notes',
    available: true,
  },
  {
    title: 'Productivity Tracker',
    description:
      'Visualise your focus time, streaks, and completion rates. Stay consistent with gentle nudges and weekly insights from your AI coach.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: '#6EE7D8',
    tag: 'Insights',
    href: '/dashboard/productivity',
    available: false,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{ background: '#222022' }}
      className="py-24 relative overflow-hidden"
    >
      {/* Subtle background gradient hint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(110,231,216,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(110,231,216,0.08)',
              color: '#6EE7D8',
              border: '1px solid rgba(110,231,216,0.20)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#6EE7D8',
                boxShadow: '0 0 6px rgba(110,231,216,0.7)',
              }}
            />
            Everything you need to excel
          </div>

          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight mb-4"
            style={{ color: '#6EE7D8' }}
          >
            Built for the modern{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6EE7D8, #14B8A6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              student
            </span>
          </h2>

          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#7ca8a3' }}
          >
            Four powerful tools, one seamless workspace. No switching apps.
            No friction. Just focused, AI-assisted learning.
          </p>
        </div>

        {/* ── Feature cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual card ── */
type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  tag: string;
  href?: string;
  available?: boolean;
};

function FeatureCard({ title, description, icon, accent, tag, href, available }: FeatureCardProps) {
  const isClickable = Boolean(href) && Boolean(available);

  const card = (
    <div
      className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-250"
      style={{
        background: '#2a282a',
        border: '1px solid rgba(110,231,216,0.13)',
        cursor: isClickable ? 'pointer' : 'default',
        opacity: available === false ? 0.85 : 1,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(110,231,216,0.35)';
        el.style.boxShadow   = '0 0 24px rgba(110,231,216,0.10)';
        el.style.transform   = 'translateY(-4px) scale(1.01)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(110,231,216,0.13)';
        el.style.boxShadow   = 'none';
        el.style.transform   = 'translateY(0) scale(1)';
      }}
    >
      {/* Icon + tag row */}
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${accent}18`,
            color: accent,
            border: `1px solid ${accent}28`,
          }}
        >
          {icon}
        </div>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(110,231,216,0.07)',
            color: '#6EE7D8',
            border: '1px solid rgba(110,231,216,0.15)',
          }}
        >
          {available === false ? 'Coming soon' : tag}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: '#d1faf5' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: '#7ca8a3' }}
        >
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="mt-auto h-px w-full rounded-full transition-all duration-250 opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }}
      />
    </div>
  );

  return (
    isClickable ? (
      <Link href={href!} className="block focus:outline-none">
        {card}
      </Link>
    ) : (
      card
    )
  );
}
