// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Icons.Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                ScaleWithDestiny
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Testimonials
            </Link>
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Icons.Sun className="w-5 h-5" />
              ) : (
                <Icons.Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <Icons.XClose className="w-5 h-5" />
              ) : (
                <Icons.Menu className="w-5 h-5" />
              )}
            </button>

            <a
              href="https://scalewithdestiny.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
            >
              <span>Book a Call</span>
              <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <nav className="flex flex-col gap-3">
              <Link href="#features" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2">
                Features
              </Link>
              <Link href="#about" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2">
                About
              </Link>
              <Link href="#testimonials" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2">
                Testimonials
              </Link>
              <a
                href="https://cal.com/destinyseo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                <span>Book a Call</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}