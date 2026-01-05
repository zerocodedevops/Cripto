import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const initGA = () => {
  if (MEASUREMENT_ID && import.meta.env.PROD) {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('Google Analytics initialized');
  }
};

export const logPageView = () => {
  if (MEASUREMENT_ID && import.meta.env.PROD) {
    ReactGA.send({ hitType: 'pageview', page: globalThis.location.pathname + globalThis.location.hash });
  }
};

export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  if (MEASUREMENT_ID && import.meta.env.PROD) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

export const trackEvent = logEvent;

// Eventos personalizados
export const trackProjectClick = (projectName: string) => {
  logEvent('Project', 'Click', projectName);
};

export const trackContactSubmit = () => {
  logEvent('Contact', 'Submit', 'Contact Form');
};

export const trackBlogRead = (articleTitle: string) => {
  logEvent('Blog', 'Read', articleTitle);
};

export const trackDownload = (fileName: string) => {
  logEvent('Download', 'Click', fileName);
};
