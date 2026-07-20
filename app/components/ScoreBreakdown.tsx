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

  // Same teal / brass / rust read used by ScoreGauge and ReportDashboard.
  const getColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'bg-[#1F6F63]';
    if (percentage >= 40) return 'bg-[#B8863C]';
    return 'bg-[#A6432E]';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs tracking-[0.14em] uppercase text-[#12181C]/45 dark:text-white/40">
        Score breakdown
      </h3>
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-[#12181C]/65 dark:text-white/55">{item.label}</span>
            <span className="font-mono text-[#12181C] dark:text-white font-medium">
              {item.value}/{item.max}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#12181C]/10 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${getColor(item.value, item.max)}`}
              style={{ width: `${(item.value / item.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}