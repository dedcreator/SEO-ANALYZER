// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import { Icons } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#12181C]/10 dark:border-white/10 bg-[#F3F4EF] dark:bg-[#0D1114]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#12181C] dark:bg-white flex items-center justify-center">
                <Icons.Rocket className="w-4 h-4 text-[#B8863C] dark:text-[#12181C]" />
              </div>
              <span className="font-serif text-lg font-medium text-[#12181C] dark:text-white">
                ScaleWithDestiny
              </span>
            </Link>
            <p className="text-sm text-[#12181C]/55 dark:text-white/45 max-w-md leading-relaxed">
              SEO audits built to be read in one sitting — what's wrong, what
              it costs you, and what to fix first.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="text-[#12181C]/40 dark:text-white/40 hover:text-[#B8863C] transition-colors"
                aria-label="Twitter"
              >
                <Icons.Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#12181C]/40 dark:text-white/35 mb-4">
              Quick links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-[#12181C]/65 dark:text-white/55 hover:text-[#B8863C] transition-colors"
                >
                  What's checked
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-[#12181C]/65 dark:text-white/55 hover:text-[#B8863C] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-[#12181C]/65 dark:text-white/55 hover:text-[#B8863C] transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <a
                  href="https://scalewithdestiny.com/contact"
                  className="text-[#12181C]/65 dark:text-white/55 hover:text-[#B8863C] transition-colors"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#12181C]/40 dark:text-white/35 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-[#12181C]/65 dark:text-white/55">
                <Icons.Mail className="w-3.5 h-3.5" />
                <span>hello@scalewithdestiny.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#12181C]/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs tracking-wide text-[#12181C]/40 dark:text-white/35">
          <span>© {year} SCALEWITHDESTINY</span>
        </div>
      </div>
    </footer>
  );
}