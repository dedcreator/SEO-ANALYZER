// app/components/sections/LinksSection.tsx
'use client';

import { Link, ExternalLink, Users, Hash, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  links: {
    total?: number;
    internal?: number;
    external?: number;
    nofollow?: number;
    social_links?: number;
    has_social?: boolean;
    has_external?: boolean;
  };
}

export function LinksSection({ links }: Props) {
  const total = links?.total ?? 0;
  const internal = links?.internal ?? 0;
  const external = links?.external ?? 0;
  const nofollow = links?.nofollow ?? 0;
  const socialLinks = links?.social_links ?? 0;
  const hasSocial = links?.has_social ?? false;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Link className="w-5 h-5 text-slate-400" />
        Links ({total})
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{internal}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Internal</p>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{external}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">External</p>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">{nofollow}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Nofollow</p>
        </div>
        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{socialLinks}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Social</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {hasSocial && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-200 dark:border-emerald-800/50">
            <Users className="w-3.5 h-3.5" />
            Social Links
          </span>
        )}
        {external > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800/50">
            <ExternalLink className="w-3.5 h-3.5" />
            External Links
          </span>
        )}
        {internal > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800/50">
            <Link className="w-3.5 h-3.5" />
            Internal Links
          </span>
        )}
      </div>
    </div>
  );
}