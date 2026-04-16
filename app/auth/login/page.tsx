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
      style={{ background: '#222022' }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.07]"
          style={{ background: '#6EE7D8' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.07]"
          style={{ background: '#14B8A6' }}
        />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'transform 0.2s, filter 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.filter =
                'drop-shadow(0 0 12px rgba(110,231,216,0.5))';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.filter = 'none';
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EduFlow AI"
              style={{ height: '80px', width: 'auto', display: 'block' }}
            />
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#2a282a',
            border: '1px solid rgba(110,231,216,0.16)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          }}
        >
          <h1 className="text-2xl font-bold mb-1 gradient-text">Welcome back</h1>
          <p className="text-sm mb-7" style={{ color: '#7ca8a3' }}>
            Log in to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#d1faf5' }}>
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium" style={{ color: '#d1faf5' }}>Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs transition-colors duration-150"
                  style={{ color: '#6EE7D8' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#5EEAD4'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6EE7D8'; }}
                >
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary justify-center mt-1 py-3"
              style={{ opacity: loading ? 0.75 : 1 }}
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

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(110,231,216,0.10)' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(110,231,216,0.10)' }} />
          </div>

          <p className="text-center text-sm" style={{ color: '#7ca8a3' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold transition-colors duration-150"
              style={{ color: '#6EE7D8' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#5EEAD4'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6EE7D8'; }}
            >
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} EduFlow AI — All rights reserved.
        </p>
      </div>
    </div>
  );
}
