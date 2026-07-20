// app/components/ReportDashboard.tsx
'use client';

import { useState } from 'react';
import { SEOReport } from '../types';
import { Icons } from './Icons';
import { ScoreGauge } from './ScoreGauge';
import { MetaTagsSection } from './sections/MetaTagsSection';
import { HeadingsSection } from './sections/HeadingsSection';
import { ImagesSection } from './sections/ImagesSection';
import { LinksSection } from './sections/LinksSection';
import { ContentSection } from './sections/ContentSection';
import { RecommendationsSection } from './sections/RecommendationsSection';
import { SecuritySection } from './sections/SecuritySection';
import { PerformanceSection } from './sections/PerformanceSection';
import { PDFExportButton } from './PDFExportButton';

interface Props {
  report: SEOReport;
  onReset: () => void;
}

export function ReportDashboard({ report, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'recommendations'>('overview');

  // Safe access with default values
  const recommendations = report?.recommendations ?? [];
  const totalIssues = recommendations.filter(r => r.priority === 'critical' || r.priority === 'high').length;
  const score = report?.score ?? 0;
  
  const scoreColor = score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400';
  const scoreBg = score >= 80 ? 'bg-emerald-50 dark:bg-emerald-950/30' : score >= 60 ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-rose-50 dark:bg-rose-950/30';
  const scoreBorder = score >= 80 ? 'border-emerald-200 dark:border-emerald-800/50' : score >= 60 ? 'border-amber-200 dark:border-amber-800/50' : 'border-rose-200 dark:border-rose-800/50';

  // Safe icon getter with fallback
  const getIcon = (name: keyof typeof Icons) => {
    return Icons[name] || (() => <span className="w-5 h-5">●</span>);
  };

  const AlertIcon = getIcon('AlertCircle');
  const CheckIcon = getIcon('Check');
  const GlobeIcon = getIcon('Globe');
  const FileTextIcon = getIcon('FileText');
  const ImageIcon = getIcon('Image');
  const LinkIcon = getIcon('Link');
  const HashIcon = getIcon('Hash');
  const SparklesIcon = getIcon('Sparkles');
  const BarChartIcon = getIcon('BarChart');
  const LayersIcon = getIcon('Layers');
  const TrendingUpIcon = getIcon('TrendingUp');
  const ShieldIcon = getIcon('Shield');
  const PieChartIcon = getIcon('PieChart');
  const RefreshIcon = getIcon('Refresh');
  const ExternalLinkIcon = getIcon('ExternalLink');

  // Safe values
  const imagesTotal = report?.images?.total ?? 0;
  const linksTotal = report?.links?.total ?? 0;
  const headingsTotal = report?.headings ? Object.values(report.headings).reduce((a, b) => a + b.length, 0) : 0;
  const analyzedAt = report?.analyzed_at ?? new Date().toISOString();
  const url = report?.url ?? '';
  const contentRich = report?.content?.content_rich ?? false;
  const isHttps = report?.security?.https ?? false;
  const metaTagsScore = report?.score_breakdown?.meta_tags ?? 0;
  const headingsScore = report?.score_breakdown?.headings ?? 0;
  const imagesScore = report?.score_breakdown?.images ?? 0;
  const readabilityLevel = report?.content?.readability_level ?? 'N/A';
  const wordCount = report?.content?.word_count ?? 0;
  const paragraphCount = report?.content?.paragraph_count ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Report Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white truncate tracking-tight">
                  SEO Report
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${scoreBg} ${scoreColor} ${scoreBorder}`}>
                  {score}/100
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <GlobeIcon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate max-w-[250px] md:max-w-[450px] font-mono text-xs">{url}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{new Date(analyzedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  totalIssues > 0 ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                }`}>
                  {totalIssues > 0 ? (
                    <>
                      <AlertIcon className="w-3.5 h-3.5" />
                      {totalIssues} issues found
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-3.5 h-3.5" />
                      All clear
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden sm:block">
                <ScoreGauge score={score} size={80} />
              </div>
              <PDFExportButton report={report} />
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-slate-200 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {[
            { label: 'Pages', value: '1', icon: FileTextIcon },
            { label: 'Images', value: imagesTotal, icon: ImageIcon },
            { label: 'Links', value: linksTotal, icon: LinkIcon },
            { label: 'Headings', value: headingsTotal, icon: HashIcon },
            { label: 'Recommendations', value: recommendations.length, icon: SparklesIcon },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-slate-400 dark:text-slate-500" />
              <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800">
          <nav className="flex overflow-x-auto px-4" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Overview', icon: BarChartIcon },
              { id: 'details', label: 'Detailed Analysis', icon: LayersIcon },
              { id: 'recommendations', label: 'Recommendations', icon: SparklesIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group relative px-4 py-4 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2.5 ${
                  activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className={`w-4 h-4 transition-colors ${
                  activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`} />
                {tab.label}
                {tab.id === 'recommendations' && recommendations.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                    {recommendations.length}
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                      <TrendingUpIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Overall Score</p>
                      <p className={`text-3xl font-bold ${scoreColor}`}>{score}/100</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl">
                      <FileTextIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Content Quality</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {contentRich ? (
                          <span className="text-emerald-600 dark:text-emerald-400">Good</span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400">Needs Work</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                      <ShieldIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Security</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {isHttps ? (
                          <span className="text-emerald-600 dark:text-emerald-400">Secure</span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400">Not Secure</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Preview */}
              <RecommendationsSection recommendations={recommendations} limit={3} />

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                    <BarChartIcon className="w-4 h-4" />
                    Content Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Word Count</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{wordCount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Readability</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{readabilityLevel}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Paragraphs</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{paragraphCount}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4" />
                    SEO Health
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Meta Tags</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{metaTagsScore}/25</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Headings</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{headingsScore}/15</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Images</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{imagesScore}/15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetaTagsSection meta={report?.meta_tags || {}} />
              <HeadingsSection headings={report?.headings || {}} />
              <ImagesSection images={report?.images || {}} />
              <LinksSection links={report?.links || {}} />
              <ContentSection content={report?.content || {}} />
              <SecuritySection security={report?.security || {}} />
              <PerformanceSection performance={report?.performance || {}} />
            </div>
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsSection recommendations={recommendations} full />
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 p-6">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Report generated by <span className="font-semibold text-indigo-600 dark:text-indigo-400">ScaleWithDestiny</span>
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">analyser.scalewithdestiny.com</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onReset}
            className="group inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <RefreshIcon className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
            Analyze Another Site
          </button>
          <a
            href="https://cal.com/destinyseo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
          >
            <ExternalLinkIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Book a Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}