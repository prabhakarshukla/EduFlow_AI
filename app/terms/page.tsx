"use client";

import Link from "next/link";

export default function TermsPage() {
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
          Terms and Conditions
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
            Welcome to EduFlow AI ("we", "our", "us").
            <br />
            By accessing or using our platform, you agree to comply with and be
            bound by these Terms and Conditions.
          </p>
        </div>

        {/* Content Sections */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Section 1: Use of Service */}
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
              1. Use of Service
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              You agree to use EduFlow AI only for lawful purposes. You must
              not:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>Use the platform for illegal or harmful activities</li>
              <li>Attempt to hack, disrupt, or misuse the system</li>
              <li>
                Copy or exploit any part of the platform without permission
              </li>
            </ul>
          </section>

          {/* Section 2: User Accounts */}
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
              2. User Accounts
            </h2>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>
                We are not liable for any unauthorized access to your account
              </li>
            </ul>
          </section>

          {/* Section 3: Intellectual Property */}
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
              3. Intellectual Property
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              All content, features, and code are the exclusive property of
              EduFlow AI and are protected under applicable laws.
            </p>
          </section>

          {/* Section 4: Limitation of Liability */}
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
              4. Limitation of Liability
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              We are not responsible for:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>Any data loss</li>
              <li>Any academic or personal outcomes based on AI suggestions</li>
            </ul>
          </section>

          {/* Section 5: Termination */}
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
              5. Termination
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              We reserve the right to suspend or terminate access if users
              violate these terms.
            </p>
          </section>

          {/* Section 6: Changes to Terms */}
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
              6. Changes to Terms
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              We may update these Terms at any time without prior notice.
            </p>
          </section>

          {/* Section 7: Contact */}
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
              7. Contact
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              For any queries, contact us at:
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
