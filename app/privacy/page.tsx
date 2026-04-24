'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: '#6b7280' }}>
            Last Updated: April 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border p-8 md:p-12 space-y-8" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
          <section>
            <p className="leading-relaxed text-lg" style={{ color: '#6b7280' }}>
              EduFlow AI ("we", "our", "us") respects your privacy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              1. Information We Collect
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              We may collect:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Name and email address',
                'Usage data such as features used and interactions',
                'Notes or content created within the platform',
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
              2. How We Use Your Information
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              We use your data to:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Provide and improve our services',
                'Personalize user experience',
                'Maintain platform security',
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
              3. Data Storage
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Your data may be stored securely using third-party services like databases and cloud providers.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              4. Data Sharing
            </h3>
            <ul className="space-y-3">
              {[
                'We do NOT sell your personal data.',
                'We may share data only when required by law.',
              ].map((item, idx) => (
                <p key={idx} className="leading-relaxed" style={{ color: '#6b7280' }}>
                  {item}
                </p>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              5. Security
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We take reasonable steps to protect your data, but no system is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              6. User Rights
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              You can request:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Access to your data',
                'Deletion of your data',
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
              7. Changes to Policy
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We may update this Privacy Policy anytime.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              8. Contact
            </h3>
            <p className="leading-relaxed mb-2" style={{ color: '#6b7280' }}>
              For privacy concerns:
            </p>
            <p className="font-medium" style={{ color: '#14b8a6' }}>
              Email: prabhakarshukla669@gmail.com
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
