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
  
  const getColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#F97316';
    return '#EF4444';
  };

  const color = getColor(score);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            className="dark:stroke-gray-700"
          />
          {/* Progress circle */}
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
          <span className="text-5xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Overall SEO Score
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'}
        </p>
      </div>
    </div>
  );
}