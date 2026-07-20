// app/components/sections/MetaTagsSection.tsx
'use client';

import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Props {
  meta?: {
    title?: { content?: string; length?: number; status?: string };
    description?: { content?: string; length?: number; status?: string };
    canonical?: string;
    viewport?: boolean;
    charset?: string;
    robots?: { content?: string; index?: boolean; follow?: boolean };
    og_tags?: Record<string, string>;
    twitter_tags?: Record<string, string>;
  };
}

export function MetaTagsSection({ meta = {} }: Props) {
  const title = meta?.title ?? { content: 'Not set', length: 0, status: 'missing' };
  const description = meta?.description ?? { content: 'Not set', length: 0, status: 'missing' };
  
  const getStatusIcon = (status?: string) => {
    if (status === 'optimal' || status === 'present') {
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    } else if (status === 'missing') {
      return <XCircle className="w-4 h-4 text-rose-500" />;
    } else {
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (status === 'optimal' || status === 'present') {
      return 'text-emerald-600 dark:text-emerald-400';
    } else if (status === 'missing') {
      return 'text-rose-600 dark:text-rose-400';
    } else {
      return 'text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-slate-400" />
        Meta Tags
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Title</p>
            {getStatusIcon(title.status)}
          </div>
          <p className={`font-medium text-sm ${getStatusColor(title.status)}`}>
            {title.content || 'Not set'}
          </p>
          {title.content && title.content !== 'Not set' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Length: {title.length || 0} characters • {title.status || 'unknown'}
            </p>
          )}
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Description</p>
            {getStatusIcon(description.status)}
          </div>
          <p className={`font-medium text-sm ${getStatusColor(description.status)}`}>
            {description.content || 'Not set'}
          </p>
          {description.content && description.content !== 'Not set' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Length: {description.length || 0} characters • {description.status || 'unknown'}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Canonical</p>
          <p className="text-sm font-medium flex items-center justify-center gap-1">
            {meta?.canonical ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Present</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600 dark:text-rose-400">Missing</span>
              </>
            )}
          </p>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Viewport</p>
          <p className="text-sm font-medium flex items-center justify-center gap-1">
            {meta?.viewport ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Set</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600 dark:text-rose-400">Missing</span>
              </>
            )}
          </p>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Charset</p>
          <p className="text-sm font-medium flex items-center justify-center gap-1">
            {meta?.charset ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">{meta.charset}</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600 dark:text-rose-400">Not set</span>
              </>
            )}
          </p>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Robots</p>
          <p className="text-sm font-medium flex items-center justify-center gap-1">
            {meta?.robots?.content ? (
              <span className="text-slate-700 dark:text-slate-300">{meta.robots.content}</span>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Default</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}