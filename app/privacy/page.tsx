"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FormattedNote } from "@/components/notes/formatted-note";

type SharedNote = {
  id: string;
  title: string;
  content: string;
  subject: string | null;
  created_at: string;
  updated_at: string;
};

function PrivacyPageContent() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");
  const [note, setNote] = useState<SharedNote | null>(null);
  const [loading, setLoading] = useState(!!noteId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: queryError } = await supabase
          .from("notes")
          .select("id,title,content,subject,created_at,updated_at")
          .eq("id", noteId)
          .single();

        if (queryError || !data) {
          console.error("[shared-note] Query error:", queryError?.message);
          setError("Note not found or has been deleted.");
          return;
        }

        const sharedNote: SharedNote = {
          id: String(data.id),
          title: String(data.title ?? ""),
          content: String(data.content ?? ""),
          subject: (data.subject ?? null) as string | null,
          created_at: String(data.created_at),
          updated_at: String(data.updated_at),
        };

        setNote(sharedNote);
      } catch (e) {
        const errorMsg =
          e instanceof Error ? e.message : "Failed to load note.";
        console.error("[shared-note] Error:", errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (noteId) {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="max-w-2xl w-full">
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(110,231,216,0.05)",
                border: "1px solid rgba(110,231,216,0.15)",
              }}
            >
              <p style={{ color: "var(--ui-muted)" }}>Loading note…</p>
            </div>
          </div>
        </div>
      );
    }

    if (error || !note) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="max-w-2xl w-full">
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(248,113,113,0.10)",
                border: "1px solid rgba(248,113,113,0.22)",
              }}
            >
              <p style={{ color: "#b91c1c", fontWeight: "600" }}>
                {error || "Note not found."}
              </p>
              <p
                style={{ color: "var(--ui-muted)", marginTop: "0.5rem" }}
                className="text-sm"
              >
                The note you're looking for doesn't exist or has been deleted.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const fmt = (iso: string) => {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <div
        className="min-h-screen px-4 py-8"
        style={{ background: "var(--ui-bg)" }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(110,231,216,0.08)",
                color: "#6EE7D8",
                border: "1px solid rgba(110,231,216,0.18)",
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              EduFlow AI Notes
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--ui-heading)" }}
            >
              {note.title || "Untitled Note"}
            </h1>
            <p className="text-sm mt-2" style={{ color: "var(--ui-muted)" }}>
              {note.subject ? (
                <>
                  <span>Subject: {note.subject}</span> •{" "}
                  <span>Updated {fmt(note.updated_at)}</span>
                </>
              ) : (
                <span>Updated {fmt(note.updated_at)}</span>
              )}
            </p>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--ui-surface)",
              border: "1px solid var(--ui-border)",
            }}
          >
            <FormattedNote
              content={note.content}
              emptyText="No content available for this note."
            />
          </div>

          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(110,231,216,0.04)",
              border: "1px solid rgba(110,231,216,0.14)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--ui-muted)" }}>
              📌 This is a shared read-only view of a note created in EduFlow
              AI.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fcfcf9",
        color: "#1f2937",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#14b8a6",
            textDecoration: "none",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            display: "inline-block",
          }}
        >
          ← Back to Home
        </Link>

        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            marginTop: "2rem",
            color: "#1f2937",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
          <strong>Last Updated:</strong> April 2026
        </p>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
            EduFlow AI ("we", "our", "us") respects your privacy.
          </p>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              1. Information We Collect
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              We may collect:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>Name and email address</li>
              <li>Usage data such as features used and interactions</li>
              <li>Notes or content created within the platform</li>
            </ul>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              2. How We Use Your Information
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              We use your data to:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>Provide and improve our services</li>
              <li>Personalize user experience</li>
              <li>Maintain platform security</li>
            </ul>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              3. Data Storage
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              Your data may be stored securely using third-party services like
              databases and cloud providers.
            </p>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              4. Data Sharing
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              We do NOT sell your personal data.
              <br />
              We may share data only when required by law.
            </p>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              5. Security
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              We take reasonable steps to protect your data, but no system is
              100% secure.
            </p>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              6. User Rights
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              You can request:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>Access to your data</li>
              <li>Deletion of your data</li>
            </ul>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              7. Changes to Policy
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              We may update this Privacy Policy anytime.
            </p>
          </section>

          <section
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#374151",
              }}
            >
              8. Contact
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              For privacy concerns:
            </p>
            <a
              href="mailto:prabhakarshukla669@gmail.com"
              style={{
                color: "#14b8a6",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              prabhakarshukla669@gmail.com
            </a>
          </section>
        </div>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid #e5e7eb",
            color: "#6b7280",
            fontSize: "0.875rem",
          }}
        >
          <p>EduFlow AI © 2026. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#fcfcf9" }}
        >
          <div style={{ color: "#6b7280" }}>Loading…</div>
        </div>
      }
    >
      <PrivacyPageContent />
    </Suspense>
  );
}
