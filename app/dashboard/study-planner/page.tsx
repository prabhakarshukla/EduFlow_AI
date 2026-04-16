'use client';

import { useState } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */
type Priority = 'high' | 'medium' | 'low';
type Task = {
  id: number;
  label: string;
  subject: string;
  priority: Priority;
  done: boolean;
  due: string;
};

type WeekDay = { day: string; date: number; tasks: number; active: boolean };
type Subject = { name: string; color: string; hours: number; pct: number };
type Deadline = { title: string; subject: string; due: string; urgent: boolean };

/* ── Seed data ──────────────────────────────────────────────────── */
const initialTasks: Task[] = [
  { id: 1, label: 'Linear Algebra — Chapter 5 revision',   subject: 'Maths',    priority: 'high',   done: true,  due: 'Today'    },
  { id: 2, label: 'Physics Problem Set 3 (Q1–Q15)',        subject: 'Physics',  priority: 'high',   done: false, due: 'Today'    },
  { id: 3, label: 'Write Essay Draft — English Lit.',      subject: 'English',  priority: 'medium', done: false, due: 'Today'    },
  { id: 4, label: 'Mock Test: Chemistry Chapter 4',        subject: 'Chemistry',priority: 'high',   done: false, due: 'Today'    },
  { id: 5, label: 'Read History — Cold War chapter',       subject: 'History',  priority: 'low',    done: false, due: 'Today'    },
];

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
  p === 'high' ? '#f87171' : p === 'medium' ? '#fbbf24' : '#7ca8a3';
const pBg = (p: Priority) =>
  p === 'high' ? 'rgba(239,68,68,0.10)' : p === 'medium' ? 'rgba(245,158,11,0.10)' : 'rgba(255,255,255,0.05)';

/* ── Shared card shell ──────────────────────────────────────────── */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${className}`}
      style={{ background: '#2a282a', border: '1px solid rgba(110,231,216,0.12)' }}
    >
      {children}
    </div>
  );
}

/* ── Section label ──────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'rgba(110,231,216,0.40)' }}>
      {children}
    </p>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function StudyPlannerPage() {
  const [tasks, setTasks]           = useState<Task[]>(initialTasks);
  const [newLabel, setNewLabel]     = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [focused, setFocused]       = useState<string | null>(null);

  const done    = tasks.filter(t => t.done).length;
  const pending = tasks.length - done;
  const pct     = Math.round((done / tasks.length) * 100);

  const toggle = (id: number) =>
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const addTask = () => {
    if (!newLabel.trim()) return;
    setTasks(ts => [
      ...ts,
      {
        id:       Date.now(),
        label:    newLabel.trim(),
        subject:  newSubject.trim() || 'General',
        priority: newPriority,
        done:     false,
        due:      'Today',
      },
    ]);
    setNewLabel('');
    setNewSubject('');
    setNewPriority('medium');
  };

  /* Input focus ring helper */
  const inputStyle = (field: string): React.CSSProperties => ({
    background:  '#222022',
    border:      `1px solid ${focused === field ? 'rgba(110,231,216,0.45)' : 'rgba(110,231,216,0.15)'}`,
    boxShadow:   focused === field ? '0 0 0 3px rgba(110,231,216,0.07)' : 'none',
    color:       '#d1faf5',
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
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#6EE7D8' }}>
            Plan smarter, study better.
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Organise your tasks, track priority subjects, and never miss a deadline.
          </p>
        </div>

        {/* Progress pill */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: '#2a282a', border: '1px solid rgba(110,231,216,0.15)' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#6EE7D8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: '#d1faf5' }}>
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
                { label: 'Total',     value: tasks.length, color: 'rgba(255,255,255,0.45)' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span style={{ color: 'rgba(255,255,255,0.40)' }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(110,231,216,0.05)', border: '1px solid rgba(110,231,216,0.10)' }}
          >
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>7-day streak</p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Keep going — you&apos;re on fire!</p>
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
                  style={{ color: d.active ? '#6EE7D8' : 'rgba(255,255,255,0.35)' }}>
                  {d.day}
                </span>
                <span className="text-sm font-bold"
                  style={{ color: d.active ? '#6EE7D8' : '#d1faf5' }}>
                  {d.date}
                </span>
                <span
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: d.active ? 'rgba(110,231,216,0.20)' : 'rgba(255,255,255,0.06)',
                    color:      d.active ? '#6EE7D8' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {d.tasks}t
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal task load bar */}
          <div className="mt-5">
            <p className="text-[10px] mb-2" style={{ color: 'rgba(255,255,255,0.30)' }}>Weekly task load</p>
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
              <p className="text-sm font-semibold -mt-2" style={{ color: '#d1faf5' }}>
                {done} of {tasks.length} completed
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-24">
              <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width:      `${pct}%`,
                    background: 'linear-gradient(90deg,#6EE7D8,#14B8A6)',
                    boxShadow:  '0 0 6px rgba(110,231,216,0.4)',
                  }}
                />
              </div>
              <p className="text-[10px] text-right mt-1" style={{ color: 'rgba(255,255,255,0.30)' }}>{pct}%</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150 group"
                style={{
                  background: task.done ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.03)',
                  border:     '1px solid rgba(110,231,216,0.08)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.22)';
                  (e.currentTarget as HTMLElement).style.background  = task.done
                    ? 'rgba(110,231,216,0.07)' : 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.08)';
                  (e.currentTarget as HTMLElement).style.background  = task.done
                    ? 'rgba(110,231,216,0.04)' : 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggle(task.id)}
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                  style={{
                    borderColor: task.done ? '#6EE7D8' : 'rgba(110,231,216,0.30)',
                    background:  task.done ? '#6EE7D8' : 'transparent',
                  }}
                >
                  {task.done && (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="#111" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate ${task.done ? 'line-through' : ''}`}
                    style={{ color: task.done ? 'rgba(255,255,255,0.30)' : '#d1faf5' }}
                  >
                    {task.label}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.30)' }}>
                    {task.subject}
                  </p>
                </div>

                {/* Priority */}
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: pBg(task.priority), color: pColor(task.priority) }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick add */}
        <Card className="flex flex-col gap-4">
          <SectionLabel>Quick Add Task</SectionLabel>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
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
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
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
                      color:      newPriority === p ? pColor(p) : 'rgba(255,255,255,0.40)',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addTask}
              disabled={!newLabel.trim()}
              className="mt-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background:  newLabel.trim()
                  ? 'linear-gradient(135deg,#6EE7D8,#14B8A6)'
                  : 'rgba(255,255,255,0.06)',
                color:       newLabel.trim() ? '#111' : 'rgba(255,255,255,0.25)',
                boxShadow:   newLabel.trim() ? '0 4px 16px rgba(110,231,216,0.28)' : 'none',
                cursor:      newLabel.trim() ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={e => {
                if (newLabel.trim())
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(110,231,216,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  newLabel.trim() ? '0 4px 16px rgba(110,231,216,0.28)' : 'none';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>

          {/* Tip */}
          <div
            className="flex items-start gap-2.5 rounded-xl p-3 mt-auto"
            style={{ background: 'rgba(110,231,216,0.05)', border: '1px solid rgba(110,231,216,0.10)' }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#6EE7D8' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>
              Press <kbd className="px-1 py-0.5 rounded text-[10px]"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#d1faf5' }}>Enter</kbd> to quickly add.
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
                    <span style={{ color: '#d1faf5' }}>{s.name}</span>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.40)' }}>
                    {s.hours}h this week
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
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
                  <p className="text-sm font-medium truncate" style={{ color: '#d1faf5' }}>{d.title}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{d.subject}</p>
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
