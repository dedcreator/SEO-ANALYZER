// app/utils/formatters.ts
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getScoreBadge(score: number): { label: string; color: string } {
  if (score >= 80) {
    return { 
      label: 'Excellent', 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
    };
  }
  if (score >= 60) {
    return { 
      label: 'Good', 
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' 
    };
  }
  if (score >= 40) {
    return { 
      label: 'Fair', 
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' 
    };
  }
  return { 
    label: 'Needs Work', 
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
  };
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`;
  }
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  return `${days} day${days > 1 ? 's' : ''}${hours > 0 ? ` and ${hours} hour${hours > 1 ? 's' : ''}` : ''}`;
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getStatusBadge(status: string): string {
  const colors: Record<string, string> = {
    optimal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    too_short: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    too_long: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    missing: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    present: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    info: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };
  return colors[priority] || colors.info;
}