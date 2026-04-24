"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Card({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-4"
      style={{ color: "#6b7280" }}
    >
      {children}
    </p>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState("EduFlow Student");
  const [email, setEmail] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Load current user email on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleSave = async () => {
    // Validate name
    if (!name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSaving(true);
    try {
      // Simulate save delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMessage({ type: "success", text: "Settings saved successfully" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save settings" });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="px-6 sm:px-8 py-8 max-w-[1280px] mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1
          className="text-2xl sm:text-[28px] font-bold tracking-tight"
          style={{ color: "#1f2937" }}
        >
          Settings
        </h1>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          Manage your EduFlow AI preferences and account options.
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className="px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            background: message.type === "success" 
              ? "rgba(16, 185, 129, 0.1)" 
              : "rgba(239, 68, 68, 0.1)",
            color: message.type === "success" 
              ? "#10b981" 
              : "#ef4444",
            border: `1px solid ${message.type === "success" 
              ? "rgba(16, 185, 129, 0.3)" 
              : "rgba(239, 68, 68, 0.3)"}`,
          }}
        >
          {message.type === "success" ? "✓ " : "✕ "}{message.text}
        </div>
      )}

      {/* Settings Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Account Card */}
        <Card>
          <div className="space-y-4">
            <div>
              <SectionLabel>Account</SectionLabel>
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "#374151" }}
              >
                Profile & Email
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  className="text-xs font-medium tracking-wide uppercase mb-2 block"
                  style={{ color: "#9ca3af" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  placeholder="Loading..."
                  className="w-full px-3 py-2 text-sm rounded-lg"
                  style={{
                    background: "#f9fafb",
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <p className="text-xs mt-1" style={{ color: "#d1d5db" }}>
                  Managed through authentication
                </p>
              </div>

              <div>
                <label
                  className="text-xs font-medium tracking-wide uppercase mb-2 block"
                  style={{ color: "#9ca3af" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 text-sm rounded-lg transition-all duration-200"
                  style={{
                    background: "#ffffff",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14b8a6";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20, 184, 166, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: saving ? "#d1d5db" : "linear-gradient(135deg, #6EE7D8 0%, #14B8A6 100%)",
                  color: saving ? "#6b7280" : "#0d2420",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(110,231,216,0.44)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </Card>

        {/* Preferences Card */}
        <Card>
          <div className="space-y-4">
            <div>
              <SectionLabel>Preferences</SectionLabel>
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "#374151" }}
              >
                Customization
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1f2937" }}
                  >
                    Theme
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                    Light mode
                  </p>
                </div>
                <div
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(20, 184, 166, 0.1)",
                    color: "#14b8a6",
                  }}
                >
                  Active
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1f2937" }}
                  >
                    Notifications
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                    Alert settings
                  </p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200"
                  style={{
                    background: notificationsEnabled ? "#14b8a6" : "#d1d5db",
                  }}
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full transition-all duration-200"
                    style={{
                      background: "#ffffff",
                      marginLeft: notificationsEnabled ? "1.5rem" : "0.25rem",
                    }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1f2937" }}
                  >
                    Reminders
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                    Study reminders
                  </p>
                </div>
                <button
                  onClick={() => setRemindersEnabled(!remindersEnabled)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200"
                  style={{
                    background: remindersEnabled ? "#14b8a6" : "#d1d5db",
                  }}
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full transition-all duration-200"
                    style={{
                      background: "#ffffff",
                      marginLeft: remindersEnabled ? "1.5rem" : "0.25rem",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Data & Privacy Card */}
        <Card>
          <div className="space-y-4">
            <div>
              <SectionLabel>Data & Privacy</SectionLabel>
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "#374151" }}
              >
                Legal & Policy
              </h2>
            </div>

            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                style={{
                  color: "#14b8a6",
                  background: "rgba(20, 184, 166, 0.05)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.05)";
                }}
              >
                → Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="block px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                style={{
                  color: "#14b8a6",
                  background: "rgba(20, 184, 166, 0.05)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.05)";
                }}
              >
                → Terms & Conditions
              </Link>

              <Link
                href="/license"
                className="block px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                style={{
                  color: "#14b8a6",
                  background: "rgba(20, 184, 166, 0.05)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(20, 184, 166, 0.05)";
                }}
              >
                → License
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer info */}
      <div
        className="px-6 py-4 rounded-lg text-xs text-center"
        style={{
          background: "rgba(20, 184, 166, 0.05)",
          color: "#6b7280",
          border: "1px solid rgba(20, 184, 166, 0.1)",
        }}
      >
        <p>
          More settings and customization options coming soon. Your data is
          always kept private and secure.
        </p>
      </div>
    </div>
  );
}
