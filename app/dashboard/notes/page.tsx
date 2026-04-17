'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

type NoteRow = {
  id: string;
  title: string;
  content: string;
  subject: string | null;
  pinned: boolean;
  created_at: string;
  updated_at: string;
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

const fmt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric' });
};

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Editor state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const selected = useMemo(
    () => notes.find(n => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? notes.filter(n =>
          (n.title || '').toLowerCase().includes(q) ||
          (n.subject || '').toLowerCase().includes(q) ||
          (n.content || '').toLowerCase().includes(q)
        )
      : notes;
    // pinned first, then updated_at desc
    return [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [notes, query]);

  const loadNotes = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: qErr } = await supabase
        .from('notes')
        .select('id,title,content,subject,pinned,created_at,updated_at')
        .order('updated_at', { ascending: false });

      if (qErr) {
        setError(qErr.message);
        setNotes([]);
        return;
      }

      const mapped: NoteRow[] = (data ?? []).map((r: any) => ({
        id: String(r.id),
        title: String(r.title ?? ''),
        content: String(r.content ?? ''),
        subject: (r.subject ?? null) as string | null,
        pinned: Boolean(r.pinned),
        created_at: String(r.created_at),
        updated_at: String(r.updated_at),
      }));

      setNotes(mapped);
      if (!selectedId && mapped.length) {
        setSelectedId(mapped[0].id);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load notes.');
      setNotes([]);
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
      if (data.user) await loadNotes();
      else setLoading(false);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync editor when selecting a note
  useEffect(() => {
    if (!selected) return;
    setTitle(selected.title);
    setSubject(selected.subject ?? '');
    setContent(selected.content ?? '');
    setPinned(Boolean(selected.pinned));
  }, [selected?.id]); // intentionally only on selection change

  const flashSuccess = (msg: string) => {
    setSuccess(msg);
    window.setTimeout(() => setSuccess(null), 1400);
  };

  const createNote = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const user = u.user;
      if (!user) {
        setError('You need to be logged in to create notes.');
        return;
      }

      const nowTitle = 'Untitled note';
      const { data, error: insErr } = await supabase
        .from('notes')
        .insert({
          user_id: user.id,
          title: nowTitle,
          content: '',
          subject: null,
          pinned: false,
        })
        .select('id,title,content,subject,pinned,created_at,updated_at')
        .single();

      if (insErr) {
        setError(insErr.message ?? 'Failed to create note.');
        return;
      }

      const created: NoteRow = {
        id: String((data as any).id),
        title: String((data as any).title ?? nowTitle),
        content: String((data as any).content ?? ''),
        subject: ((data as any).subject ?? null) as string | null,
        pinned: Boolean((data as any).pinned),
        created_at: String((data as any).created_at),
        updated_at: String((data as any).updated_at),
      };

      setNotes(ns => [created, ...ns]);
      setSelectedId(created.id);
      flashSuccess('Note created.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create note.');
    } finally {
      setSaving(false);
    }
  };

  const saveNote = async () => {
    if (!selectedId) return;
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const payload = {
        title: title.trim() || 'Untitled note',
        subject: subject.trim() || null,
        content: content ?? '',
        pinned,
      };

      const { data, error: upErr } = await supabase
        .from('notes')
        .update(payload)
        .eq('id', selectedId)
        .select('id,title,content,subject,pinned,created_at,updated_at')
        .single();

      if (upErr) {
        setError(upErr.message ?? 'Failed to save note.');
        return;
      }

      const updated: NoteRow = {
        id: String((data as any).id),
        title: String((data as any).title ?? payload.title),
        content: String((data as any).content ?? payload.content),
        subject: ((data as any).subject ?? payload.subject) as string | null,
        pinned: Boolean((data as any).pinned),
        created_at: String((data as any).created_at),
        updated_at: String((data as any).updated_at),
      };

      setNotes(ns => ns.map(n => (n.id === selectedId ? updated : n)));
      flashSuccess('Saved.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save note.');
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async () => {
    if (!selectedId) return;
    setError(null);
    setSuccess(null);
    const id = selectedId;
    const prev = notes;
    const nextNotes = notes.filter(n => n.id !== id);
    setNotes(nextNotes);
    setSelectedId(nextNotes[0]?.id ?? null);
    setSaving(true);
    try {
      const { error: delErr } = await supabase.from('notes').delete().eq('id', id);
      if (delErr) {
        setNotes(prev);
        setSelectedId(id);
        setError(delErr.message);
        return;
      }
      flashSuccess('Deleted.');
    } catch (e) {
      setNotes(prev);
      setSelectedId(id);
      setError(e instanceof Error ? e.message : 'Failed to delete note.');
    } finally {
      setSaving(false);
    }
  };

  const togglePin = async (id: string, nextPinned: boolean) => {
    setError(null);
    const prev = notes;
    setNotes(ns => ns.map(n => (n.id === id ? { ...n, pinned: nextPinned } : n)));
    try {
      const { error: upErr } = await supabase.from('notes').update({ pinned: nextPinned }).eq('id', id);
      if (upErr) {
        setNotes(prev);
        setError(upErr.message);
      } else {
        flashSuccess(nextPinned ? 'Pinned.' : 'Unpinned.');
        await loadNotes();
      }
    } catch (e) {
      setNotes(prev);
      setError(e instanceof Error ? e.message : 'Failed to update note.');
    }
  };

  const generateWithAi = async () => {
    if (!selectedId) {
      setAiError('Select or create a note first.');
      return;
    }
    const topic = aiTopic.trim();
    if (!topic) {
      setAiError('Enter a topic to generate notes.');
      return;
    }

    setAiError(null);
    setAiLoading(true);
    try {
      const res = await fetch('/api/notes-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = (await res.json()) as { notes?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate notes.');
      }

      const generated = (data.notes ?? '').trim();
      if (!generated) {
        throw new Error('AI returned empty notes.');
      }

      setTitle(`${topic} Notes`);
      setSubject(topic);
      setContent(generated);
      flashSuccess('AI notes generated. Review and save.');
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Failed to generate notes.');
    } finally {
      setAiLoading(false);
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Notes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#6EE7D8' }}>
            Write once. Review fast.
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Keep clean, revision-ready notes — organised by subject.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={createNote}
            disabled={saving}
            className="btn-primary justify-center text-xs px-4 py-2.5"
            style={{ opacity: saving ? 0.8 : 1 }}
          >
            + New note
          </button>
          <button
            type="button"
            onClick={saveNote}
            disabled={saving || !selectedId}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150"
            style={{
              background: selectedId ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(110,231,216,0.12)',
              color: selectedId ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
              cursor: selectedId ? 'pointer' : 'not-allowed',
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={deleteNote}
            disabled={saving || !selectedId}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150"
            style={{
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.22)',
              color: selectedId ? '#fecaca' : 'rgba(255,255,255,0.25)',
              opacity: selectedId ? 1 : 0.6,
              cursor: selectedId ? 'pointer' : 'not-allowed',
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* List */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Your Notes</SectionLabel>
            <button
              type="button"
              onClick={loadNotes}
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

          {(error || success) && (
            <div className="space-y-2 mb-4">
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
            </div>
          )}

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="rounded-xl px-3 py-2.5 text-sm w-full mb-4"
            style={{
              background: '#222022',
              border: '1px solid rgba(110,231,216,0.15)',
              color: '#d1faf5',
              outline: 'none',
            }}
          />

          <div className="space-y-2.5">
            {loading && (
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110,231,216,0.08)' }}
              >
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Loading your notes…</p>
              </div>
            )}

            {!loading && filtered.length === 0 && !error && (
              <div
                className="rounded-xl p-5"
                style={{ background: 'rgba(110,231,216,0.05)', border: '1px dashed rgba(110,231,216,0.18)' }}
              >
                <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>No notes yet.</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  Create your first note — keep it structured and concise.
                </p>
              </div>
            )}

            {!loading && filtered.map(n => {
              const active = n.id === selectedId;
              return (
                <div
                  key={n.id}
                  className="group p-3.5 rounded-xl cursor-pointer transition-all duration-150"
                  style={{
                    background: active ? 'rgba(110,231,216,0.10)' : 'rgba(255,255,255,0.03)',
                    border: active ? '1px solid rgba(110,231,216,0.28)' : '1px solid rgba(110,231,216,0.08)',
                    boxShadow: active ? '0 0 12px rgba(110,231,216,0.08)' : 'none',
                  }}
                  onClick={() => setSelectedId(n.id)}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.22)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.08)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        togglePin(n.id, !n.pinned);
                      }}
                      className="mt-0.5 p-1.5 rounded-lg transition-colors duration-150"
                      title={n.pinned ? 'Unpin' : 'Pin'}
                      style={{ color: n.pinned ? '#fbbf24' : 'rgba(255,255,255,0.25)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fbbf24'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = n.pinned ? '#fbbf24' : 'rgba(255,255,255,0.25)'; }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M16 3l5 5-6.5 6.5v5.5l-3-2-3 2v-5.5L3 8l5-5h8z" />
                      </svg>
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#d1faf5' }}>
                        {n.title || 'Untitled note'}
                      </p>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {(n.subject ?? 'General')}{' '}• updated {fmt(n.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <SectionLabel>Editor</SectionLabel>

          {!selectedId && !loading ? (
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(110,231,216,0.05)', border: '1px dashed rgba(110,231,216,0.18)' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#d1faf5' }}>Select a note to edit.</p>
              <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
                Or create a new note to start writing.
              </p>
            </div>
          ) : (
            <>
              <div
                className="rounded-xl p-4 space-y-3"
                style={{ background: 'rgba(110,231,216,0.04)', border: '1px solid rgba(110,231,216,0.14)' }}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(110,231,216,0.50)' }}>
                    AI Notes Generator
                  </p>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Auto-fills this editor
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={aiTopic}
                    onChange={e => {
                      setAiTopic(e.target.value);
                      if (aiError) setAiError(null);
                    }}
                    placeholder="Enter topic (e.g. Electromagnetic Induction)"
                    className="rounded-xl px-3 py-2.5 text-sm w-full"
                    style={{
                      background: '#222022',
                      border: '1px solid rgba(110,231,216,0.15)',
                      color: '#d1faf5',
                      outline: 'none',
                    }}
                    disabled={!selectedId || aiLoading}
                  />
                  <button
                    type="button"
                    onClick={generateWithAi}
                    disabled={!selectedId || aiLoading || !aiTopic.trim()}
                    className="btn-primary justify-center text-xs px-4 py-2.5 whitespace-nowrap"
                    style={{
                      opacity: !selectedId || aiLoading || !aiTopic.trim() ? 0.7 : 1,
                      cursor: !selectedId || aiLoading || !aiTopic.trim() ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {aiLoading ? 'Generating…' : 'Generate with AI'}
                  </button>
                </div>
                {aiError && (
                  <div
                    className="rounded-xl px-3 py-2 text-sm"
                    role="alert"
                    style={{
                      background: 'rgba(248,113,113,0.10)',
                      border: '1px solid rgba(248,113,113,0.22)',
                      color: '#fecaca',
                    }}
                  >
                    {aiError}
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Chapter 4 — Thermodynamics"
                    className="rounded-xl px-3 py-2.5 text-sm w-full"
                    style={{
                      background: '#222022',
                      border: '1px solid rgba(110,231,216,0.15)',
                      color: '#d1faf5',
                      outline: 'none',
                    }}
                    disabled={!selectedId}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                    Subject
                  </label>
                  <input
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Physics"
                    className="rounded-xl px-3 py-2.5 text-sm w-full"
                    style={{
                      background: '#222022',
                      border: '1px solid rgba(110,231,216,0.15)',
                      color: '#d1faf5',
                      outline: 'none',
                    }}
                    disabled={!selectedId}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPinned(p => !p)}
                  disabled={!selectedId}
                  className="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                  style={{
                    background: pinned ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${pinned ? 'rgba(245,158,11,0.35)' : 'rgba(110,231,216,0.12)'}`,
                    color: pinned ? '#fbbf24' : 'rgba(255,255,255,0.55)',
                    cursor: selectedId ? 'pointer' : 'not-allowed',
                  }}
                >
                  {pinned ? 'Pinned' : 'Pin'}
                </button>
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  {selected ? `Last updated ${fmt(selected.updated_at)}` : ' '}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write clean notes here… Use headings, bullet points, examples."
                  className="rounded-xl px-3 py-3 text-sm w-full flex-1"
                  style={{
                    minHeight: '360px',
                    resize: 'none',
                    background: '#222022',
                    border: '1px solid rgba(110,231,216,0.15)',
                    color: '#d1faf5',
                    outline: 'none',
                    lineHeight: 1.6,
                  }}
                  disabled={!selectedId}
                />
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
