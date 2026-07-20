// app/utils/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.scalewithdestiny.com';

export async function exportPDF(url: string): Promise<Blob> {
  const response = await fetch(`${API_BASE}/report/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.error || 'Failed to generate PDF');
  }

  return response.blob();
}

export async function analyzeUrl(url: string) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.error || 'Analysis failed');
  }

  return response.json();
}

export async function getUsageStats() {
  const response = await fetch(`${API_BASE}/api/usage`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch usage stats');
  }

  return response.json();
}

export function getRateLimitInfo(response: Response) {
  return {
    limit: response.headers.get('X-RateLimit-Limit'),
    remaining: response.headers.get('X-RateLimit-Remaining'),
    used: response.headers.get('X-RateLimit-Used'),
    resetIn: response.headers.get('X-RateLimit-Reset-In'),
  };
}