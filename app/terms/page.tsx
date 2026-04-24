'use client';

import Link from 'next/link';

export default function TermsPage() {
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
            Terms and Conditions
          </h1>
          <p className="text-lg" style={{ color: '#6b7280' }}>
            Last Updated: April 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border p-8 md:p-12 space-y-8" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
          <section>
            <p className="leading-relaxed text-lg" style={{ color: '#6b7280' }}>
              Welcome to EduFlow AI ("we", "our", "us").
            </p>
            <p className="leading-relaxed mt-4" style={{ color: '#6b7280' }}>
              By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              1. Use of Service
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              You agree to use EduFlow AI only for lawful purposes. You must not:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Use the platform for illegal or harmful activities',
                'Attempt to hack, disrupt, or misuse the system',
                'Copy or exploit any part of the platform without permission',
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
              2. User Accounts
            </h3>
            <ul className="space-y-3 ml-4">
              {[
                'You are responsible for maintaining the confidentiality of your account',
                'We are not liable for any unauthorized access to your account',
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
              3. Intellectual Property
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              All content, features, and code are the exclusive property of EduFlow AI and are protected under applicable laws.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              4. Limitation of Liability
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              We are not responsible for:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'Any data loss',
                'Any academic or personal outcomes based on AI suggestions',
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
              5. Termination
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We reserve the right to suspend or terminate access if users violate these terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              6. Changes to Terms
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              We may update these Terms at any time without prior notice.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              7. Contact
            </h3>
            <p className="leading-relaxed mb-2" style={{ color: '#6b7280' }}>
              For any queries, contact us at:
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
