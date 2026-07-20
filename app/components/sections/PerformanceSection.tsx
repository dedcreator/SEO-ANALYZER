// app/components/sections/PerformanceSection.tsx
'use client';

import { Gauge, CheckCircle, XCircle, Server, FileText, Clock } from 'lucide-react';

interface Props {
  performance?: {
    http_status?: number;
    content_type?: string;
    server?: string;
    cache_control?: string;
    load_time?: number | null;
  };
}

export function PerformanceSection({ performance }: Props) {
  // Default values with proper null checks
  const httpStatus = performance?.http_status ?? 200;
  const contentType = performance?.content_type ?? 'unknown';
  const server = performance?.server ?? 'unknown';
  const cacheControl = performance?.cache_control ?? null;
  const loadTime = performance?.load_time ?? null;

  const isSuccess = httpStatus === 200;
  const isFast = loadTime !== null && loadTime < 3;

  // Safely format load time
  const formattedLoadTime = loadTime !== null ? loadTime.toFixed(2) : 'N/A';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-slate-400" />
        Performance
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-400">HTTP Status</span>
          <span className={`font-medium flex items-center gap-2 ${isSuccess ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {httpStatus}
            {isSuccess ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-400">Content Type</span>
          <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            {contentType}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-400">Server</span>
          <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-400" />
            {server}
          </span>
        </div>
        {cacheControl && (
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <span className="text-sm text-slate-600 dark:text-slate-400">Cache Control</span>
            <span className="font-medium text-slate-900 dark:text-white text-sm truncate max-w-[200px]">{cacheControl}</span>
          </div>
        )}
        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-400">Load Time</span>
          <span className={`font-medium flex items-center gap-2 ${isFast ? 'text-emerald-600 dark:text-emerald-400' : loadTime !== null ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
            <Clock className="w-4 h-4" />
            {formattedLoadTime}{loadTime !== null ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}