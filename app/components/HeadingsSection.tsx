// app/components/HeadingsSection.tsx
'use client';

export function HeadingsSection({ headings }: { headings: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Headings Structure</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(level => {
          const tag = `h${level}`;
          const items = headings[tag] || [];
          return (
            <div key={level} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">H{level} ({items.length})</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}