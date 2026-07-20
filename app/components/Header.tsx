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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved !== null ? JSON.parse(saved) : prefersDark;
    setDarkMode(initialDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F3F4EF]/90 dark:bg-[#0D1114]/90 backdrop-blur-md border-b border-[#12181C]/10 dark:border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#12181C] dark:bg-white flex items-center justify-center transition-colors group-hover:bg-[#B8863C] dark:group-hover:bg-[#B8863C]">
              <Icons.Rocket className="w-4 h-4 text-[#B8863C] dark:text-[#12181C] group-hover:text-[#12181C] transition-colors" />
            </div>
            <span className="font-serif text-lg lg:text-xl font-medium text-[#12181C] dark:text-white tracking-tight">
              ScaleWithDestiny
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors"
            >
              What's checked
            </Link>
            <Link
              href="#about"
              className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors"
            >
              About
            </Link>
            <Link
              href="#testimonials"
              className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors"
            >
              Testimonials
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Icons.Sun className="w-4 h-4" />
              ) : (
                <Icons.Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <Icons.XClose className="w-4 h-4" />
              ) : (
                <Icons.Menu className="w-4 h-4" />
              )}
            </button>

            <a
              href="https://cal.com/destinyseo"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:inline-flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-[#12181C] dark:bg-white text-[#F3F4EF] dark:text-[#12181C] text-sm font-medium hover:bg-[#B8863C] dark:hover:bg-[#B8863C] dark:hover:text-white transition-colors"
            >
              <span>Book a call</span>
              <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#12181C]/10 dark:border-white/10">
            <nav className="flex flex-col gap-1">
              <Link
                href="#features"
                className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors py-2"
              >
                What's checked
              </Link>
              <Link
                href="#about"
                className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="#testimonials"
                className="text-sm text-[#12181C]/65 dark:text-white/60 hover:text-[#B8863C] transition-colors py-2"
              >
                Testimonials
              </Link>
              <a
                href="https://scalewithdestiny.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-2.5 bg-[#12181C] dark:bg-white text-[#F3F4EF] dark:text-[#12181C] text-sm font-medium hover:bg-[#B8863C] dark:hover:bg-[#B8863C] dark:hover:text-white transition-colors"
              >
                <span>Book a call</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}