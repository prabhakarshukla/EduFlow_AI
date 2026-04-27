"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!alive) return;
      setUser(data.user ?? null);
      setAuthReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMobileOpen(false);
    router.replace("/auth/login");
    router.refresh();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--ui-surface)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--ui-border)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] gap-6">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 transition-all duration-200"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EduFlow AI"
              style={{
                height: "48px",
                width: "auto",
                display: "block",
                filter:
                  "drop-shadow(0 1px 2px rgba(31,41,55,0.14)) contrast(1.06)",
              }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center px-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                style={{ color: "var(--ui-text)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#14b8a6";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(110,231,216,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--ui-text)";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {authReady && user ? (
              <>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                  style={{
                    color: "var(--ui-text)",
                    border: "1px solid var(--ui-border)",
                    background: "var(--ui-surface)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--ui-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--ui-surface)";
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                  style={{ color: "var(--ui-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#14b8a6";
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--ui-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--ui-muted)";
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)",
                    color: "#0d2420",
                    boxShadow: "0 3px 12px rgba(110,231,216,0.28)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 5px 18px rgba(110,231,216,0.44)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 3px 12px rgba(110,231,216,0.28)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  Get Started
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ color: "#6EE7D8", background: "rgba(110,231,216,0.06)" }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div
            className="md:hidden pb-5 pt-3"
            style={{ borderTop: "1px solid var(--ui-border)" }}
          >
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{ color: "var(--ui-text)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              {authReady && user ? (
                <>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors"
                    style={{
                      color: "#f87171",
                      borderColor: "rgba(248,113,113,0.28)",
                      background: "rgba(248,113,113,0.07)",
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors"
                    style={{
                      color: "var(--ui-muted)",
                      borderColor: "var(--ui-border)",
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2.5 text-center text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)",
                      color: "#0d2420",
                      boxShadow: "0 3px 12px rgba(110,231,216,0.28)",
                    }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
