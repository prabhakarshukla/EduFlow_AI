'use client';

import Link from 'next/link';

export default function LicensePage() {
  return (
    <div className="min-h-screen px-4 py-20" style={{ background: '#fcfcf9' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
            style={{ color: '#14b8a6' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#0d9488';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = '#14b8a6';
            }}
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

        <div
          className="rounded-2xl border p-8 md:p-12 space-y-8"
          style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
        >
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>
              License Agreement
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: '#4b5563' }}>
              © 2026 EduFlow AI. All rights reserved.
            </p>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              This software and all associated documentation, source code, and compiled binaries are the exclusive property of EduFlow AI. This license grants you a limited, non-exclusive, non-transferable, and revocable right to use EduFlow AI solely for personal, educational, or authorized organizational purposes.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Grant of License
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Subject to the terms and conditions of this License Agreement, EduFlow AI grants you a non-exclusive, non-transferable license to access and use EduFlow AI for your personal, educational, or authorized organizational purposes. This license does not include the right to modify, reproduce, distribute, transmit, display, or sublicense EduFlow AI or any portion thereof.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Restrictions
            </h3>
            <div style={{ color: '#6b7280' }}>
              <p className="leading-relaxed mb-4">You may not:</p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Copy, modify, or create derivative works based on EduFlow AI</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Reverse engineer, decompile, or disassemble EduFlow AI</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Distribute, sell, rent, lease, or transfer licenses to EduFlow AI</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Sublicense or use EduFlow AI for commercial purposes without explicit written permission</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Remove or obscure any proprietary notices, labels, or marks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Use EduFlow AI in violation of applicable laws or regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Attempt unauthorized access to EduFlow AI or related systems</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Ownership
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              EduFlow AI retains all right, title, and interest in EduFlow AI, including all copies, modifications, and derivative works. No title to the intellectual property is transferred to you. All rights not expressly granted are reserved to EduFlow AI.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Termination
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              This License Agreement is effective until terminated. Your rights will terminate automatically without notice if you fail to comply with any terms of this agreement. Upon termination, you must cease all use of EduFlow AI.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Disclaimer of Warranties
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              EduFlow AI is provided "as is" without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, and noninfringement.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Limitation of Liability
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              In no event shall EduFlow AI be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, EduFlow AI.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              Contact
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              If you have questions about this License Agreement, please contact us through our website or support channels.
            </p>
          </section>

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
