// Custom formatting hooks that use currency context
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency as baseCurrency, formatLargeNumber as baseLargeNumber } from '../utils/formatters';

const exchangeRates = {
  EUR: 1,
  USD: 1.05, // 1 EUR = 1.05 USD (Approx)
  GBP: 0.83, // 1 EUR = 0.83 GBP (Approx)
};

export function useCurrencyFormat() {
  const { currency, currencyLocale, currencySymbol } = useCurrency();
  const rate = exchangeRates[currency];

  const formatCurrency = (value: number | undefined | null) => {
    if (value === undefined || value === null) return baseCurrency(value, currency, currencyLocale);
    return baseCurrency(value * rate, currency, currencyLocale);
  };

  const formatLargeNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) return baseLargeNumber(value, currencySymbol);
    return baseLargeNumber(value * rate, currencySymbol);
  };

  return { formatCurrency, formatLargeNumber };
}
