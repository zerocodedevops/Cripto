import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Currency = 'EUR' | 'USD' | 'GBP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencySymbol: string;
  currencyLocale: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencyConfig = {
  EUR: { symbol: '€', locale: 'es-ES' },
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const currencySymbol = currencyConfig[currency].symbol;
  const currencyLocale = currencyConfig[currency].locale;

  // Persist currency selection
  useEffect(() => {
    const saved = localStorage.getItem('crypto-currency') as Currency;
    if (saved && (saved === 'EUR' || saved === 'USD' || saved === 'GBP')) {
      setCurrency(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crypto-currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol, currencyLocale }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
