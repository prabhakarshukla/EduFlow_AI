// app/dashboard/doubt-solver/page.tsx
'use client';

import { FormEvent, useMemo, useState } from 'react';

type SolverStatus = 'idle' | 'loading' | 'success' | 'error';

type SolverResult = {
  answer: string;
  source?: string;
};

export default function DoubtSolverPage() {
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<SolverStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SolverResult | null>(null);

  const canSubmit = useMemo(() => question.trim().length > 0 && status !== 'loading', [question, status]);

  const resetState = () => {
    setStatus('idle');
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = question.trim();
    if (!q) return;

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = (await res.json()) as { answer?: string; source?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate answer.');
      }

      if (!data.answer || !data.answer.trim()) {
        throw new Error('AI returned an empty answer.');
      }

      setResult({
        answer: data.answer.trim(),
        source: data.source || 'ai',
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong while processing your question.');
    }
  };

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: '#2a282a',
          border: '1px solid rgba(110,231,216,0.12)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(110,231,216,0.45)' }}>
          AI Doubt Solver
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#6EE7D8' }}>
          Ask any academic doubt
        </h1>
        <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Type your question clearly and get an AI-generated explanation.
        </p>
      </div>

      {/* Input + submit */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-5 space-y-4"
        style={{
          background: '#2a282a',
          border: '1px solid rgba(110,231,216,0.12)',
        }}
      >
        <label htmlFor="question" className="text-sm font-semibold" style={{ color: '#d1faf5' }}>
          Your question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (status !== 'idle') resetState();
          }}
          placeholder="e.g. Explain Kirchhoff's Voltage Law with a simple circuit example."
          rows={5}
          className="w-full rounded-xl px-4 py-3 text-sm resize-y outline-none"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(110,231,216,0.15)',
            color: '#d1faf5',
          }}
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: canSubmit
                ? 'linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)'
                : 'rgba(255,255,255,0.10)',
              color: canSubmit ? '#111' : 'rgba(255,255,255,0.45)',
              boxShadow: canSubmit ? '0 4px 16px rgba(110,231,216,0.28)' : 'none',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            {status === 'loading' ? 'Solving...' : 'Get answer'}
          </button>

          <button
            type="button"
            onClick={() => {
              setQuestion('');
              resetState();
            }}
            className="px-4 py-2 text-xs font-medium rounded-lg transition-colors"
            style={{
              background: 'rgba(110,231,216,0.06)',
              border: '1px solid rgba(110,231,216,0.16)',
              color: 'rgba(110,231,216,0.9)',
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Answer panel */}
      <div
        className="rounded-2xl p-5 min-h-[180px]"
        style={{
          background: '#2a282a',
          border: '1px solid rgba(110,231,216,0.12)',
        }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#d1faf5' }}>
          Answer
        </h2>

        {status === 'idle' && (
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            No answer yet. Submit a question to get started.
          </p>
        )}

        {status === 'loading' && (
          <div className="space-y-2">
            <div className="h-3 rounded w-5/6" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="h-3 rounded w-4/6" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="h-3 rounded w-3/6" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Thinking...
            </p>
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm" style={{ color: '#f87171' }}>
            {error ?? 'Failed to solve your doubt.'}
          </p>
        )}

        {status === 'success' && result && (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#d1faf5' }}>
              {result.answer}
            </p>
            {result.source ? (
              <span
                className="inline-flex text-[10px] font-medium px-2 py-1 rounded"
                style={{ background: 'rgba(110,231,216,0.08)', color: '#6EE7D8' }}
              >
                Source: {result.source}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}