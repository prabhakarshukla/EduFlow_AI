'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

/* ── Types ─────────────────────────────────────────────────────── */
type Priority = 'high' | 'medium' | 'low';
type Task = {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  priority: Priority;
  status: 'todo' | 'in_progress' | 'done';
  due: string | null;
  created_at?: string;
};

type WeekDay = { day: string; date: number; tasks: number; active: boolean };
type Subject = { name: string; color: string; hours: number; pct: number };
type Deadline = { title: string; subject: string; due: string; urgent: boolean };

/* ── Seed data ──────────────────────────────────────────────────── */
const initialTasks: Task[] = [];

const week: WeekDay[] = [
  { day: 'Mon', date: 14, tasks: 4, active: false },
  { day: 'Tue', date: 15, tasks: 6, active: false },
  { day: 'Wed', date: 16, tasks: 5, active: true  },
  { day: 'Thu', date: 17, tasks: 3, active: false },
  { day: 'Fri', date: 18, tasks: 7, active: false },
  { day: 'Sat', date: 19, tasks: 2, active: false },
  { day: 'Sun', date: 20, tasks: 1, active: false },
];

const subjects: Subject[] = [
  { name: 'Mathematics', color: '#6EE7D8', hours: 8.5, pct: 85 },
  { name: 'Physics',     color: '#14B8A6', hours: 6.0, pct: 60 },
  { name: 'Chemistry',   color: '#5EEAD4', hours: 4.5, pct: 45 },
  { name: 'English',     color: '#8b5cf6', hours: 3.0, pct: 30 },
  { name: 'History',     color: '#f59e0b', hours: 2.0, pct: 20 },
];

const deadlines: Deadline[] = [
  { title: 'Physics Assignment Final',   subject: 'Physics',     due: 'Apr 17',  urgent: true  },
  { title: 'Literature Essay',           subject: 'English',     due: 'Apr 19',  urgent: false },
  { title: 'Chemistry Lab Report',       subject: 'Chemistry',   due: 'Apr 21',  urgent: false },
  { title: 'Maths Unit Test',            subject: 'Mathematics', due: 'Apr 24',  urgent: false },
];

/* ── Priority helpers ───────────────────────────────────────────── */
const pColor = (p: Priority) =>
  p === 'high' ? '#f87171' : p === 'medium' ? '#fbbf24' : '#6b7280';
const pBg = (p: Priority) =>
  p === 'high' ? 'rgba(239,68,68,0.10)' : p === 'medium' ? 'rgba(245,158,11,0.10)' : 'rgba(255,255,255,0.05)';

