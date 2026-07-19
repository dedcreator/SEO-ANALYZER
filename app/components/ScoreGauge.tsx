interface Props {
  score: number;
}

export function ScoreGauge({ score }: Props) {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-500 stroke-green-500';
    if (s >= 60) return 'text-yellow-500 stroke-yellow-500';
    if (s >= 40) return 'text-orange-500 stroke-orange-500';
    return 'text-red-500 stroke-red-500';
  };

  const getLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Needs Work';
    return 'Poor';
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            className={getColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getColor(score).split(' ')[0]}`}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600 mt-1">{getLabel(score)}</span>
    </div>
  );
}