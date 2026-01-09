import { lazy } from 'react';

const CryptoDashboard = lazy(() => import('./pages/CryptoDashboard').then(m => ({ default: m.CryptoDashboard })));

export const cryptoRoutes = [
  {
    path: '/proyectos/crypto',
    element: <CryptoDashboard />,
  },
];