/* ── Shared card shell ──────────────────────────────────────────── */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${className}`}
      style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
    >
      {children}
    </div>
  );
}

/* ── Section label ──────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b7280' }}>
      {children}
    </p>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function StudyPlannerPage() {
  const [tasks, setTasks]           = useState<Task[]>(initialTasks);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const [newLabel, setNewLabel]     = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState(''); // YYYY-MM-DD
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [focused, setFocused]       = useState<string | null>(null);

  const done    = tasks.filter(t => t.status === 'done').length;
  const pending = tasks.length - done;
  const pct     = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const priorityToDb = (p: Priority) => (p === 'high' ? 3 : p === 'medium' ? 2 : 1);
  const dbToPriority = (v: unknown): Priority => {
    if (v === 'high' || v === 'medium' || v === 'low') return v;
    if (typeof v === 'number') return v >= 3 ? 'high' : v === 2 ? 'medium' : 'low';
    return 'medium';
  };

  const formatDue = (iso: string | null) => {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const loadTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: qErr } = await supabase
        .from('study_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (qErr) {
        setError(qErr.message);
        setTasks([]);
        return;
      }

      const mapped: Task[] = (data ?? []).map((row: any) => {
        const status: Task['status'] =
          row.status === 'done' || row.status === 'in_progress' || row.status === 'todo'
            ? row.status
            : (row.done ? 'done' : 'todo');
        const dueIso = (row.due_date ?? row.due_at ?? null) as string | null;
        return {
          id: String(row.id),
          title: (row.title ?? row.label ?? '') as string,
          description: (row.description ?? row.details ?? null) as string | null,
          subject: (row.subject ?? null) as string | null,
          priority: dbToPriority(row.priority),
          status,
          due: formatDue(dueIso),
          created_at: row.created_at,
        };
      });

      setTasks(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load tasks.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error: uErr } = await supabase.auth.getUser();
      if (!alive) return;
      if (uErr) setError(uErr.message);
      if (data.user) await loadTasks();
      else setLoading(false);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleStatus = async (id: string) => {
    const current = tasks.find(t => t.id === id);
    if (!current) return;

    const nextStatus: Task['status'] = current.status === 'done' ? 'todo' : 'done';
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, status: nextStatus } : t)));

    try {
      const { error: upErr } = await supabase.from('study_tasks').update({ status: nextStatus }).eq('id', id);
      if (upErr) {
        setTasks(ts => ts.map(t => (t.id === id ? { ...t, status: current.status } : t)));
        setError(upErr.message);
      }
    } catch (e) {
      setTasks(ts => ts.map(t => (t.id === id ? { ...t, status: current.status } : t)));
      setError(e instanceof Error ? e.message : 'Failed to update task.');
    }
  };

  const insertWithFallback = async (payload: Record<string, unknown>) => {
    // Return inserted row when possible.
    const { data, error: firstErr } = await supabase
      .from('study_tasks')
      .insert(payload)
      .select('*')
      .single();

    if (!firstErr) return { data, error: null as any };

    // Fallback to a conservative schema (title/details/due_at/priority/status/user_id).
    const minimal: Record<string, unknown> = {
      title: payload.title,
      details: payload.description,
      due_at: payload.due_date,
      priority: payload.priority,
      status: payload.status,
      user_id: payload.user_id,
    };

    const { data: data2, error: secondErr } = await supabase
      .from('study_tasks')
      .insert(minimal)
      .select('*')
      .single();

    return { data: data2, error: secondErr ?? firstErr };
  };

  const addTask = async () => {
    if (!newLabel.trim()) return;
    setError(null);
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const user = u.user;
      if (!user) {
        setError('You need to be logged in to add tasks.');
        return;
      }

      const dueIso = newDueDate ? new Date(`${newDueDate}T00:00:00.000Z`).toISOString() : null;

      const payload: Record<string, unknown> = {
        user_id: user.id,
        title: newLabel.trim(),
        description: newDescription.trim() || null,
        subject: newSubject.trim() || null,
        priority: priorityToDb(newPriority),
        status: 'todo',
        due_date: dueIso,
      };

      const { data, error: insErr } = await insertWithFallback(payload);
      if (insErr) {
        setError(insErr.message ?? 'Failed to create task.');
        return;
      }

      // Always refresh from DB so the user sees the source of truth.
      await loadTasks();

      setNewLabel('');
      setNewSubject('');
      setNewDescription('');
      setNewDueDate('');
      setNewPriority('medium');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create task.');
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (id: string) => {
    setError(null);
    const prev = tasks;
    setTasks(ts => ts.filter(t => t.id !== id));
    try {
      const { error: delErr } = await supabase.from('study_tasks').delete().eq('id', id);
      if (delErr) {
        setTasks(prev);
        setError(delErr.message);
      }
    } catch (e) {
      setTasks(prev);
      setError(e instanceof Error ? e.message : 'Failed to delete task.');
    }
  };

  /* Input focus ring helper */
  const inputStyle = (field: string): React.CSSProperties => ({
    background:  '#ffffff',
    border:      `1px solid ${focused === field ? 'rgba(110,231,216,0.45)' : 'rgba(110,231,216,0.15)'}`,
    boxShadow:   focused === field ? '0 0 0 3px rgba(110,231,216,0.07)' : 'none',
    color:       '#1f2937',
    outline:     'none',
    borderRadius: '0.75rem',
    padding:     '0.625rem 0.875rem',
    fontSize:    '0.8125rem',
    width:       '100%',
    transition:  'border-color 0.15s, box-shadow 0.15s',
  });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-3"
            style={{
              background: 'rgba(110,231,216,0.08)',
              color: '#6EE7D8',
              border: '1px solid rgba(110,231,216,0.18)',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Study Planner
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1f2937' }}>
            Plan smarter, study better.
          </h1>
          <p className="text-sm mt-1.5" style={{ color: '#6b7280' }}>
            Organise your tasks, track priority subjects, and never miss a deadline.
          </p>
        </div>

        {/* Progress pill */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: '#ffffff', border: '1px solid rgba(110,231,216,0.15)' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#6EE7D8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: '#1f2937' }}>
            {pct}% done today
          </span>
        </div>
      </div>

      {/* ── Row 1: Progress summary + Weekly plan ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Progress summary */}
        <Card className="flex flex-col gap-5">
          <SectionLabel>Progress Summary</SectionLabel>

          {/* Ring-style progress */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none"
                  stroke="rgba(110,231,216,0.10)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#tealGrad)" strokeWidth="3"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6EE7D8" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: '#6EE7D8' }}>{pct}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {[
                { label: 'Completed', value: done,    color: '#6EE7D8' },
                { label: 'Pending',   value: pending, color: '#fbbf24' },
                { label: 'Total',     value: tasks.length, color: '#6b7280' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span style={{ color: '#6b7280' }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(110,231,216,0.05)', border: '1px solid #e5e7eb' }}
          >
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1f2937' }}>7-day streak</p>
              <p className="text-[11px]" style={{ color: '#6b7280' }}>Keep going — you&apos;re on fire!</p>
            </div>
          </div>
        </Card>

        {/* Weekly plan */}
        <Card className="lg:col-span-2">
          <SectionLabel>Weekly Study Plan</SectionLabel>
          <div className="grid grid-cols-7 gap-2">
            {week.map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center gap-2 py-3 rounded-xl cursor-pointer transition-all duration-150"
                style={{
                  background: d.active ? 'rgba(110,231,216,0.12)' : 'rgba(255,255,255,0.03)',
                  border:     d.active ? '1px solid rgba(110,231,216,0.35)' : '1px solid rgba(110,231,216,0.08)',
                  boxShadow:  d.active ? '0 0 12px rgba(110,231,216,0.10)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!d.active) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.25)';
                    (e.currentTarget as HTMLElement).style.background  = 'rgba(110,231,216,0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (!d.active) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.08)';
                    (e.currentTarget as HTMLElement).style.background  = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                <span className="text-[10px] font-semibold uppercase"
                  style={{ color: d.active ? '#0d9488' : '#9ca3af' }}>
                  {d.day}
                </span>
                <span className="text-sm font-bold"
                  style={{ color: d.active ? '#6EE7D8' : '#1f2937' }}>
                  {d.date}
                </span>
                <span
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: d.active ? 'rgba(110,231,216,0.20)' : 'rgba(255,255,255,0.06)',
                    color:      d.active ? '#0d9488' : '#9ca3af',
                  }}
                >
                  {d.tasks}t
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal task load bar */}
          <div className="mt-5">
            <p className="text-[10px] mb-2" style={{ color: '#6b7280' }}>Weekly task load</p>
            <div className="flex items-end gap-1 h-8">
              {week.map((d) => (
                <div key={d.day} className="flex-1 rounded-t" style={{
                  height:     `${(d.tasks / 7) * 100}%`,
                  background: d.active
                    ? 'linear-gradient(180deg,#6EE7D8,#14B8A6)'
                    : 'rgba(110,231,216,0.18)',
                  minHeight:  '4px',
                }} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Row 2: Today's tasks + Quick add ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Today's tasks */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <SectionLabel>Today&apos;s Study Tasks</SectionLabel>
              <p className="text-sm font-semibold -mt-2" style={{ color: '#1f2937' }}>
                {done} of {tasks.length} completed
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-24">
              <div className="w-full h-1.5 rounded-full" style={{ background: '#f5f7f4' }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width:      `${pct}%`,
                    background: 'linear-gradient(90deg,#6EE7D8,#14B8A6)',
                    boxShadow:  '0 0 6px rgba(110,231,216,0.4)',
                  }}
                />
              </div>
              <p className="text-[10px] text-right mt-1" style={{ color: '#6b7280' }}>{pct}%</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {loading && (
              <div
                className="rounded-xl p-4"
                style={{ background: '#f5f7f4', border: '1px solid #e5e7eb' }}
              >
                <p className="text-sm" style={{ color: '#6b7280' }}>Loading your tasks…</p>
              </div>
            )}

            {!loading && error && (
              <div
                className="rounded-xl p-4"
                role="alert"
                style={{ background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.22)' }}
              >
                <p className="text-sm" style={{ color: '#b91c1c' }}>{error}</p>
                <button
                  type="button"
                  onClick={loadTasks}
                  className="mt-3 text-xs font-semibold px-3 py-2 rounded-lg"
                  style={{
                    background: 'rgba(248,113,113,0.12)',
                    border: '1px solid rgba(248,113,113,0.25)',
                    color: '#b91c1c',
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && tasks.length === 0 && (
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(110,231,216,0.05)', border: '1px dashed rgba(110,231,216,0.18)' }}
              >
                <p className="text-sm font-semibold" style={{ color: '#1f2937' }}>No tasks yet.</p>
                <p className="text-[11px] mt-1" style={{ color: '#6b7280' }}>
                  Add your first task on the right — keep it small and specific.
                </p>
              </div>
            )}

            {!loading && tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 group"
                style={{
                  background: task.status === 'done' ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.03)',
                  border:     '1px solid rgba(110,231,216,0.08)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.22)';
                  (e.currentTarget as HTMLElement).style.background  = task.status === 'done'
                    ? 'rgba(110,231,216,0.07)' : 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.08)';
                  (e.currentTarget as HTMLElement).style.background  = task.status === 'done'
                    ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleStatus(task.id)}
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                  style={{
                    borderColor: task.status === 'done' ? '#6EE7D8' : 'rgba(110,231,216,0.30)',
                    background:  task.status === 'done' ? '#6EE7D8' : 'transparent',
                  }}
                >
                  {task.status === 'done' && (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="#111" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${task.status === 'done' ? 'line-through' : ''}`}
                    style={{ color: task.status === 'done' ? '#9ca3af' : '#1f2937' }}
                  >
                    {task.title}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#6b7280' }}>
                    {[task.subject || 'General', task.due ? `Due ${task.due}` : null].filter(Boolean).join(' • ')}
                  </p>
                </div>

                {/* Priority */}
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: pBg(task.priority), color: pColor(task.priority) }}
                >
                  {task.priority}
                </span>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1.5 rounded-lg"
                  title="Delete"
                  style={{ color: '#6b7280' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f87171'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b7280'; }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick add */}
        <Card className="flex flex-col gap-4">
          <SectionLabel>Quick Add Task</SectionLabel>

          <div className="flex flex-col gap-3">
            {!loading && error && (
              <div
                className="rounded-xl px-3 py-2 text-sm"
                role="alert"
                style={{
                  background: 'rgba(248,113,113,0.10)',
                  border: '1px solid rgba(248,113,113,0.22)',
                  color: '#b91c1c',
                }}
              >
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#1f2937' }}>
                Task name
              </label>
              <input
                type="text"
                placeholder="e.g. Read Chapter 6"
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                onFocus={() => setFocused('label')}
                onBlur={() => setFocused(null)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                style={inputStyle('label')}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#1f2937' }}>
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Physics"
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
                style={inputStyle('subject')}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#1f2937' }}>
                Description
              </label>
              <textarea
                placeholder="Optional details (chapters, problems, goals)…"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                onFocus={() => setFocused('description')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle('description'), minHeight: '84px', resize: 'none' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#1f2937' }}>
                Due date
              </label>
              <input
                type="date"
                value={newDueDate}
                onChange={e => setNewDueDate(e.target.value)}
                onFocus={() => setFocused('due')}
                onBlur={() => setFocused(null)}
                style={inputStyle('due')}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#1f2937' }}>
                Priority
              </label>
              <div className="flex gap-2">
                {(['high', 'medium', 'low'] as Priority[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setNewPriority(p)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-150"
                    style={{
                      background: newPriority === p ? pBg(p) : 'rgba(255,255,255,0.04)',
                      border:     `1px solid ${newPriority === p ? pColor(p) + '55' : 'rgba(255,255,255,0.08)'}`,
                      color:      newPriority === p ? pColor(p) : '#6b7280',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addTask}
              disabled={!newLabel.trim() || saving}
              className="mt-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background:  newLabel.trim() && !saving
                  ? 'linear-gradient(135deg,#6EE7D8,#14B8A6)'
                  : 'rgba(255,255,255,0.06)',
                color:       newLabel.trim() && !saving ? '#111827' : '#9ca3af',
                boxShadow:   newLabel.trim() && !saving ? '0 4px 16px rgba(110,231,216,0.28)' : 'none',
                cursor:      newLabel.trim() && !saving ? 'pointer' : 'not-allowed',
                opacity:     saving ? 0.8 : 1,
              }}
              onMouseEnter={e => {
                if (newLabel.trim() && !saving)
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(110,231,216,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  newLabel.trim() && !saving ? '0 4px 16px rgba(110,231,216,0.28)' : 'none';
              }}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Adding…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </>
              )}
            </button>
          </div>

          {/* Tip */}
          <div
            className="flex items-start gap-2.5 rounded-xl p-3 mt-auto"
            style={{ background: 'rgba(110,231,216,0.05)', border: '1px solid #e5e7eb' }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#6EE7D8' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11px] leading-relaxed" style={{ color: '#6b7280' }}>
              Press <kbd className="px-1 py-0.5 rounded text-[10px]"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#1f2937' }}>Enter</kbd> to quickly add.
            </p>
          </div>
        </Card>
      </div>

      {/* ── Row 3: Priority subjects + Upcoming deadlines ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Priority subjects */}
        <Card>
          <SectionLabel>Priority Subjects</SectionLabel>
          <div className="space-y-4">
            {subjects.map((s) => (
              <div key={s.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: s.color, boxShadow: `0 0 6px ${s.color}70` }}
                    />
                    <span style={{ color: '#1f2937' }}>{s.name}</span>
                  </div>
                  <span style={{ color: '#6b7280' }}>
                    {s.hours}h this week
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#f5f7f4' }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width:      `${s.pct}%`,
                      background: s.color,
                      boxShadow:  `0 0 6px ${s.color}55`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming deadlines */}
        <Card>
          <SectionLabel>Upcoming Deadlines</SectionLabel>
          <div className="space-y-3">
            {deadlines.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-150"
                style={{
                  background: d.urgent ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.03)',
                  border:     `1px solid ${d.urgent ? 'rgba(239,68,68,0.18)' : 'rgba(110,231,216,0.08)'}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = d.urgent
                    ? 'rgba(239,68,68,0.35)' : 'rgba(110,231,216,0.22)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = d.urgent
                    ? 'rgba(239,68,68,0.18)' : 'rgba(110,231,216,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Calendar icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: d.urgent ? 'rgba(239,68,68,0.12)' : 'rgba(110,231,216,0.08)',
                    color:      d.urgent ? '#f87171' : '#6EE7D8',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#1f2937' }}>{d.title}</p>
                  <p className="text-[11px]" style={{ color: '#6b7280' }}>{d.subject}</p>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: d.urgent ? '#f87171' : '#6EE7D8' }}
                  >
                    {d.due}
                  </span>
                  {d.urgent && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}
                    >
                      URGENT
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
