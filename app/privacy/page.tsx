"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
        {/* Back Link */}
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

        {/* Header */}
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

        {/* Intro */}
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

        {/* Content Sections */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Section 1: Information We Collect */}
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

          {/* Section 2: How We Use Your Information */}
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

          {/* Section 3: Data Storage */}
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

          {/* Section 4: Data Sharing */}
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

          {/* Section 5: Security */}
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

          {/* Section 6: User Rights */}
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

          {/* Section 7: Changes to Policy */}
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

          {/* Section 8: Contact */}
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
