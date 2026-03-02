import type { Config } from '@react-router/dev/config';
import { barrios } from './src/clients/madrid-zerochaos/barrios';

export default {
  // Disable SSR for full static site generation
  ssr: false,

  // Prerender function to generate static HTML for all routes
  async prerender() {
    const barrioRoutes = barrios.map((b) => `/reformas-madrid/${b.slug}`);

    return [
      '/',
      '/reformas-integrales-madrid',
      '/reformas-cocinas-madrid',
      '/reformas-banos-madrid',
      ...barrioRoutes,
      '/proyectos',
      '/contacto',
      '/sobre-nosotros',
    ];
  },
} satisfies Config;
