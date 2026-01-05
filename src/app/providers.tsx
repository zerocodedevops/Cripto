import { ReactNode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          {children}
        </Suspense>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
