// app/components/sections/ImagesSection.tsx
'use client';

import { Image, AlertCircle, CheckCircle, Eye, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  images?: {
    total?: number;
    without_alt?: number;
    without_lazy_loading?: number;
    potentially_oversized?: number;
    missing_dimensions?: number;
    alt_coverage?: number;
    images?: { src: string; alt: string; has_alt: boolean; loading: string }[];
  };
}

export function ImagesSection({ images = {} }: Props) {
  const total = images?.total ?? 0;
  const withoutAlt = images?.without_alt ?? 0;
  const withoutLazy = images?.without_lazy_loading ?? 0;
  const potentiallyOversized = images?.potentially_oversized ?? images?.missing_dimensions ?? 0;
  const altCoverage = images?.alt_coverage ?? 0;
  const imageList = images?.images ?? [];

  const getAltStatus = () => {
    if (altCoverage >= 80) return { icon: CheckCircle, color: 'text-emerald-500', label: 'Good' };
    if (altCoverage >= 50) return { icon: AlertCircle, color: 'text-amber-500', label: 'Needs Improvement' };
    return { icon: AlertTriangle, color: 'text-rose-500', label: 'Poor' };
  };

  const status = getAltStatus();
  const StatusIcon = status.icon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Image className="w-5 h-5 text-slate-400" />
        Images ({total})
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{altCoverage}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
            Alt Coverage
          </p>
        </div>
        <div className="text-center p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{withoutAlt}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Missing Alt</p>
        </div>
        <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{withoutLazy}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">No Lazy Load</p>
        </div>
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{potentiallyOversized}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Oversized</p>
        </div>
      </div>

      {imageList.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-400" />
            Sample Images
          </h4>
          <div className="space-y-2">
            {imageList.slice(0, 5).map((img, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-xs">
                {img.has_alt ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-slate-600 dark:text-slate-300">{img.src || 'No src'}</p>
                  {img.alt && <p className="text-slate-400 dark:text-slate-500 truncate">Alt: {img.alt}</p>}
                  {!img.alt && <p className="text-rose-400 dark:text-rose-400 text-xs">Missing alt text</p>}
                </div>
              </div>
            ))}
            {imageList.length > 5 && (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                +{imageList.length - 5} more images
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}