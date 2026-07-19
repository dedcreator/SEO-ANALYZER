interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  message: string;
}

interface Props {
  recommendations: Recommendation[];
}

const priorityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200',
};

export function RecommendationsSection({ recommendations }: Props) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800">🎉 Perfect Score!</h3>
        <p className="text-green-700 mt-1">No SEO issues found. Great job!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recommendations ({recommendations.length})
      </h3>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg border ${priorityColors[rec.priority]}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider mt-0.5 min-w-[60px]">
              {rec.priority}
            </span>
            <div>
              <span className="text-xs font-medium opacity-75">{rec.category}</span>
              <p className="text-sm mt-0.5">{rec.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}