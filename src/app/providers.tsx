import { ReactNode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { CurrencyProvider } from '../features/projects/crypto/context/CurrencyContext';
import { WatchlistProvider } from '../features/projects/crypto/context/WatchlistContext';
import { PortfolioProvider } from '../features/projects/crypto/context/PortfolioContext';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <CurrencyProvider>
          <WatchlistProvider>
            <PortfolioProvider>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                {children}
              </Suspense>
            </PortfolioProvider>
          </WatchlistProvider>
        </CurrencyProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
