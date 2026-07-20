// app/components/ScoreBreakdown.tsx
'use client';

import { ScoreBreakdown as ScoreBreakdownType } from '../types';

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const items = [
    { label: 'Meta Tags', value: breakdown.meta_tags, max: 25 },
    { label: 'Headings', value: breakdown.headings, max: 15 },
    { label: 'Images', value: breakdown.images, max: 15 },
    { label: 'Links', value: breakdown.links, max: 10 },
    { label: 'Content', value: breakdown.content, max: 20 },
    { label: 'Security', value: breakdown.security, max: 15 },
  ];

  const getColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'bg-emerald-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Score Breakdown
      </h3>
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {item.value}/{item.max}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${getColor(item.value, item.max)}`}
              style={{ width: `${(item.value / item.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}