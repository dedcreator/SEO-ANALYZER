// app/components/ImagesSection.tsx
'use client';

interface Props {
  images: {
    total: number;
    without_alt: number;
    without_lazy_loading: number;
    potentially_oversized: number;
    alt_coverage: number;
    images?: { src: string; alt: string; has_alt: boolean; loading: string }[];
  };
}

export function ImagesSection({ images }: Props) {
  const imageList = images.images || [];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Images ({images.total || 0})
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xl font-bold text-green-600 dark:text-green-400">{images.alt_coverage || 0}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Alt Coverage</p>
        </div>
        <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-xl font-bold text-red-600 dark:text-red-400">{images.without_alt || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Missing Alt</p>
        </div>
        <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{images.without_lazy_loading || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">No Lazy Load</p>
        </div>
        <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{images.potentially_oversized || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Oversized</p>
        </div>
      </div>

      {imageList.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Images</h4>
          <div className="space-y-2">
            {imageList.slice(0, 5).map((img, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs">
                <span className={img.has_alt ? 'text-green-500' : 'text-red-500'}>
                  {img.has_alt ? '✅' : '❌'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-gray-600 dark:text-gray-300">{img.src || 'No src'}</p>
                  {img.alt && <p className="text-gray-400 dark:text-gray-500 truncate">Alt: {img.alt}</p>}
                  {!img.alt && <p className="text-red-400 dark:text-red-400 text-xs">Missing alt text</p>}
                </div>
              </div>
            ))}
            {imageList.length > 5 && (
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                +{imageList.length - 5} more images
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}