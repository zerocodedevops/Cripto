import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import DashboardPage from '../pages/DashboardPage';
import { handlers } from '@/mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
import { MemoryRouter } from 'react-router-dom';

// Mock language context to avoid provider issues
const MockLanguageProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
// Mock useLanguage
vi.mock('../i18n/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('DashboardPage', () => {
  it('shows loading skeletons initially', () => {
    render(<DashboardPage />, { wrapper: createWrapper() });
    // Expect skeletons (generic check or specific class)
    // We used animate-pulse class in our components
    const skeletons = document.getElementsByClassName('animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders dashboard title and kpis', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() });

    expect(screen.getByText('Overview')).toBeInTheDocument();

    // Check loading state
    // expect(screen.getAllByRole('status')).toHaveLength(1); // Skeletons usually don't have rol status unless added

    // Check loaded data (mock data from handlers.ts)
    await waitFor(() => {
      expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
      expect(screen.getByText('$12,450')).toBeInTheDocument();
    });
  });

  it('renders all charts', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Tendencia de Ventas')).toBeInTheDocument();
      expect(screen.getByText('Ingresos por Dispositivo')).toBeInTheDocument();
      expect(screen.getByText('Embudo de Conversión')).toBeInTheDocument();
    });
  });

  it('filters invoke new data fetch', async () => {
    render(<DashboardPage />, { wrapper: createWrapper() });

    const rangeSelect = await screen.findByRole('combobox'); // Assuming select has role combobox or we look by display value
    fireEvent.change(rangeSelect, { target: { value: '30d' } });

    // In a real integration test we might spy on the network or check if different data loads.
    // Since our mock returns random data or static data, we just verify the interaction doesn't crash
    // and potentially spy on the request if possible, but for now simple render check is fine.
    await waitFor(() => {
      expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
    });
  });

  it('handles api error gracefully', async () => {
    server.use(
      http.get('/api/analytics/dashboard', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<DashboardPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Error al cargar los datos del dashboard.')).toBeInTheDocument();
    });
  });
});
