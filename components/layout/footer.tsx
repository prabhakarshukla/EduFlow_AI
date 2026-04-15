'use client';

import Link from 'next/link';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features',  href: '/#features'  },
      { label: 'Pricing',   href: '/pricing'     },
      { label: 'Changelog', href: '/changelog'   },
      { label: 'Roadmap',   href: '/roadmap'     },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Blog',    href: '/blog'    },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '/privacy'  },
      { label: 'Terms of Service',  href: '/terms'    },
      { label: 'Cookie Policy',     href: '/cookies'  },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#1a181a',
        borderTop: '1px solid rgba(110,231,216,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand col */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="EduFlow AI"
                style={{ height: '56px', width: 'auto', display: 'block' }}
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Your AI-powered student assistant for smarter studying,
              instant doubt solving, and peak productivity.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0019.4 1s-4 1-4 4c0 .06 0 .12.01.18A12.78 12.78 0 013 2s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'GitHub',  path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color        = 'var(--primary)';
                    (e.currentTarget as HTMLElement).style.borderColor  = 'var(--border-hover)';
                    (e.currentTarget as HTMLElement).style.boxShadow    = 'var(--glow-sm)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color        = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor  = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow    = 'none';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--primary)' }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          <span>© {new Date().getFullYear()} EduFlow AI. All rights reserved.</span>
          <span>Built for students, by students. 🎓</span>
        </div>
      </div>
    </footer>
  );
}
