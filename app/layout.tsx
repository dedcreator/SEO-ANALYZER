import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://analyser.scalewithdestiny.com'),
  title: 'Free SEO Analyzer | ScaleWithDestiny',
  description: 'Analyze any website SEO performance instantly. No signup required. Get actionable recommendations to improve your search rankings.',
  keywords: ['SEO analyzer', 'free SEO tool', 'website audit', 'SEO checker'],
  openGraph: {
    title: 'Free SEO Analyzer | ScaleWithDestiny',
    description: 'Analyze any website SEO performance instantly.',
    url: 'https://analyser.scalewithdestiny.com',
    siteName: 'ScaleWithDestiny SEO Analyzer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Analyzer | ScaleWithDestiny',
    description: 'Analyze any website SEO performance instantly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}