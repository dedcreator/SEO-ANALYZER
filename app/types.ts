export interface SEOReport {
  url: string;
  score: number;
  meta_tags: {
    title: { content: string; length: number; status: string };
    description: { content: string; length: number; status: string };
    canonical: string;
    robots: string;
    viewport: boolean;
    charset: boolean;
    og_tags: Record<string, string>;
    twitter_tags: Record<string, string>;
    schema_markup: any[];
  };
  headings: Record<string, string[]>;
  images: {
    total: number;
    without_alt: number;
    alt_coverage: number;
    images: any[];
  };
  links: {
    total: number;
    internal: number;
    external: number;
    nofollow: number;
  };
  performance: {
    http_status: number;
    content_type: string;
    server: string;
  };
  security: {
    https: boolean;
    tls_version?: string;
  };
  content: {
    word_count: number;
    top_keywords: any[];
    has_h1: boolean;
  };
  recommendations: {
    priority: string;
    category: string;
    message: string;
  }[];
  analyzed_at: string;
}