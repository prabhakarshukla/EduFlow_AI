"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

function AuthNotice({
  message,
  tone,
}: {
  message: string;
  tone: "error" | "success";
}) {
  const isError = tone === "error";

  return (
    <div
      className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-sm"
      role={isError ? "alert" : "status"}
      style={{
        background: isError
          ? "rgba(248,113,113,0.08)"
          : "rgba(110,231,216,0.08)",
        border: isError
          ? "1px solid rgba(248,113,113,0.22)"
          : "1px solid rgba(110,231,216,0.22)",
        color: isError ? "#fca5a5" : "#d1faf5",
      }}
    >
      <svg
        className="w-4 h-4 mt-0.5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isError ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      {message}
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/update-password`,
        },
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(
        "Reset link sent. Check your email and follow the link to choose a new password.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send a reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "#222022" }}
    >
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-48 -right-48 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: "#6EE7D8", opacity: 0.055 }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[440px] h-[440px] rounded-full blur-3xl"
          style={{ background: "#14B8A6", opacity: 0.055 }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(110,231,216,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.5,
          }}
        />
      </div>

      <div className="relative w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="inline-flex transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 16px rgba(110,231,216,0.45))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "none";
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EduFlow AI"
              style={{ height: "72px", width: "auto", display: "block" }}
            />
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#2a282a",
            border: "1px solid rgba(110,231,216,0.15)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.40), 0 32px 64px rgba(0,0,0,0.28)",
          }}
        >
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, #6EE7D8, #14B8A6, transparent)",
            }}
          />

          <div className="px-8 py-8">
            <div className="mb-7">
              <h1
                className="text-[22px] font-bold tracking-tight mb-1.5"
                style={{ color: "#e2fdf9" }}
              >
                Reset your password
              </h1>
              <p className="text-sm" style={{ color: "#7ca8a3" }}>
                Enter your email and we&apos;ll send a secure reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <AuthNotice message={error} tone="error" />}
              {success && <AuthNotice message={success} tone="success" />}

              <div className="space-y-1.5">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "rgba(209,250,245,0.75)" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 mt-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: loading
                    ? "rgba(110,231,216,0.35)"
                    : "linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)",
                  color: "#0d2420",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 16px rgba(110,231,216,0.30)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.boxShadow =
                      "0 6px 22px rgba(110,231,216,0.46)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(110,231,216,0.30)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(110,231,216,0.09)" }}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                or
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(110,231,216,0.09)" }}
              />
            </div>

            <p className="text-center text-sm" style={{ color: "#7ca8a3" }}>
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-semibold transition-colors duration-150"
                style={{ color: "#6EE7D8" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5EEAD4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6EE7D8";
                }}
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>

        <p
          className="text-center text-[11px] mt-5"
          style={{ color: "rgba(255,255,255,0.20)" }}
        >
          (c) {new Date().getFullYear()} EduFlow AI - All rights reserved.
        </p>
      </div>
    </div>
  );
}
