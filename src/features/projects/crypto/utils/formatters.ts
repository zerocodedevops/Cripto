// Formatting utilities for crypto dashboard

export function formatCurrency(value: number | undefined | null, currency: string = 'EUR', locale: string = 'es-ES'): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '0,00 €';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLargeNumber(value: number | undefined | null, currencySymbol: string = '€'): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return `0 ${currencySymbol}`;
  }
  
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)} B${currencySymbol}`;
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} MM${currencySymbol}`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} M${currencySymbol}`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)} K${currencySymbol}`;
  }
  return formatCurrency(value);
}

export function formatPercentage(value: number | undefined | null, decimals: number = 2): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '0.00%';
  }
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

export function formatDate(timestamp: number | string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(timestamp: number | string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export function formatPriceChange(change: number): { text: string; color: string; icon: string } {
  const isPositive = change >= 0;
  return {
    text: formatPercentage(change),
    color: isPositive ? '#10B981' : '#EF4444',
    icon: isPositive ? '↑' : '↓',
  };
}

export function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
