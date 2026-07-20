// app/components/sections/SecuritySection.tsx
'use client';

import { Shield, Lock, Unlock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Props {
  security?: {
    https?: boolean;
    has_ssl_cert?: boolean;
    ssl_valid?: boolean;
    ssl_expiry?: string | null;
    ssl_issuer?: any;
    tls_version?: string;
    hsts?: boolean;
    mixed_content?: boolean;
    ssl_error?: string;
  };
}

export function SecuritySection({ security }: Props) {
  // Default values with proper null checks
  const hasHttps = security?.https ?? false;
  const hasValidSSL = security?.ssl_valid ?? false;
  const tlsVersion = security?.tls_version ?? 'N/A';
  const sslExpiry = security?.ssl_expiry ?? null;
  const sslError = security?.ssl_error ?? null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-slate-400" />
        Security
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`p-3 rounded-lg ${hasHttps ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-rose-50 dark:bg-rose-950/30'}`}>
          <p className="text-sm text-slate-500 dark:text-slate-400">HTTPS</p>
          <p className="text-lg font-bold flex items-center gap-2">
            {hasHttps ? (
              <>
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Secure</span>
              </>
            ) : (
              <>
                <Unlock className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span className="text-rose-600 dark:text-rose-400">Not Secure</span>
              </>
            )}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${hasValidSSL ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-rose-50 dark:bg-rose-950/30'}`}>
          <p className="text-sm text-slate-500 dark:text-slate-400">SSL Certificate</p>
          <p className="text-lg font-bold flex items-center gap-2">
            {hasValidSSL ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Valid</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span className="text-rose-600 dark:text-rose-400">Invalid</span>
              </>
            )}
          </p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <p className="text-sm text-slate-500 dark:text-slate-400">TLS Version</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{tlsVersion}</p>
        </div>
      </div>

      {sslExpiry && (
        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            SSL Expiry: {new Date(sslExpiry).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}

      {sslError && (
        <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800/50">
          <p className="text-sm text-rose-600 dark:text-rose-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <span>SSL Error: {sslError}</span>
          </p>
        </div>
      )}
    </div>
  );
}