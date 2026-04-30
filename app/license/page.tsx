"use client";

import Link from "next/link";

export default function LicensePage() {
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
          EduFlow AI – Proprietary License
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Copyright (c) 2026 Prabhakar Shukla. All Rights Reserved.
        </p>

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
              1. Ownership
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              This software, including all source code, design, structure,
              features, and related materials (collectively, the "Software"), is
              the exclusive property of Prabhakar Shukla (hereinafter referred
              to as the "Owner").
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
              2. Restrictions
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "0.75rem" }}>
              You are NOT permitted to:
            </p>
            <ul
              style={{
                marginLeft: "1.5rem",
                color: "#6b7280",
                lineHeight: "1.8",
                listStyleType: "disc",
              }}
            >
              <li>
                Copy, reproduce, or redistribute the Software or any portion of
                it
              </li>
              <li>
                Modify, adapt, reverse engineer, or create derivative works
              </li>
              <li>Use the Software for commercial purposes</li>
              <li>Sell, sublicense, or exploit the Software in any form</li>
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
              3. Limited Access
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              Access to this repository or Software does NOT grant any rights to
              use, copy, or distribute the code unless explicitly permitted in
              writing by the Owner.
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
              4. Permissions
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "0.75rem",
                lineHeight: "1.6",
              }}
            >
              Any use of the Software beyond viewing requires prior written
              permission from the Owner.
            </p>
            <p
              style={{
                color: "#6b7280",
                fontWeight: "500",
                marginBottom: "0.5rem",
              }}
            >
              For permissions, contact:
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
              5. Enforcement
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              Any unauthorized use, reproduction, or distribution of the
              Software may result in legal action.
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
              6. Disclaimer
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              The Software is provided "as is", without warranty of any kind.
              The Owner shall not be liable for any damages arising from its
              use.
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
              7. Updates
            </h2>
            <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
              The Owner reserves the right to modify or update this license at
              any time without prior notice.
            </p>
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
