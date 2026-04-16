\'use client\';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

type MoodEntry = {
  id: string;
  mood: number; // 1..5
  note: string | null;
  occurred_at: string;
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
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'rgba(110,231,216,0.40)' }}
    >
      {children}
    </p>
  );
}

const moodMeta: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Rough',     color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  2: { label: 'Low',       color: '#fb7185', bg: 'rgba(251,113,133,0.10)' },
  3: { label: 'Okay',      color: '#fbbf24', bg: 'rgba(245,158,11,0.12)' },
  4: { label: 'Good',      color: '#6EE7D8', bg: 'rgba(110,231,216,0.10)' },
  5: { label: 'Great',     color: '#14B8A6', bg: 'rgba(20,184,166,0.12)' },
};

const formatWhen = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export default function MoodTrackerPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [mood, setMood] = useState<number>(4);
  const [note, setNote] = useState('');
  const [occurredAt, setOccurredAt] = useState<string>(''); // optional datetime-local

  const todaysAvg = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const todays = entries.filter(e => {
      const t = new Date(e.occurred_at);
      return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
    });
    if (!todays.length) return null;
    const avg = todays.reduce((sum, e) => sum + e.mood, 0) / todays.length;
    return Math.round(avg * 10) / 10;
  }, [entries]);

  const loadEntries = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: qErr } = await supabase
        .from('mood_entries')
        .select('id,mood,note,occurred_at')
        .order('occurred_at', { ascending: false });

      if (qErr) {
        setError(qErr.message);
        setEntries([]);
        return;
      }
      setEntries((data ?? []).map((r: any) => ({
        id: String(r.id),
        mood: Number(r.mood),
        note: (r.note ?? null) as string | null,
        occurred_at: String(r.occurred_at),
      })));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load mood history.');
      setEntries([]);
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
      if (data.user) await loadEntries();
      else setLoading(false);
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEntry = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const user = u.user;
      if (!user) {
        setError('You need to be logged in to add mood entries.');
        return;
      }

      const iso = occurredAt
        ? new Date(occurredAt).toISOString()
        : new Date().toISOString();

      const { error: insErr } = await supabase.from('mood_entries').insert({
        user_id: user.id,
        mood,
        note: note.trim() || null,
        occurred_at: iso,
      });

      if (insErr) {
        setError(insErr.message ?? 'Failed to save mood entry.');
        return;
      }

      setSuccess('Saved.');
      setNote('');
      setOccurredAt('');
      await loadEntries();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save mood entry.');
    } finally {
      setSaving(false);
      // fade success after a moment
      window.setTimeout(() => setSuccess(null), 1400);
    }
  };

  const deleteEntry = async (id: string) => {
    setError(null);
    const prev = entries;
    setEntries(es => es.filter(e => e.id !== id));
    try {
      const { error: delErr } = await supabase.from('mood_entries').delete().eq('id', id);
      if (delErr) {
        setEntries(prev);
        setError(delErr.message);
      }
    } catch (e) {
      setEntries(prev);
      setError(e instanceof Error ? e.message : 'Failed to delete entry.');
    }
  };

  const updateNote = async (id: string, newNote: string) => {
    setError(null);
    const prev = entries;
    setEntries(es => es.map(e => (e.id === id ? { ...e, note: newNote.trim() || null } : e)));
    try {
      const { error: upErr } = await supabase
        .from('mood_entries')
        .update({ note: newNote.trim() || null })
        .eq('id', id);
      if (upErr) {
        setEntries(prev);
        setError(upErr.message);
      }
    } catch (e) {
      setEntries(prev);
      setError(e instanceof Error ? e.message : 'Failed to update entry.');
    }
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mood Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#6EE7D8' }}>
            Check in. Stay balanced.
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Log your mood in seconds and spot patterns over time.
          </p>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl flex-shrink-0"
          style={{ background: '#2a282a', border: '1px solid rgba(110,231,216,0.15)' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#6EE7D8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: '#d1faf5' }}>
            {todaysAvg ? `Today avg: ${todaysAvg}/5` : 'Today avg: —'}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Quick check-in */}
        <Card className="lg:col-span-1 flex flex-col gap-4">
          <SectionLabel>Quick Check-in</SectionLabel>

          {error && (
            <div
              className="rounded-xl px-3 py-2 text-sm"
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
          {success && (
            <div
              className="rounded-xl px-3 py-2 text-sm"
              role="status"
              style={{
                background: 'rgba(110,231,216,0.10)',
                border: '1px solid rgba(110,231,216,0.22)',
                color: '#d1faf5',
              }}
            >
              {success}
            </div>
          )}

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(v => {
              const meta = moodMeta[v];
              const active = mood === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMood(v)}
                  className="py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
                  style={{
                    background: active ? meta.bg : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? meta.color + '55' : 'rgba(110,231,216,0.10)'}`,
                    color: active ? meta.color : 'rgba(255,255,255,0.45)',
                    boxShadow: active ? `0 0 14px ${meta.color}18` : 'none',
                  }}
                  title={meta.label}
                >
                  {v}
                </button>
              );
            })}
          </div>

          <div
            className="rounded-xl px-3 py-2.5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.10)' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#d1faf5' }}>
              {moodMeta[mood].label}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Add a quick note (optional) — what influenced today?
            </p>
          </div>

          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="e.g. Slept well, finished tasks, felt focused…"
            className="rounded-xl px-3 py-2.5 text-sm"
            style={{
              minHeight: '110px',
              resize: 'none',
              background: '#222022',
              border: '1px solid rgba(110,231,216,0.15)',
              color: '#d1faf5',
              outline: 'none',
            }}
          />

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
              Time (optional)
            </label>
            <input
              type="datetime-local"
              value={occurredAt}
              onChange={e => setOccurredAt(e.target.value)}
              className="rounded-xl px-3 py-2.5 text-sm w-full"
              style={{
                background: '#222022',
                border: '1px solid rgba(110,231,216,0.15)',
                color: '#d1faf5',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="button"
            onClick={addEntry}
            disabled={saving}
            className="mt-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: saving ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,#6EE7D8,#14B8A6)',
              color: saving ? 'rgba(255,255,255,0.25)' : '#111',
              boxShadow: saving ? 'none' : '0 4px 16px rgba(110,231,216,0.28)',
              opacity: saving ? 0.85 : 1,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                </svg>
                Save check-in
              </>
            )}
          </button>
        </Card>

        {/* History */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <SectionLabel>Mood History</SectionLabel>
              <p className="text-sm font-semibold -mt-2" style={{ color: '#d1faf5' }}>
                {entries.length} check-in{entries.length === 1 ? '' : 's'}
              </p>
            </div>
            <button
              type="button"
              onClick={loadEntries}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(110,231,216,0.12)',
                color: 'rgba(255,255,255,0.55)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.28)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.12)'; }}
            >
              Refresh
            </button>
          </div>

          <div className="space-y-2.5">
            {loading && (
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.08)' }}
              >
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Loading your mood history…</p>
              </div>
            )}

            {!loading && entries.length === 0 && !error && (
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(110,231,216,0.05)', border: '1px dashed rgba(110,231,216,0.18)' }}
              >
                <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>No check-ins yet.</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Add your first mood check-in on the left — it takes 5 seconds.
                </p>
              </div>
            )}

            {!loading && entries.map((e) => {
              const meta = moodMeta[e.mood] ?? moodMeta[3];
              return (
                <div
                  key={e.id}
                  className="group flex items-start gap-4 p-3.5 rounded-xl transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.08)' }}
                  onMouseEnter={ev => {
                    (ev.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.22)';
                    (ev.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={ev => {
                    (ev.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.08)';
                    (ev.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: meta.bg,
                      border: `1px solid ${meta.color}33`,
                      color: meta.color,
                      boxShadow: `0 0 12px ${meta.color}10`,
                    }}
                    title={meta.label}
                  >
                    <span className="text-sm font-bold">{e.mood}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>
                        {meta.label}
                      </p>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(110,231,216,0.07)', color: '#6EE7D8', border: '1px solid rgba(110,231,216,0.12)' }}
                      >
                        {formatWhen(e.occurred_at)}
                      </span>
                    </div>

                    <textarea
                      defaultValue={e.note ?? ''}
                      placeholder="Add a note…"
                      className="mt-2 w-full rounded-xl px-3 py-2.5 text-sm"
                      style={{
                        minHeight: '64px',
                        resize: 'none',
                        background: '#222022',
                        border: '1px solid rgba(110,231,216,0.12)',
                        color: '#d1faf5',
                        outline: 'none',
                      }}
                      onBlur={(ev) => updateNote(e.id, ev.currentTarget.value)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteEntry(e.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1.5 rounded-lg mt-1"
                    title="Delete"
                    style={{ color: 'rgba(255,255,255,0.30)' }}
                    onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.color = '#f87171'; }}
                    onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.30)'; }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
