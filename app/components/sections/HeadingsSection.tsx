// app/components/sections/HeadingsSection.tsx
'use client';

import { Hash, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  headings?: {
    h1?: string[];
    h2?: string[];
    h3?: string[];
    h4?: string[];
    h5?: string[];
    h6?: string[];
  };
}

export function HeadingsSection({ headings = {} }: Props) {
  const headingLevels = [
    { level: 1, tag: 'h1', label: 'H1' },
    { level: 2, tag: 'h2', label: 'H2' },
    { level: 3, tag: 'h3', label: 'H3' },
    { level: 4, tag: 'h4', label: 'H4' },
    { level: 5, tag: 'h5', label: 'H5' },
    { level: 6, tag: 'h6', label: 'H6' },
  ];

  const h1Count = (headings?.h1 ?? []).length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Hash className="w-5 h-5 text-slate-400" />
        Headings Structure
        <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
          {h1Count === 1 ? (
            <span className="flex items-center gap-1 text-emerald-500">
              <CheckCircle className="w-3.5 h-3.5" />
              Valid
            </span>
          ) : h1Count > 1 ? (
            <span className="flex items-center gap-1 text-amber-500">
              <AlertCircle className="w-3.5 h-3.5" />
              Multiple H1
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-500">
              <AlertCircle className="w-3.5 h-3.5" />
              Missing H1
            </span>
          )}
        </span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {headingLevels.map(({ level, tag, label }) => {
          const items = headings?.[tag as keyof typeof headings] ?? [];
          return (
            <div key={level} className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between">
                {label}
                <span className="text-xs text-slate-500 dark:text-slate-400">({items.length})</span>
              </p>
              {items.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {items.slice(0, 3).map((item: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 truncate">
                      {item}
                    </li>
                  ))}
                  {items.length > 3 && (
                    <li className="text-xs text-slate-400 dark:text-slate-500">+{items.length - 3} more</li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}