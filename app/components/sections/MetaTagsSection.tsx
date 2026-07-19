interface Props {
  meta: any;
}

export function MetaTagsSection({ meta }: Props) {
  const statusColors = {
    optimal: 'text-green-600',
    too_short: 'text-yellow-600',
    too_long: 'text-yellow-600',
    missing: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Tags</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Title</span>
            <span className={statusColors[meta.title.status as keyof typeof statusColors]}>
              {meta.title.status}
            </span>
          </div>
          <p className="text-sm text-gray-800 mt-1 font-medium">{meta.title.content || '—'}</p>
          <p className="text-xs text-gray-400">{meta.title.length} characters</p>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Description</span>
            <span className={statusColors[meta.description.status as keyof typeof statusColors]}>
              {meta.description.status}
            </span>
          </div>
          <p className="text-sm text-gray-800 mt-1">{meta.description.content || '—'}</p>
          <p className="text-xs text-gray-400">{meta.description.length} characters</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={meta.canonical ? 'text-green-500' : 'text-red-500'}>●</span>
            <span className="text-gray-600">Canonical</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={meta.viewport ? 'text-green-500' : 'text-red-500'}>●</span>
            <span className="text-gray-600">Viewport</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={meta.charset ? 'text-green-500' : 'text-red-500'}>●</span>
            <span className="text-gray-600">Charset</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={Object.keys(meta.og_tags).length > 0 ? 'text-green-500' : 'text-yellow-500'}>●</span>
            <span className="text-gray-600">Open Graph</span>
          </div>
        </div>
      </div>
    </div>
  );
}