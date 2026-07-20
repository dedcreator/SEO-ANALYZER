// app/components/sections/RecommendationsSection.tsx
'use client';

import { useState } from 'react';
import { Icons } from '../Icons';

interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low' | 'info';
  impact: number;
  category: string;
  title: string;
  message: string;
  action: string;
}

interface Props {
  recommendations: Recommendation[];
  limit?: number;
  full?: boolean;
}

export function RecommendationsSection({ recommendations, limit = 5, full = false }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  // Safe icon getter
  const getIcon = (name: keyof typeof Icons) => {
    return Icons[name] || Icons.Info;
  };

  const priorityConfig = {
    critical: { 
      bg: 'bg-rose-50 dark:bg-rose-950/30', 
      border: 'border-rose-200 dark:border-rose-800/50', 
      text: 'text-rose-700 dark:text-rose-400',
      icon: getIcon('AlertCircle'),
      color: 'text-rose-500'
    },
    high: { 
      bg: 'bg-orange-50 dark:bg-orange-950/30', 
      border: 'border-orange-200 dark:border-orange-800/50', 
      text: 'text-orange-700 dark:text-orange-400',
      icon: getIcon('AlertCircle'),
      color: 'text-orange-500'
    },
    medium: { 
      bg: 'bg-amber-50 dark:bg-amber-950/30', 
      border: 'border-amber-200 dark:border-amber-800/50', 
      text: 'text-amber-700 dark:text-amber-400',
      icon: getIcon('AlertCircle'),
      color: 'text-amber-500'
    },
    low: { 
      bg: 'bg-blue-50 dark:bg-blue-950/30', 
      border: 'border-blue-200 dark:border-blue-800/50', 
      text: 'text-blue-700 dark:text-blue-400',
      icon: getIcon('Info'),
      color: 'text-blue-500'
    },
    info: { 
      bg: 'bg-slate-50 dark:bg-slate-800', 
      border: 'border-slate-200 dark:border-slate-700', 
      text: 'text-slate-700 dark:text-slate-300',
      icon: getIcon('Info'),
      color: 'text-slate-400'
    },
  };

  const displayRecs = full ? recommendations : recommendations.slice(0, limit);
  const hasMore = !full && recommendations.length > limit;

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/50 p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
          {Icons.Check ? (
            <Icons.Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <span className="text-2xl">✅</span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">No Issues Found!</h3>
        <p className="text-emerald-600 dark:text-emerald-300 mt-1">Your page is well optimized for SEO.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          {Icons.Sparkles ? (
            <Icons.Sparkles className="w-5 h-5 text-indigo-500" />
          ) : (
            <span className="text-xl">✨</span>
          )}
          Recommendations
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
            {recommendations.length}
          </span>
        </h3>
        {!full && hasMore && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Showing {limit} of {recommendations.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {displayRecs.map((rec, index) => {
          const config = priorityConfig[rec.priority] || priorityConfig.info;
          const Icon = config.icon;
          const isExpanded = expanded === index;

          return (
            <div
              key={index}
              className={`rounded-xl border ${config.border} ${config.bg} p-4 transition-all hover:shadow-md`}
            >
              <div 
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : index)}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bg} border ${config.border} flex items-center justify-center`}>
                  {Icon ? (
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  ) : (
                    <span className="text-sm">⚠️</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`font-semibold ${config.text}`}>
                      {rec.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
                      {rec.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Impact: {rec.impact}/20
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {rec.message}
                  </p>
                  {isExpanded && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-semibold">Action Required:</span> {rec.action}
                      </p>
                    </div>
                  )}
                </div>
                <div className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  {Icons.ChevronDown ? (
                    <Icons.ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <span className="text-slate-400">▼</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!full && hasMore && (
        <button
          className="w-full py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 border-2 border-indigo-200 dark:border-indigo-800/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
        >
          View all {recommendations.length} recommendations →
        </button>
      )}
    </div>
  );
}