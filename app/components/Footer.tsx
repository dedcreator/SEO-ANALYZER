// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import { Icons } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Icons.Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">ScaleWithDestiny</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Professional SEO analysis and business growth platform. Get actionable insights to scale your online presence.
            </p>
            <div className="flex gap-4 mt-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Icons.Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <a href="https://scalewithdestiny.com/contact" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                  Book a Call
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icons.Mail className="w-4 h-4" />
                <span>hello@scalewithdestiny.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>© {year} ScaleWithDestiny. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}