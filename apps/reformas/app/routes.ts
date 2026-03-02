import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // Optional base path to handle both root and /reformas/ routing
  route(':base?', 'layout.tsx', [
    index('routes/_index.tsx'),
    route(
      'reformas-integrales-madrid',
      'routes/reformas-integrales-madrid.tsx',
    ),
    route('reformas-cocinas-madrid', 'routes/reformas-cocinas-madrid.tsx'),
    route('reformas-banos-madrid', 'routes/reformas-banos-madrid.tsx'),
    route('reformas-madrid/:barrio', 'routes/reformas-madrid.$barrio.tsx'),
    route('proyectos', 'routes/proyectos.tsx'),
    route('contacto', 'routes/contacto.tsx'),
    route('sobre-nosotros', 'routes/sobre-nosotros.tsx'),
  ]),
] satisfies RouteConfig;
