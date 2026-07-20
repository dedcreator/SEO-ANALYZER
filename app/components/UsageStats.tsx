// app/components/UsageStats.tsx
'use client';

import { Icons } from './Icons';

interface UsageStatsProps {
  stats: {
    monthly_used: number;
    monthly_limit: number;
    monthly_remaining: number;
    reset_date: string;
  };
  compact?: boolean;
}

export function UsageStats({ stats, compact = false }: UsageStatsProps) {
  const percentage = (stats.monthly_used / stats.monthly_limit) * 100;
  const isNearLimit = stats.monthly_remaining <= 2;

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          {stats.monthly_used}/{stats.monthly_limit}
        </span>
        <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isNearLimit ? 'bg-amber-500' : 'bg-gradient-to-r from-indigo-600 to-blue-600'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        {stats.monthly_remaining > 0 ? (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {stats.monthly_remaining} left
          </span>
        ) : (
          <span className="text-xs text-red-600 dark:text-red-400 font-medium">
            Used up
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-5 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-2">
        <Icons.BarChart className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Free analyses:
        </span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {stats.monthly_used}/{stats.monthly_limit}
        </span>
      </div>
      <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            percentage >= 80 ? 'bg-amber-500' : 
            percentage >= 100 ? 'bg-red-500' : 
            'bg-gradient-to-r from-indigo-600 to-blue-600'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 dark:text-slate-500">
        Resets {stats.reset_date}
      </span>
    </div>
  );
}