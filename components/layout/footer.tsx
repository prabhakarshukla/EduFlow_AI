'use client';

import Link from 'next/link';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features',  href: '/#features'  },
      { label: 'Dashboard', href: '/dashboard'  },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',   href: '/about'     },
      { label: 'Contact', href: '/contact'   },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'License',              href: '/license'  },
      { label: 'Terms & Conditions',   href: '/terms'    },
      { label: 'Privacy Policy',       href: '/privacy'  },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#222022] dark:bg-[#020617]"
      style={{
        borderTop: '1px solid var(--ui-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          <div className="md:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'transform 0.2s, filter 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                (e.currentTarget as HTMLElement).style.filter =
                  'drop-shadow(0 0 10px rgba(110,231,216,0.45))';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.filter = 'none';
              }}
            >
              <img
                src="/images/logo.png"
                alt="EduFlow AI"
                style={{ height: '56px', width: 'auto', display: 'block' }}
              />
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Your AI-powered student assistant for smarter studying,
              instant doubt solving, and peak productivity.
            </p>

            <div className="flex gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/prabhakar_.shukla',
                  path: 'M16 11.37A5 5 0 1111.63 7H16m0-7h.01M21 8v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8a4 4 0 014-4h10a4 4 0 014 4z',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/prabhakarshukla',
                  path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{
                    border: '1px solid rgba(110,231,216,0.18)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color       = '#6EE7D8';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.5)';
                    (e.currentTarget as HTMLElement).style.boxShadow   = '0 0 10px rgba(110,231,216,0.18)';
                    (e.currentTarget as HTMLElement).style.background  = 'rgba(110,231,216,0.07)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color       = 'rgba(255,255,255,0.4)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(110,231,216,0.18)';
                    (e.currentTarget as HTMLElement).style.boxShadow   = 'none';
                    (e.currentTarget as HTMLElement).style.background  = 'transparent';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#6EE7D8' }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = '#6EE7D8';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs"
          style={{
            borderTop: '1px solid rgba(110,231,216,0.10)',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <span>© 2026 EduFlow AI. Built as a student productivity project.</span>
          <span style={{ color: 'rgba(110,231,216,0.55)' }}>
            Built for students, by students. 🎓
          </span>
        </div>
      </div>
    </footer>
  );
}
