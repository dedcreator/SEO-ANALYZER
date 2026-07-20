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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white dark:bg-[#161C21] border border-[#12181C]/15 dark:border-white/15 focus-within:border-[#B8863C] transition-colors duration-200">
        <div className="flex-1 flex items-center px-3 gap-3">
          <Icons.Globe className="w-4 h-4 text-[#12181C]/35 dark:text-white/35 flex-shrink-0" />
          <input
            type="url"
            placeholder="yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-0 py-2.5 bg-transparent text-[#12181C] dark:text-white placeholder:text-[#12181C]/35 dark:placeholder:text-white/35 focus:outline-none text-base font-mono"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 lg:px-7 py-2.5 bg-[#12181C] dark:bg-white text-[#F3F4EF] dark:text-[#12181C] font-medium hover:bg-[#B8863C] dark:hover:bg-[#B8863C] dark:hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[130px]"
        >
          {loading ? (
            <>
              <Icons.Refresh className="w-4 h-4 animate-spin" />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <Icons.Search className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-mono text-[11px] tracking-wide text-[#12181C]/45 dark:text-white/40">
        <span>free</span>
        <span className="text-[#B8863C]">·</span>
        <span>6 / month</span>
        <span className="text-[#B8863C]">·</span>
        <span>no signup</span>
        <span className="text-[#B8863C]">·</span>
        <span>results in seconds</span>
      </div>
    </form>
  );
}