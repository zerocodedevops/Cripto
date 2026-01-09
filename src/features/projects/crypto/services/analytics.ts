export const analytics = {
  trackEvent: (eventName: string, data?: any) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`[Analytics] ${eventName}`, data || '');
    }
    // In production, this would send to Posthog/Mixpanel
  },
  
  trackPageView: (path: string) => {
    if (import.meta.env.MODE === 'development') {
      console.log(`[Analytics] Page View: ${path}`);
    }
  }
};

// Hook for auto-tracking
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location]);
}
