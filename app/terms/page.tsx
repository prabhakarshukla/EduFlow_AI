'use client';

import Link from 'next/link';

export default function TermsPage() {
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
            Terms & Conditions
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
              Terms & Conditions
            </h2>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Welcome to EduFlow AI. These Terms & Conditions govern your use of our website, services, and applications. By accessing or using EduFlow AI, you agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              1. Use License
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Permission is granted to temporarily download materials for personal, non-commercial viewing. You may not modify, copy, reverse engineer, or use materials for commercial purposes without permission.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              2. Disclaimer of Warranties
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Materials are provided on an "as is" basis. EduFlow AI makes no warranties, expressed or implied, and disclaims all warranties including merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              3. Limitations
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              In no event shall EduFlow AI be liable for damages arising from use or inability to use materials, even if notified of such possibility.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              4. Accuracy of Materials
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              Materials may contain technical, typographical, or photographic errors. EduFlow AI does not warrant accuracy, completeness, or currency. Changes may be made without notice.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              5. Links
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              EduFlow AI has not reviewed all linked sites and is not responsible for their contents. Links do not imply endorsement. Use of linked websites is at your own risk.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              6. Modifications
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              EduFlow AI may revise these Terms & Conditions without notice. By continuing to use this website, you agree to be bound by the then current version.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              7. Governing Law
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to conflicts of law principles.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              8. User Conduct
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              You agree not to violate laws, infringe rights, restrict others' use, harm EduFlow AI infrastructure, or submit false information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#1f2937' }}>
              9. Contact Information
            </h3>
            <p className="leading-relaxed" style={{ color: '#6b7280' }}>
              For questions about these Terms & Conditions, please contact us through our website support channels.
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
