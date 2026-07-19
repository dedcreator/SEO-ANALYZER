'use client';

import { useState } from 'react';
import { SEOReport } from './types';
import { AnalysisForm } from './components/AnalysisForm';
import { ReportDashboard } from './components/ReportDashboard';
import { ScaleWithDestinyHeader } from './components/Header';
import { Footer } from './components/Footer';

export default function Home() {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeUrl = async (url: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Analysis failed');
      }

      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <ScaleWithDestinyHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {!report ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free SEO Analyzer
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Analyze any website's SEO performance in seconds. No signup required.
            </p>
            <AnalysisForm onSubmit={analyzeUrl} loading={loading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        ) : (
          <ReportDashboard 
            report={report} 
            onReset={() => setReport(null)} 
          />
        )}
      </div>

      <Footer />
    </main>
  );
}