'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--primary)' }} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--secondary)' }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" style={{ display:'flex', alignItems:'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EduFlow AI"
              style={{ height: '90px', width: 'auto', display: 'block' }}
            />
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}
        >
          <h1 className="text-2xl font-bold mb-1 gradient-text">Welcome back</h1>
          <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>
            Log in to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-body)' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>Password</label>
                <Link href="/auth/forgot-password" className="text-xs transition-colors" style={{ color: 'var(--primary)' }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center mt-1 py-3"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Logging in…
                </>
              ) : 'Log in'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold transition-colors" style={{ color: 'var(--primary)' }}>
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} EduFlow AI — All rights reserved.
        </p>
      </div>
    </div>
  );
}
