'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: '#6b7280' }}>
            Last updated: April 2026
          </p>
        </div>

        <div
          className="rounded-2xl border p-8 md:p-12 space-y-8"
          style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
        >
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>
              Privacy Policy
            </h2>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              EduFlow AI is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              1. Information We Collect
            </h3>
            <div style={{ color: '#6b7280' }}>
              <p className="leading-relaxed mb-4">We may collect information in the following ways:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Personal identification information you provide</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Device information and operating system details</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Usage data about how you interact with our services</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Location information when permitted</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              2. Use of Your Information
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We use collected information to provide, maintain, and improve our services; personalize your experience; send communications; monitor trends; and comply with legal obligations.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              3. Disclosure of Your Information
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We may disclose information when required by law or to protect rights and safety. We do not sell, trade, or rent personal information to third parties.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              4. Security of Your Information
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We implement security measures including encryption and secure servers. However, no method of transmission is entirely secure.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              5. Cookies and Tracking Technologies
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We use cookies to enhance your experience. You can control settings through your browser, though this may affect functionality.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              6. Third-Party Links
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Our website may contain links to third-party sites. We are not responsible for their privacy practices or content.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              7. Your Rights and Choices
            </h3>
            <div style={{ color: '#6b7280' }}>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Access, update, or delete your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Opt-out of promotional communications</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold" style={{ color: '#14b8a6' }}>•</span>
                  <span>Control cookie preferences through your browser</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              8. Data Retention
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We retain personal information as long as necessary to provide services and comply with legal obligations. When no longer needed, we delete or anonymize it.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              9. Changes to This Privacy Policy
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We may update this Privacy Policy to reflect changes in our practices. We will notify you of material changes by posting an updated version.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              10. Contact Us
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              If you have questions about this Privacy Policy or our practices, please contact us through our website support channels.
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
