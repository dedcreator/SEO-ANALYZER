// app/components/PDFExportButton.tsx
'use client';

import { useState } from 'react';
import { Icons } from './Icons';
import { SEOReport } from '../types';

interface Props {
  report: SEOReport;
}

export function PDFExportButton({ report }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: report.url }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      disabled={exporting}
      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 text-sm font-medium shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
    >
      {exporting ? (
        <>
          <Icons.Refresh className="w-4 h-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Icons.Download className="w-4 h-4" />
          Export PDF
        </>
      )}
    </button>
  );
}