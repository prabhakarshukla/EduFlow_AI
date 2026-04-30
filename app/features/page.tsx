"use client";

import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: "📝",
      title: "Smart Note Taking",
      description:
        "Create, organize, and manage your notes with an intuitive editor. Pin important notes and organize by subject.",
    },
    {
      icon: "✨",
      title: "AI-Powered Notes Generator",
      description:
        "Generate comprehensive notes from your subjects using advanced AI. Save time and capture key concepts effortlessly.",
    },
    {
      icon: "📄",
      title: "Export as PDF",
      description:
        "Download your notes as professionally formatted PDFs. Perfect for sharing, archiving, or offline reading.",
    },
    {
      icon: "🔗",
      title: "Shareable Links",
      description:
        "Create shareable links for your notes. Share study materials with classmates and collaborate easily.",
    },
    {
      icon: "🎨",
      title: "Premium Theme",
      description:
        "Enjoy a modern, clean interface with the premium mint/teal theme. Optimized for focus and productivity.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Built with Next.js for blazing-fast performance. Experience smooth interactions and instant saves.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f0fffe",
        minHeight: "100vh",
        color: "#1f2937",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(110,231,216,0.08) 0%, rgba(110,231,216,0.04) 100%)",
          borderBottom: "1px solid rgba(110,231,216,0.15)",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              color: "#14b8a6",
              textDecoration: "none",
              fontSize: "0.875rem",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            ← Back to Home
          </Link>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            EduFlow AI Features
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.125rem",
              lineHeight: 1.6,
            }}
          >
            Powerful tools designed to supercharge your study and note-taking
            experience.
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                border: "1px solid rgba(110,231,216,0.18)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 10px 30px rgba(110,231,216,0.12)";
                el.style.borderColor = "rgba(110,231,216,0.28)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(110,231,216,0.18)";
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                {feature.icon}
              </div>
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#1f2937",
                }}
              >
                {feature.title}
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  lineHeight: 1.6,
                  fontSize: "0.95rem",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(110,231,216,0.06) 0%, rgba(110,231,216,0.02) 100%)",
          borderTop: "1px solid rgba(110,231,216,0.15)",
          borderBottom: "1px solid rgba(110,231,216,0.15)",
          padding: "3rem 1rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            Ready to Transform Your Learning?
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Start using EduFlow AI today and experience a smarter way to take
            notes, generate insights, and share knowledge.
          </p>
          <Link
            href="/dashboard/notes"
            style={{
              display: "inline-block",
              backgroundColor: "#14b8a6",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "#0d9488";
              el.style.boxShadow = "0 4px 15px rgba(20,184,166,0.25)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "#14b8a6";
              el.style.boxShadow = "none";
            }}
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "center",
          borderTop: "1px solid rgba(110,231,216,0.1)",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          EduFlow AI © 2026. Elevating education through intelligent
          note-taking.
        </p>
      </div>
    </div>
  );
}
