// app/components/sections/ContentSection.tsx
'use client';

import { FileText, BarChart, CheckCircle, AlertCircle, Hash, List, Layers } from 'lucide-react';

interface Props {
  content: {
    word_count?: number;
    readability_score?: number;
    readability_level?: string;
    paragraph_count?: number;
    has_h1?: boolean;
    has_lists?: boolean;
    content_rich?: boolean;
    top_keywords?: { word: string; count: number; density: number }[];
  };
}

export function ContentSection({ content }: Props) {
  const wordCount = content?.word_count ?? 0;
  const readabilityScore = content?.readability_score ?? 0;
  const readabilityLevel = content?.readability_level ?? 'N/A';
  const paragraphCount = content?.paragraph_count ?? 0;
  const hasH1 = content?.has_h1 ?? false;
  const hasLists = content?.has_lists ?? false;
  const contentRich = content?.content_rich ?? false;
  const topKeywords = content?.top_keywords ?? [];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-slate-400" />
        Content Analysis
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{wordCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Words</p>
        </div>
        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{readabilityScore}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Readability</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{readabilityLevel}</p>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{paragraphCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Paragraphs</p>
        </div>
        <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
          <p className="text-2xl font-bold">
            {hasH1 ? (
              <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-500 mx-auto" />
            )}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Has H1</p>
        </div>
      </div>

      {/* Content Quality Indicators */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
          contentRich 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' 
            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
        }`}>
          {contentRich ? (
            <CheckCircle className="w-3.5 h-3.5" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5" />
          )}
          {contentRich ? 'Rich Content' : 'Needs More Content'}
        </span>
        {hasLists && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
            <List className="w-3.5 h-3.5" />
            Has Lists
          </span>
        )}
        {hasH1 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Hash className="w-3.5 h-3.5" />
            Has H1
          </span>
        )}
      </div>

      {topKeywords.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-slate-400" />
            Top Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {topKeywords.slice(0, 10).map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-700 dark:text-slate-300">
                {kw.word} <span className="text-slate-400 dark:text-slate-500">({kw.density}%)</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}