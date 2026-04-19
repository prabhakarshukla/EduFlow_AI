'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

type SessionRow = {
  id: string;
  subject: string;
  duration_minutes: number;
  session_date: string;
  notes: string | null;
  created_at: string;
};

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(110,231,216,0.40)' }}>
      {children}
    </p>
  );
}

const formatDate = (isoDate: string) => {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const getLocalIsoDate = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function ProductivityPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [sessionDate, setSessionDate] = useState(getLocalIsoDate());
  const [notes, setNotes] = useState('');

  const loadSessions = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: qErr } = await supabase
        .from('productivity_sessions')
        .select('id,subject,duration_minutes,session_date,notes,created_at')
        .order('session_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (qErr) {
        setError(qErr.message);
        setSessions([]);
        return;
      }

      const mapped: SessionRow[] = (data ?? []).map((row: any) => ({
        id: String(row.id),
        subject: String(row.subject ?? ''),
        duration_minutes: Number(row.duration_minutes ?? 0),
        session_date: String(row.session_date),
        notes: (row.notes ?? null) as string | null,
        created_at: String(row.created_at),
      }));
      setSessions(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load sessions.');
      setSessions([]);
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
      if (data.user) await loadSessions();
      else setLoading(false);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    const totalHours = totalMinutes / 60;
    const totalSessions = sessions.length;
    const avgDuration = totalSessions ? Math.round(totalMinutes / totalSessions) : 0;
    const todayIso = getLocalIsoDate();
    const todayMinutes = sessions
      .filter((s) => s.session_date === todayIso)
      .reduce((sum, s) => sum + s.duration_minutes, 0);
    return { totalMinutes, totalHours, totalSessions, avgDuration, todayMinutes };
  }, [sessions]);

  const addSession = async () => {
    const cleanSubject = subject.trim();
    const cleanDuration = Number(durationMinutes);
    if (!cleanSubject || !Number.isFinite(cleanDuration) || cleanDuration <= 0 || !sessionDate) return;

    setError(null);
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const user = u.user;
      if (!user) {
        setError('You need to be logged in to add sessions.');
        return;
      }

      const payload = {
        user_id: user.id,
        subject: cleanSubject,
        duration_minutes: Math.round(cleanDuration),
        session_date: sessionDate,
        notes: notes.trim() || null,
      };

      const { error: insErr } = await supabase.from('productivity_sessions').insert(payload);
      if (insErr) {
        setError(insErr.message ?? 'Failed to create session.');
        return;
      }

      setSubject('');
      setDurationMinutes('');
      setSessionDate(getLocalIsoDate());
      setNotes('');
      await loadSessions();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create session.');
    } finally {
      setSaving(false);
    }
  };

  const deleteSession = async (id: string) => {
    setError(null);
    const prev = sessions;
    setSessions((rows) => rows.filter((row) => row.id !== id));
    try {
      const { error: delErr } = await supabase.from('productivity_sessions').delete().eq('id', id);
      if (delErr) {
        setSessions(prev);
        setError(delErr.message);
      }
    } catch (e) {
      setSessions(prev);
      setError(e instanceof Error ? e.message : 'Failed to delete session.');
    }
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6m4 13V10m4 9V4" />
            </svg>
            Productivity Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#e2fdf9' }}>
            Track sessions. Improve consistency.
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Log focused study sessions and monitor your progress every day.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Study Hours', value: `${stats.totalHours.toFixed(1)}h` },
          { label: 'Total Sessions', value: String(stats.totalSessions) },
          { label: 'Average Session Duration', value: `${stats.avgDuration} min` },
          { label: "Today's Study Time", value: `${stats.todayMinutes} min` },
        ].map((card) => (
          <Card key={card.label} className="p-5">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{card.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: '#d1faf5' }}>{card.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <SectionLabel>Add Study Session</SectionLabel>
          {error && (
            <div
              className="rounded-xl px-3 py-2 text-sm mb-4"
              role="alert"
              style={{
                background: 'rgba(248,113,113,0.10)',
                border: '1px solid rgba(248,113,113,0.22)',
                color: '#fecaca',
              }}
            >
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
                className="rounded-xl px-3 py-2.5 text-sm w-full"
                style={{ background: '#222022', border: '1px solid rgba(110,231,216,0.15)', color: '#d1faf5', outline: 'none' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="e.g. 50"
                className="rounded-xl px-3 py-2.5 text-sm w-full"
                style={{ background: '#222022', border: '1px solid rgba(110,231,216,0.15)', color: '#d1faf5', outline: 'none' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                Session Date
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="rounded-xl px-3 py-2.5 text-sm w-full"
                style={{ background: '#222022', border: '1px solid rgba(110,231,216,0.15)', color: '#d1faf5', outline: 'none' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What did you study in this session?"
                className="rounded-xl px-3 py-2.5 text-sm w-full"
                style={{
                  background: '#222022',
                  border: '1px solid rgba(110,231,216,0.15)',
                  color: '#d1faf5',
                  outline: 'none',
                  minHeight: '88px',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="button"
              onClick={addSession}
              disabled={saving || !subject.trim() || !sessionDate || Number(durationMinutes) <= 0}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  !saving && subject.trim() && sessionDate && Number(durationMinutes) > 0
                    ? 'linear-gradient(135deg,#6EE7D8,#14B8A6)'
                    : 'rgba(255,255,255,0.06)',
                color: !saving && subject.trim() && sessionDate && Number(durationMinutes) > 0 ? '#111' : 'rgba(255,255,255,0.25)',
                boxShadow:
                  !saving && subject.trim() && sessionDate && Number(durationMinutes) > 0
                    ? '0 4px 16px rgba(110,231,216,0.28)'
                    : 'none',
                cursor:
                  !saving && subject.trim() && sessionDate && Number(durationMinutes) > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              {saving ? 'Adding…' : 'Add Session'}
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Session History</SectionLabel>
            <button
              type="button"
              onClick={loadSessions}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(110,231,216,0.12)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Refresh
            </button>
          </div>

          <div className="space-y-2.5">
            {loading && (
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.08)' }}>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Loading your sessions…</p>
              </div>
            )}

            {!loading && sessions.length === 0 && !error && (
              <div className="rounded-xl p-5" style={{ background: 'rgba(110,231,216,0.05)', border: '1px dashed rgba(110,231,216,0.18)' }}>
                <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>No sessions yet.</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Add your first session to start tracking productivity.
                </p>
              </div>
            )}

            {!loading &&
              sessions.map((session) => (
                <div
                  key={session.id}
                  className="group rounded-xl p-4 transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.08)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>
                        {session.subject}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {session.duration_minutes} min • {formatDate(session.session_date)}
                      </p>
                      {session.notes ? (
                        <p className="text-xs mt-2 whitespace-pre-wrap" style={{ color: 'rgba(255,255,255,0.50)' }}>
                          {session.notes}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteSession(session.id)}
                      className="p-1.5 rounded-lg transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.30)' }}
                      title="Delete session"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = '#f87171';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.30)';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
