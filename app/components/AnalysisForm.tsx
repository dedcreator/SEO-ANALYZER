// app/components/AnalysisForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { Icons } from './Icons';

interface AnalysisFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function AnalysisForm({ onSubmit, loading }: AnalysisFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      let finalUrl = url.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      onSubmit(finalUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all duration-300">
          <div className="flex-1 flex items-center px-4 gap-3">
            <Icons.Globe className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <input
              type="url"
              placeholder="Enter your website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-0 py-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-base"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="relative px-6 lg:px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
          >
            {loading ? (
              <>
                <Icons.Refresh className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Icons.Search className="w-5 h-5" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1.5">
          <Icons.Check className="w-3.5 h-3.5 text-emerald-500" />
          Free
        </span>
        <span className="flex items-center gap-1.5">
          <Icons.Clock className="w-3.5 h-3.5 text-blue-500" />
          6 per month
        </span>
        <span className="flex items-center gap-1.5">
          <Icons.Star className="w-3.5 h-3.5 text-amber-500" />
          No signup
        </span>
        <span className="flex items-center gap-1.5">
          <Icons.Zap className="w-3.5 h-3.5 text-purple-500" />
          Results in seconds
        </span>
      </div>
    </form>
  );
}