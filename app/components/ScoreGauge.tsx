// app/components/ScoreGauge.tsx
'use client';

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export function ScoreGauge({ score, size = 200 }: ScoreGaugeProps) {
  const radius = size * 0.35;
  const strokeWidth = size * 0.05;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  // Same three-tier read used in ReportDashboard: teal (good) / brass
  // (fair) / rust (poor) — keeps the score color consistent everywhere
  // it appears.
  const getColor = (score: number) => {
    if (score >= 80) return '#1F6F63';
    if (score >= 60) return '#B8863C';
    return '#A6432E';
  };

  const color = getColor(score);
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#12181C1A"
            strokeWidth={strokeWidth}
            className="dark:stroke-white/10"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-semibold" style={{ color }}>
            {score}
          </span>
          <span className="font-mono text-xs text-[#12181C]/45 dark:text-white/40">/ 100</span>
        </div>
      </div>
    </div>
  );
}