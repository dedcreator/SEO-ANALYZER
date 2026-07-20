// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta' 
});

export const metadata: Metadata = {
  title: 'ScaleWithDestiny - Professional SEO Analysis & Growth Platform',
  description: 'Get comprehensive SEO analysis, actionable insights, and expert guidance to scale your business. 6 free analyses per month.',
  keywords: 'SEO analyzer, SEO audit, website analysis, digital marketing, business growth',
  openGraph: {
    title: 'ScaleWithDestiny - Professional SEO Analysis & Growth Platform',
    description: 'Get comprehensive SEO analysis, actionable insights, and expert guidance to scale your business.',
    type: 'website',
    url: 'https://analyser.scalewithdestiny.com',
    images: [
      {
        url: 'https://analyser.scalewithdestiny.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ScaleWithDestiny SEO Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScaleWithDestiny - Professional SEO Analysis',
    description: 'Get comprehensive SEO analysis, actionable insights, and expert guidance to scale your business.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}