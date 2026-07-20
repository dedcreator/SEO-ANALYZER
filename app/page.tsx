// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SEOReport } from '@/types';
import { Icons } from './components/Icons';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnalysisForm } from './components/AnalysisForm';
import { ReportDashboard } from './components/ReportDashboard';
import { UsageStats } from './components/UsageStats';

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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <ReportDashboard report={report} onReset={handleReset} />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-200 dark:border-indigo-800/50 mb-6">
              <Icons.Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Free SEO Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Scale Your Business with{' '}
              <span className="gradient-text">Data-Driven SEO</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get comprehensive SEO analysis, actionable insights, and expert guidance to grow your online presence. 
              Start with <span className="font-semibold text-indigo-600 dark:text-indigo-400">6 free analyses</span> per month.
            </p>

            {usageStats && (
              <div className="mb-8 flex justify-center">
                <UsageStats stats={usageStats} />
              </div>
            )}
            
            <AnalysisForm onSubmit={handleAnalyze} loading={loading} />
            
            {error && (
              <div className={`mt-6 p-4 rounded-xl text-left max-w-2xl mx-auto ${
                error.includes('limit') 
                  ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  <Icons.AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{error}</p>
                    {showUsage && usageStats && (
                      <div className="mt-2 text-sm space-y-2">
                        <p>You've used {usageStats.monthly_used} of {usageStats.monthly_limit} free analyses this month.</p>
                        <p className="text-xs opacity-75">
                          Resets on: {usageStats.reset_date}
                        </p>
                        <a
                          href="https://cal.com/destinyseo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                        >
                          Upgrade for more analyses
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-emerald-500" />
              <span>6 free analyses</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-emerald-500" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-emerald-500" />
              <span>Results in seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-emerald-500" />
              <span>Expert recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">ScaleWithDestiny</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Everything you need to optimize your website and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Icons.BarChart,
                title: 'Comprehensive SEO Analysis',
                description: 'Get detailed insights into your website\'s SEO performance across 6 key categories.'
              },
              {
                icon: Icons.Target,
                title: 'Actionable Recommendations',
                description: 'Receive prioritized, actionable steps to improve your search engine rankings.'
              },
              {
                icon: Icons.ShieldCheck,
                title: 'Security & Performance',
                description: 'Check your site\'s security, HTTPS status, and performance metrics.'
              },
              {
                icon: Icons.FileText,
                title: 'Content Quality Analysis',
                description: 'Evaluate your content\'s readability, keyword usage, and overall quality.'
              },
              {
                icon: Icons.LineChart,
                title: 'Growth Tracking',
                description: 'Monitor your progress with detailed reports and actionable insights.'
              },
              {
                icon: Icons.Users,
                title: 'Expert Consultation',
                description: 'Get personalized guidance from SEO experts to scale your business.'
              }
            ].map((feature, index) => (
              <div key={index} className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 card-hover">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-200 dark:border-indigo-800/50 mb-6">
                <Icons.Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                We Help Businesses{' '}
                <span className="gradient-text">Scale with Data</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                At ScaleWithDestiny, we believe that every business deserves access to professional SEO insights 
                and expert guidance. Our platform combines powerful analysis tools with human expertise to help 
                you make data-driven decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Data-Driven Approach</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">We use real data to uncover opportunities and identify areas for improvement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Expert Guidance</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Our team of SEO specialists provides personalized recommendations and support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Proven Results</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">We've helped hundreds of businesses improve their search visibility and grow.</p>
                  </div>
                </div>
              </div>
              <a
                href="https://cal.com/destinyseo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
              >
                <span>Book a Free Consultation</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Icons.Rocket className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">ScaleWithDestiny</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">SEO Analysis Platform</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Free Analyses</span>
                    <span className="font-semibold text-slate-900 dark:text-white">6/month</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Analysis Time</span>
                    <span className="font-semibold text-slate-900 dark:text-white">&lt; 30 seconds</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Expert Support</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Included</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Trusted By</span>
                    <span className="font-semibold text-slate-900 dark:text-white">500+ Businesses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Real results from real businesses who trusted ScaleWithDestiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "ScaleWithDestiny transformed our SEO strategy. Within 3 months, we saw a 200% increase in organic traffic.",
                author: "Sarah Johnson",
                role: "CEO, TechStart"
              },
              {
                quote: "The actionable recommendations helped us fix critical issues we didn't even know existed. Highly recommended!",
                author: "Michael Chen",
                role: "Marketing Director, GrowthHub"
              },
              {
                quote: "Best SEO tool I've ever used. The combination of automated analysis and expert consultation is unbeatable.",
                author: "Emily Rodriguez",
                role: "Founder, CreativeLab"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Scale Your Business?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Get started with a free SEO analysis and discover how we can help you grow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
                >
                  <Icons.Search className="w-5 h-5" />
                  <span>Analyze Your Site Now</span>
                </a>
                <a
                  href="https://cal.com/destinyseo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-700/50 text-white font-medium rounded-xl hover:bg-indigo-700/70 transition-all backdrop-blur-sm border border-indigo-400/30"
                >
                  <Icons.Users className="w-5 h-5" />
                  <span>Book a Free Consultation</span>
                </a>
              </div>
              <p className="text-indigo-200/80 text-sm mt-4">
                No credit card required • 6 free analyses • Expert support
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}