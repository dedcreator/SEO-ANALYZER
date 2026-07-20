// app/types/index.ts
export interface ScoreBreakdown {
  meta_tags: number;
  headings: number;
  images: number;
  links: number;
  content: number;
  security: number;
}

export interface MetaTag {
  content: string;
  length: number;
  status: 'optimal' | 'too_short' | 'too_long' | 'missing';
  recommendation?: string;
}

export interface SEOReport {
  url: string;
  score: number;
  score_breakdown: ScoreBreakdown;
  meta_tags: {
    title: MetaTag;
    description: MetaTag;
    canonical: string;
    canonical_status: string;
    robots: {
      content: string;
      index: boolean;
      follow: boolean;
    };
    viewport: boolean;
    viewport_content?: string;
    charset: string;
    og_tags: Record<string, string>;
    twitter_tags: Record<string, string>;
    schema_markup: any[];
    favicon: string;
  };
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  images: {
    total: number;
    without_alt: number;
    without_lazy_loading: number;
    missing_dimensions: number;
    alt_coverage: number;
    images: Array<{
      src: string;
      alt: string;
      has_alt: boolean;
      loading: string;
      width: string;
      height: string;
    }>;
    issues: {
      missing_alt: boolean;
      no_lazy_loading: boolean;
      missing_dimensions: boolean;
    };
  };
  links: {
    total: number;
    internal: number;
    external: number;
    nofollow: number;
    social_links: number;
    broken_patterns: number;
    internal_links: string[];
    external_links: string[];
    has_external: boolean;
    has_social: boolean;
  };
  performance: {
    http_status: number;
    content_type: string;
    server: string;
    cache_control: string;
    load_time?: number;
  };
  security: {
    https: boolean;
    has_ssl_cert: boolean;
    ssl_valid: boolean;
    ssl_expiry: string | null;
    ssl_issuer: any;
    hsts: boolean;
    mixed_content: boolean;
    tls_version?: string;
    cipher?: string;
    ssl_error?: string;
  };
  content: {
    word_count: number;
    sentence_count: number;
    paragraph_count: number;
    avg_sentence_length: number;
    readability_score: number;
    readability_level: string;
    top_keywords: Array<{
      word: string;
      count: number;
      density: number;
    }>;
    has_h1: boolean;
    has_lists: boolean;
    content_rich: boolean;
    issues: {
      thin_content: boolean;
      no_h1: boolean;
      no_lists: boolean;
      low_readability: boolean;
    };
  };
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low' | 'info';
    impact: number;
    category: string;
    title: string;
    message: string;
    action: string;
  }>;
  analyzed_at: string;
  readability_score?: number;
  mobile_friendly?: boolean;
}