// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SEOReport } from './types';
import { Icons } from './components/Icons';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnalysisForm } from './components/AnalysisForm';
import { ReportDashboard } from './components/ReportDashboard';
import { UsageStats } from './components/UsageStats';

/**
 * DESIGN SYSTEM — "Instrument"
 * ------------------------------------------------------------------
 * Moving away from the default indigo-gradient / pill-badge / blob-blur
 * SaaS look toward something specific to an *analysis* product: an ink
 * + paper palette, a brass signal accent (not another purple/teal),
 * a serif display face for editorial weight, and a mono face reserved
 * for anything that reads as data or a metric.
 *
 * These tokens should move to globals.css / tailwind.config so Header,
 * Footer, AnalysisForm, ReportDashboard, and UsageStats can share them:
 *
 *   --ink:      #12181C   body text / dark fills
 *   --paper:    #F3F4EF   page background
 *   --mist:     #E4E6E0   hairlines, subtle fills
 *   --brass:    #B8863C   primary accent (CTAs, highlights)
 *   --brass-dim:#8F6A2E   brass on dark surfaces
 *   --teal:     #1F6F63   confirmation / "check" states
 *   --rust:     #A6432E   errors
 *
 *   font-display: 'Fraunces', ui-serif, Georgia, serif
 *   font-body:    'Inter', ui-sans-serif, system-ui, sans-serif
 *   font-mono:    'IBM Plex Mono', ui-monospace, monospace
 *
 * The classes `gradient-text`, `gradient-bg`, `card-hover`, and
 * `bg-grid-slate-100` from the previous version are no longer used —
 * replace them in globals.css with the utilities implied below, or
 * ask me to hand you a full globals.css pass.
 */

