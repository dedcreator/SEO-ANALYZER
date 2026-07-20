// app/types/index.ts 
export interface ScoreBreakdown {
  meta_tags: number;
  headings: number;
  images: number;
  links: number;
  content: number;
  security: number;
}

export interface SEOReport {
  url: string;
  score: number;
  score_breakdown: ScoreBreakdown;
  meta_tags?: {
    title?: { content?: string; length?: number; status?: string };
    description?: { content?: string; length?: number; status?: string };
    canonical?: string;
    viewport?: boolean;
    charset?: string;
    robots?: { content?: string; index?: boolean; follow?: boolean };
    og_tags?: Record<string, string>;
    twitter_tags?: Record<string, string>;
  };
  headings?: {
    h1?: string[];
    h2?: string[];
    h3?: string[];
    h4?: string[];
    h5?: string[];
    h6?: string[];
  };
  images?: {
    total?: number;
    without_alt?: number;
    without_lazy_loading?: number;
    missing_dimensions?: number;
    potentially_oversized?: number;
    alt_coverage?: number;
    images?: { src: string; alt: string; has_alt: boolean; loading: string }[];
  };
  links?: {
    total?: number;
    internal?: number;
    external?: number;
    nofollow?: number;
    social_links?: number;
    has_social?: boolean;
    has_external?: boolean;
  };
  performance?: {
    http_status?: number;
    content_type?: string;
    server?: string;
    cache_control?: string;
    load_time?: number | null;
  };
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
  content?: {
    word_count?: number;
    sentence_count?: number;
    paragraph_count?: number;
    avg_sentence_length?: number;
    readability_score?: number;
    readability_level?: string;
    top_keywords?: { word: string; count: number; density: number }[];
    has_h1?: boolean;
    has_lists?: boolean;
    content_rich?: boolean;
    issues?: {
      thin_content?: boolean;
      no_h1?: boolean;
      no_lists?: boolean;
      low_readability?: boolean;
    };
  };
  recommendations: {
    priority: 'critical' | 'high' | 'medium' | 'low' | 'info';
    impact: number;
    category: string;
    title: string;
    message: string;
    action: string;
  }[];
  analyzed_at: string;
  readability_score?: number;
  mobile_friendly?: boolean;
}