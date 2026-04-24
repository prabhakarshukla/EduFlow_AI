'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  description: string;
};

type DbTask = { id: string; title: string | null; label: string | null; status: 'done' | 'in_progress' | 'todo' | string; created_at?: string | null };
type DbNote = { id: string; title: string | null; updated_at: string | null; created_at?: string | null };
type DbMood = { id: string; mood: number; note: string | null; occurred_at: string };
type DbProductivity = { duration_minutes: number; session_date: string };

type FocusItem = { label: string; done: boolean; priority: 'high' | 'medium' | 'low' };
type ActivityItem = { text: string; time: string; tag: string; tagColor?: string };

const quickActions: QuickAction[] = [
  {
    label: 'Ask AI',
    description: 'Instant answers',
    href: '/dashboard/doubt-solver',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'New Note',
    description: 'AI-generated',
    href: '/dashboard/notes',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: 'Add Task',
    description: 'Study planner',
    href: '/dashboard/study-planner',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    label: 'Log Mood',
    description: 'How are you?',
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

const fmtCompact = (n: number) => new Intl.NumberFormat(undefined, { notation: 'compact' }).format(n);

const timeAgo = (iso: string | null | undefined) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const diffMs = Date.now() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
};

const moodLabel = (mood: number) => {
  if (mood >= 5) return '😁 Great';
  if (mood >= 4) return '😊 Good';
  if (mood >= 3) return '😐 Okay';
  if (mood >= 2) return '😕 Low';
  return '😞 Rough';
};

const formatHoursMinutes = (minutes: number) => {
  const safe = Number.isFinite(minutes) ? Math.max(0, Math.round(minutes)) : 0;
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  return `${hours}h ${mins}m`;
};

/* ── Dashboard page ── */
export default function DashboardPage() {
  const now     = new Date();
  const hour    = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 18 ? 'Good afternoon' :
                'Good evening';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [taskTotal, setTaskTotal] = useState<number>(0);
  const [taskDone, setTaskDone] = useState<number>(0);
  const [taskPending, setTaskPending] = useState<number>(0);
  const [focusItems, setFocusItems] = useState<FocusItem[]>([]);

  const [notesTotal, setNotesTotal] = useState<number>(0);
  const [latestNote, setLatestNote] = useState<DbNote | null>(null);

  const [latestMood, setLatestMood] = useState<DbMood | null>(null);
  const [productivitySessions, setProductivitySessions] = useState<number>(0);
  const [productivityTotalMinutes, setProductivityTotalMinutes] = useState<number>(0);
  const [productivityTodayMinutes, setProductivityTodayMinutes] = useState<number>(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      setError(null);
      setLoading(true);
      try {
        const { data: u, error: uErr } = await supabase.auth.getUser();
        if (!alive) return;
        if (uErr) { setError(uErr.message); return; }
        if (!u.user) { setError('You need to be logged in.'); return; }

        const [allTasksRes, doneTasksRes, notesCountRes, latestNoteRes, latestMoodRes, productivityRes] = await Promise.all([
          supabase.from('study_tasks').select('id,title,label,status,created_at').order('created_at', { ascending: false }).limit(4),
          supabase.from('study_tasks').select('id', { count: 'exact', head: true }).eq('status', 'done'),
          supabase.from('notes').select('id', { count: 'exact', head: true }),
          supabase.from('notes').select('id,title,updated_at,created_at').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
          supabase.from('mood_entries').select('id,mood,note,occurred_at').order('occurred_at', { ascending: false }).limit(1).maybeSingle(),
          supabase.from('productivity_sessions').select('duration_minutes,session_date').eq('user_id', u.user.id),
        ]);

        if (!alive) return;

        if (allTasksRes.error) throw new Error(allTasksRes.error.message);
        if (doneTasksRes.error) throw new Error(doneTasksRes.error.message);
        if (notesCountRes.error) throw new Error(notesCountRes.error.message);
        if (latestNoteRes.error) throw new Error(latestNoteRes.error.message);
        if (latestMoodRes.error) throw new Error(latestMoodRes.error.message);
        if (productivityRes.error) throw new Error(productivityRes.error.message);

        const tasks = (allTasksRes.data ?? []) as DbTask[];
        const totalFromList = tasks.length;
        const totalTasksCountRes = await supabase.from('study_tasks').select('id', { count: 'exact', head: true });
        if (totalTasksCountRes.error) throw new Error(totalTasksCountRes.error.message);

        const total = totalTasksCountRes.count ?? totalFromList ?? 0;
        const done = doneTasksRes.count ?? 0;
        const pending = Math.max(0, total - done);

        setTaskTotal(total);
        setTaskDone(done);
        setTaskPending(pending);

        const mappedFocus: FocusItem[] = tasks.map((t) => ({
          label: String(t.title ?? t.label ?? 'Untitled task'),
          done: t.status === 'done',
          priority: 'medium',
        }));
        setFocusItems(mappedFocus);

        setNotesTotal(notesCountRes.count ?? 0);
        setLatestNote((latestNoteRes.data as DbNote | null) ?? null);
        setLatestMood((latestMoodRes.data as DbMood | null) ?? null);

        const localToday = new Date();
        const todayIso = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, '0')}-${String(localToday.getDate()).padStart(2, '0')}`;
        const productivity = (productivityRes.data ?? []) as DbProductivity[];
        const totalMinutes = productivity.reduce((sum, row) => sum + Number(row.duration_minutes ?? 0), 0);
        const todayMinutes = productivity
          .filter((row) => row.session_date === todayIso)
          .reduce((sum, row) => sum + Number(row.duration_minutes ?? 0), 0);

        setProductivitySessions(productivity.length);
        setProductivityTotalMinutes(totalMinutes);
        setProductivityTodayMinutes(todayMinutes);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : 'Failed to load dashboard overview.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const progressPct = useMemo(() => {
    if (!focusItems.length) return 0;
    const done = focusItems.filter(t => t.done).length;
    return Math.round((done / focusItems.length) * 100);
  }, [focusItems]);

  const overviewCards: OverviewCard[] = useMemo(() => {
    const tasksValue = loading ? '—' : `${taskDone} / ${taskTotal}`;
    const tasksDelta = error ? 'Could not load' : (taskPending ? `${taskPending} pending` : 'All caught up ✓');

    const notesValue = loading ? '—' : fmtCompact(notesTotal);
    const notesDelta =
      error ? 'Could not load' :
      latestNote?.title ? `Latest: ${latestNote.title}` :
      notesTotal ? 'Recently updated' :
      'No notes yet';

    const moodValue = loading ? '—' : (latestMood ? moodLabel(latestMood.mood) : '—');
    const moodDelta =
      error ? 'Could not load' :
      latestMood ? timeAgo(latestMood.occurred_at) :
      'Log your first mood';

    return [
      {
        title: 'Study Planner',
        value: tasksValue,
        sub: 'tasks completed',
        delta: tasksDelta,
        deltaPositive: !error,
        href: '/dashboard/study-planner',
        accent: '#6EE7D8',
        icon: (
          <svg className="w-4.5 h-4.5 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'AI Doubt Solver',
        value: '—',
        sub: 'questions solved',
        delta: 'Ask a question →',
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
        title: 'Notes',
        value: notesValue,
        sub: notesTotal === 1 ? 'note saved' : 'notes saved',
        delta: notesDelta,
        deltaPositive: !error,
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
        value: loading ? '—' : formatHoursMinutes(productivityTotalMinutes),
        sub: loading ? 'sessions' : `${productivitySessions} ${productivitySessions === 1 ? 'session' : 'sessions'}`,
        delta: error
          ? 'Could not load'
          : productivitySessions
            ? `${formatHoursMinutes(productivityTodayMinutes)} today`
            : '0h 0m today',
        deltaPositive: !error,
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
        title: 'Mood',
        value: moodValue,
        sub: latestMood ? 'latest check-in' : 'no check-ins yet',
        delta: moodDelta,
        deltaPositive: !error,
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
  }, [
    error, latestMood, latestNote, loading, notesTotal,
    productivitySessions, productivityTodayMinutes, productivityTotalMinutes,
    taskDone, taskPending, taskTotal,
  ]);

  const recentActivity: ActivityItem[] = useMemo(() => {
    if (loading) return [{ text: 'Loading your activity…', time: '', tag: 'Overview' }];
    if (error)   return [{ text: 'Could not load recent activity.', time: '', tag: 'Overview' }];
    const items: ActivityItem[] = [];
    if (latestNote?.title) {
      items.push({ text: `Updated note: ${latestNote.title}`, time: timeAgo(latestNote.updated_at ?? latestNote.created_at), tag: 'Notes', tagColor: '#5EEAD4' });
    }
    if (latestMood) {
      items.push({ text: `Mood check-in: ${moodLabel(latestMood.mood)}`, time: timeAgo(latestMood.occurred_at), tag: 'Mood', tagColor: '#14B8A6' });
    }
    if (taskDone > 0) {
      items.push({ text: `${taskDone} tasks completed`, time: 'Total', tag: 'Planner', tagColor: '#6EE7D8' });
    } else if (taskTotal > 0) {
      items.push({ text: `${taskPending} tasks pending`, time: 'Total', tag: 'Planner', tagColor: '#6EE7D8' });
    }
    if (!items.length) {
      return [{ text: 'No activity yet — start by adding a task, note, or mood check-in.', time: '', tag: 'Overview' }];
    }
    return items.slice(0, 4);
  }, [error, latestMood, latestNote, loading, taskDone, taskPending, taskTotal]);

  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1280px] mx-auto space-y-8">

      {/* ── Welcome header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(110,231,216,0.50)' }}>
            {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight" style={{ color: '#1f2937' }}>
            {greeting}, Student 👋
          </h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            {error ? (
              <>We couldn&apos;t load your overview right now.</>
            ) : (
              <>
                You have{' '}
                <span style={{ color: '#6EE7D8', fontWeight: 600 }}>
                  {loading ? '…' : taskPending} tasks
                </span>{' '}
                pending — keep the momentum going.
              </>
            )}
          </p>
        </div>

        <Link
          href="/dashboard/study-planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 self-start sm:self-auto flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)',
            color: '#0d2420',
            boxShadow: '0 3px 14px rgba(110,231,216,0.28)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 22px rgba(110,231,216,0.44)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 3px 14px rgba(110,231,216,0.28)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </Link>
      </div>

      {/* ── Overview cards ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.10em]" style={{ color: 'rgba(110,231,216,0.40)' }}>
            Overview
          </p>
          <div className="flex-1 h-px" style={{ background: 'rgba(110,231,216,0.07)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {overviewCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col gap-3.5 p-4 rounded-2xl transition-all duration-200"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${card.accent}40`;
                el.style.boxShadow   = `0 6px 22px rgba(0,0,0,0.32), 0 0 18px ${card.accent}12`;
                el.style.transform   = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(110,231,216,0.11)';
                el.style.boxShadow   = '0 1px 3px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)';
                el.style.transform   = 'translateY(0)';
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${card.accent}14`,
                    color: card.accent,
                    border: `1px solid ${card.accent}22`,
                  }}
                >
                  {card.icon}
                </div>
                <svg
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200 mt-0.5"
                  style={{ color: card.accent }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                  {card.title}
                </p>
                <p className="text-xl font-bold leading-tight" style={{ color: '#1f2937' }}>
                  {card.value}
                </p>
                <p className="text-[11px]" style={{ color: '#6b7280' }}>
                  {card.sub}
                </p>
              </div>

              <p
                className="text-[10px] font-medium truncate"
                style={{ color: card.deltaPositive ? card.accent : '#f87171' }}
              >
                {card.delta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Two-col: Today's Focus + Right column ── */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* Today's Focus */}
        <div
          className="lg:col-span-3 rounded-2xl p-5"
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: '#1f2937', letterSpacing: '-0.01em' }}>
                Today&apos;s Focus
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                {loading ? 'Loading tasks…' : `${focusItems.filter(t => t.done).length} of ${focusItems.length} tasks completed`}
              </p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: progressPct === 100 ? 'rgba(110,231,216,0.14)' : 'rgba(110,231,216,0.07)',
                color: '#6EE7D8',
                border: '1px solid rgba(110,231,216,0.16)',
              }}
            >
              {loading ? '—' : `${progressPct}%`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full mb-4" style={{ background: '#f5f7f4' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #6EE7D8, #14B8A6)',
                boxShadow: progressPct > 0 ? '0 0 10px rgba(110,231,216,0.30)' : 'none',
              }}
            />
          </div>

          {/* Tasks list */}
          <div className="space-y-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
                  style={{ background: '#f5f7f4' }}
                >
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: 'rgba(110,231,216,0.08)' }} />
                  <div className="flex-1 h-3 rounded" style={{ background: '#f5f7f4' }} />
                  <div className="h-4 w-12 rounded" style={{ background: '#f5f7f4' }} />
                </div>
              ))
            ) : error ? (
              <div className="text-xs py-2" style={{ color: '#6b7280' }}>
                Couldn&apos;t load tasks right now.
              </div>
            ) : focusItems.length ? (
              focusItems.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-150"
                  style={{ background: task.done ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                    style={{
                      borderColor: task.done ? '#6EE7D8' : 'rgba(110,231,216,0.22)',
                      background:  task.done ? '#6EE7D8' : 'transparent',
                    }}
                  >
                    {task.done && (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="#0d2420" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm flex-1 truncate ${task.done ? 'line-through' : ''}`}
                    style={{ color: task.done ? '#9ca3af' : '#1f2937' }}
                  >
                    {task.label}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={priorityStyle(task.priority)}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs py-2" style={{ color: '#6b7280' }}>
                No tasks yet — create one to see it here.
              </div>
            )}
          </div>

          <Link
            href="/dashboard/study-planner"
            className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
            style={{ color: 'rgba(110,231,216,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#6EE7D8'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(110,231,216,0.45)'; }}
          >
            View all tasks
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right col */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Quick Actions */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
            }}
          >
            <h2 className="text-sm font-semibold mb-3.5" style={{ color: '#1f2937', letterSpacing: '-0.01em' }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium transition-all duration-150"
                  style={{
                    background: 'rgba(110,231,216,0.04)',
                    border: '1px solid #e5e7eb',
                    color: '#374151',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(110,231,216,0.28)';
                    el.style.background  = 'rgba(110,231,216,0.08)';
                    el.style.color       = '#1f2937';
                    el.style.transform   = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(110,231,216,0.09)';
                    el.style.background  = 'rgba(110,231,216,0.04)';
                    el.style.color       = 'rgba(255,255,255,0.50)';
                    el.style.transform   = 'translateY(0)';
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(110,231,216,0.10)', color: '#6EE7D8' }}
                  >
                    {action.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate leading-tight">{action.label}</p>
                    <p className="text-[10px] leading-tight mt-0.5 truncate" style={{ color: '#6b7280' }}>
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-2xl p-5 flex-1"
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
            }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1f2937', letterSpacing: '-0.01em' }}>
              Recent Activity
            </h2>
            <div className="space-y-3.5">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{
                      background: item.tagColor ?? '#6EE7D8',
                      boxShadow: `0 0 6px ${item.tagColor ?? '#6EE7D8'}60`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug" style={{ color: '#1f2937' }}>{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.time && (
                        <span className="text-[10px]" style={{ color: '#6b7280' }}>{item.time}</span>
                      )}
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          background: `${item.tagColor ?? '#6EE7D8'}12`,
                          color: item.tagColor ?? '#6EE7D8',
                        }}
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
