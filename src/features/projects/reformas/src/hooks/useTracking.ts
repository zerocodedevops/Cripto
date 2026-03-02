import { useCallback } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const useTracking = () => {
  const trackEvent = useCallback(
    (action: string, category: string, label: string) => {
      if (globalThis.gtag) {
        globalThis.gtag('event', action, {
          event_category: category,
          event_label: label,
        });
      }
      console.log(
        `[Track] Action: ${action}, Category: ${category}, Label: ${label}`,
      );
    },
    [],
  );

  const trackWhatsAppClick = useCallback(() => {
    trackEvent('click_whatsapp', 'Conversion', 'WhatsApp Float');
  }, [trackEvent]);

  const trackCTAClick = useCallback(
    (label: string) => {
      trackEvent('click_cta', 'Engagement', label);
    },
    [trackEvent],
  );

  return { trackEvent, trackWhatsAppClick, trackCTAClick };
};