export default function Home() {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usageStats, setUsageStats] = useState<{
    monthly_used: number;
    monthly_limit: number;
    monthly_remaining: number;
    reset_date: string;
  } | null>(null);
  const [showUsage, setShowUsage] = useState(false);

  useEffect(() => {
    loadUsageStats();
  }, []);

  const loadUsageStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usage`);
      if (response.ok) {
        const data = await response.json();
        setUsageStats(data);
      }
    } catch (err) {
      console.error('Failed to load usage stats:', err);
    }
  };

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setError(null);
    setShowUsage(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const err = await response.json();
        if (response.status === 429) {
          setShowUsage(true);
          setError(`${err.error || err.detail || 'Rate limit exceeded'}`);
          await loadUsageStats();
          return;
        }
        throw new Error(err.detail || err.error || 'Analysis failed');
      }

      const data = await response.json();
      setReport(data);
      await loadUsageStats();
    } catch (err: any) {
      setError(err.message || 'Failed to analyze URL');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
    setShowUsage(false);
  };

  if (report) {
    return (
      <main className="min-h-screen bg-[#F3F4EF] dark:bg-[#0D1114]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <ReportDashboard report={report} onReset={handleReset} />
        </div>
        <Footer />
      </main>
    );
  }

  const categories = [
    {
      icon: Icons.BarChart,
      title: 'Technical foundation',
      description: "Crawlability, indexing, sitemap and robots configuration checked against how search engines actually read your site.",
    },
    {
      icon: Icons.Target,
      title: 'On-page signals',
      description: 'Titles, headings, and metadata scored for relevance, and prioritized by the impact fixing them will have.',
    },
    {
      icon: Icons.ShieldCheck,
      title: 'Security & speed',
      description: 'HTTPS status, core web vitals, and the performance factors that affect both ranking and conversion.',
    },
    {
      icon: Icons.FileText,
      title: 'Content quality',
      description: 'Readability, keyword coverage, and depth, measured against what currently ranks for your terms.',
    },
    {
      icon: Icons.LineChart,
      title: 'Growth tracking',
      description: 'A baseline you can re-run monthly, so progress is a number, not a guess.',
    },
    {
      icon: Icons.Users,
      title: 'Expert review',
      description: 'Where the automated read gets ambiguous, a specialist looks at it with you.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F3F4EF] dark:bg-[#0D1114] font-sans text-[#12181C] dark:text-[#EDEDE7]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#12181C]/10 dark:border-white/10">
        {/* fine dot texture, restrained — no blurred blobs */}
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(#12181C22 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            {/* Eyebrow — mono readout instead of a pill badge */}
            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-[#12181C]/60 dark:text-white/50 mb-8">
              <span className="h-px w-6 bg-[#B8863C]" />
              SEO audit · no card required
              <span className="h-px w-6 bg-[#B8863C]" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-[#12181C] dark:text-white mb-6 leading-[1.08] tracking-tight">
              A clear-eyed read on
              <br />
              <span className="relative inline-block">
                why your site isn't ranking
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 300 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 5.5C60 1 240 1 298 5.5" stroke="#B8863C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#12181C]/70 dark:text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Run a full technical, content, and performance audit in under thirty
              seconds. Six free reports a month — no account, no trial to cancel.
            </p>

            {usageStats && (
              <div className="mb-8 flex justify-center">
                <UsageStats stats={usageStats} />
              </div>
            )}

            <AnalysisForm onSubmit={handleAnalyze} loading={loading} />

            {error && (
              <div
                className={`mt-6 p-4 text-left max-w-xl mx-auto border-l-2 ${
                  error.includes('limit')
                    ? 'border-[#B8863C] bg-[#B8863C]/[0.06] text-[#5C4319] dark:text-[#E0BE87]'
                    : 'border-[#A6432E] bg-[#A6432E]/[0.06] text-[#7A2E1F] dark:text-[#E0A897]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icons.AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{error}</p>
                    {showUsage && usageStats && (
                      <div className="mt-2 text-sm space-y-2">
                        <p className="font-mono text-xs">
                          {usageStats.monthly_used}/{usageStats.monthly_limit} analyses used ·
                          resets {usageStats.reset_date}
                        </p>
                        <a
                          href="https://cal.com/destinyseo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-1.5 bg-[#12181C] text-[#F3F4EF] text-sm hover:bg-[#B8863C] transition-colors"
                        >
                          Talk to us about more reports
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Trust row — plain text, no icon-in-circle */}
            <div className="mt-14 pt-8 border-t border-[#12181C]/10 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs tracking-wide text-[#12181C]/50 dark:text-white/40">
                <span>6 free reports / mo</span>
                <span className="text-[#B8863C]">·</span>
                <span>no signup</span>
                <span className="text-[#B8863C]">·</span>
                <span>results in &lt;30s</span>
                <span className="text-[#B8863C]">·</span>
                <span>human review available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we check — the six report categories, numbered because they
          are literally the six fixed sections of the report */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-[#B8863C] mb-3">
              What's in the report
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#12181C] dark:text-white">
              Six categories, one score each
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex gap-5 py-7 border-t border-[#12181C]/10 dark:border-white/10 first:border-t md:[&:nth-child(-n+2)]:border-t"
              >
                <span className="font-mono text-xs text-[#12181C]/35 dark:text-white/30 pt-1 w-6 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#12181C] dark:text-white mb-1.5">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[#12181C]/60 dark:text-white/50 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About — readout panel instead of the glossy mock-browser card */}
      <section id="about" className="py-20 md:py-28 bg-[#12181C] text-[#F3F4EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] uppercase text-[#B8863C] mb-4">
                About ScaleWithDestiny
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-5 leading-tight">
                We built the audit we
                <br />
                wished existed
              </h2>
              <p className="text-white/65 mb-8 leading-relaxed">
                Most SEO tools bury the finding you actually need under a
                dashboard of vanity metrics. Ours is built to be read in one
                sitting: what's wrong, what it costs you, and what to do
                about it first. When the automated read isn't enough, a
                specialist takes a look with you.
              </p>
              <a
                href="https://cal.com/destinyseo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8863C] text-[#12181C] font-medium hover:bg-[#D3A15A] transition-colors"
              >
                <span>Book a free consultation</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="border border-white/15 font-mono text-sm">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/15 text-white/40 text-xs tracking-wide">
                <span>SCALEWITHDESTINY / SNAPSHOT</span>
                <span className="text-[#1F6F63]">● live</span>
              </div>
              {[
                ['Free reports', '6 / month'],
                ['Median analysis time', '18s'],
                ['Specialist review', 'included'],
                ['Businesses served', '500+'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center px-5 py-3.5 border-b border-white/10 last:border-b-0"
                >
                  <span className="text-white/50">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — one editorial pull quote, two supporting, no star ratings */}
      <section id="testimonials" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-[#B8863C] mb-3 text-center">
            From businesses that ran the audit
          </p>

          <blockquote className="max-w-2xl mx-auto text-center mb-16">
            <p className="font-serif text-2xl md:text-3xl text-[#12181C] dark:text-white leading-snug mb-5">
              "It helped us fix issues we didn't know existed — three months
              later, organic traffic was up 200%."
            </p>
            <footer className="font-mono text-xs text-[#12181C]/50 dark:text-white/40 tracking-wide">
              SARAH JOHNSON — CEO, TECHSTART
            </footer>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                quote: 'The recommendations were prioritized, not just a wall of warnings. We knew exactly what to do first.',
                author: 'Michael Chen',
                role: 'Marketing Director, GrowthHub',
              },
              {
                quote: "Automated analysis plus a real person to talk to about it — that combination is what made us stick with it.",
                author: 'Emily Rodriguez',
                role: 'Founder, CreativeLab',
              },
            ].map((t, i) => (
              <div key={i} className="border-t border-[#12181C]/10 dark:border-white/10 pt-6">
                <p className="text-sm text-[#12181C]/70 dark:text-white/60 leading-relaxed mb-4">
                  {t.quote}
                </p>
                <p className="font-mono text-xs text-[#12181C]/50 dark:text-white/40 tracking-wide">
                  {t.author.toUpperCase()} — {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-[#12181C]/10 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#12181C] dark:text-white mb-4">
            Find out what's holding your site back
          </h2>
          <p className="text-[#12181C]/60 dark:text-white/50 mb-9 max-w-xl mx-auto">
            Free to run, ready in under thirty seconds, no account needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#12181C] text-[#F3F4EF] dark:bg-white dark:text-[#12181C] font-medium hover:bg-[#B8863C] dark:hover:bg-[#B8863C] dark:hover:text-white transition-colors"
            >
              <Icons.Search className="w-4 h-4" />
              <span>Analyze your site</span>
            </a>
            <a
              href="https://scalewithdestiny.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#12181C]/20 dark:border-white/20 text-[#12181C] dark:text-white font-medium hover:border-[#B8863C] hover:text-[#B8863C] transition-colors"
            >
              <Icons.Users className="w-4 h-4" />
              <span>Book a consultation</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}