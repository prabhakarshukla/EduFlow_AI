'use client';

import Link from 'next/link';

export default function LicensePage() {
  return (
    <div className="min-h-screen px-4 py-20" style={{ background: '#fcfcf9' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
            style={{ color: '#14b8a6' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0d9488'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#14b8a6'; }}
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
            License
          </h1>
          <p className="text-lg" style={{ color: '#6b7280' }}>
            Proprietary License for EduFlow AI
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border p-8 md:p-12 space-y-8" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>
              EduFlow AI – Proprietary License
            </h2>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Copyright © 2026 Prabhakar Shukla. All Rights Reserved.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              1. Ownership
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              This software, including all source code, design, structure, features, and related materials (collectively, the "Software"), is the exclusive property of Prabhakar Shukla (hereinafter referred to as the "Owner").
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              2. Restrictions
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              You are NOT permitted to:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Copy, reproduce, or redistribute the Software or any portion of it',
                'Modify, adapt, reverse engineer, or create derivative works',
                'Use the Software for commercial purposes',
                'Sell, sublicense, or exploit the Software in any form',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span style={{ color: '#6b7280' }}>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              3. Limited Access
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Access to this repository or Software does NOT grant any rights to use, copy, or distribute the code unless explicitly permitted in writing by the Owner.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              4. Permissions
            </h3>
            <p className="leading-relaxed mb-3" style={{ color: '#6b7280' }}>
              Any use of the Software beyond viewing requires prior written permission from the Owner.
            </p>
            <p className="leading-relaxed mb-2" style={{ color: '#6b7280' }}>
              For permissions, contact:
            </p>
            <p className="font-medium" style={{ color: '#14b8a6' }}>
              Email: prabhakarshukla669@gmail.com
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              5. Enforcement
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Any unauthorized use, reproduction, or distribution of the Software may result in legal action.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              6. Disclaimer
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              The Software is provided "as is", without warranty of any kind. The Owner shall not be liable for any damages arising from its use.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              7. Updates
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              The Owner reserves the right to modify or update this license at any time without prior notice.
            </p>
          </section>

          {/* CTA Button */}
          <div className="pt-6 flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #6ee7d8 100%)',
                color: '#ffffff',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 22px rgba(20,184,166,0.32)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
