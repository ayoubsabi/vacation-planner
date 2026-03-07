// USD-only implementation. All amounts stored in trip's baseCurrency.
// Stub rates structure makes it easy to integrate Open Exchange Rates later.

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.89,
  CNY: 7.24,
  INR: 83.1,
  MXN: 17.2,
  BRL: 4.97,
  SGD: 1.34,
  HKD: 7.82,
  NOK: 10.5,
  SEK: 10.4,
  DKK: 6.88,
  NZD: 1.63,
  ZAR: 18.6,
  TRY: 30.5,
  AED: 3.67,
  MAD: 10.1,
};

const RATES_CACHE_KEY = "exchange_rates_cache";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

interface RatesCache {
  rates: Record<string, number>;
  timestamp: number;
}

function getCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const cache: RatesCache = JSON.parse(raw);
    if (Date.now() - cache.timestamp > CACHE_DURATION_MS) return null;
    return cache.rates;
  } catch {
    return null;
  }
}

function setCachedRates(rates: Record<string, number>): void {
  try {
    const cache: RatesCache = { rates, timestamp: Date.now() };
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore storage errors
  }
}

export async function getExchangeRates(): Promise<Record<string, number>> {
  const cached = getCachedRates();
  if (cached) return cached;

  try {
    const res = await fetch("/api/exchange-rates");
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    setCachedRates(data.rates);
    return data.rates;
  } catch {
    return FALLBACK_RATES;
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = rates[fromCurrency] ?? 1;
  const toRate = rates[toCurrency] ?? 1;
  return (amount / fromRate) * toRate;
}

export function getCurrencySymbol(code: string): string {
  const map: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "CA$",
    AUD: "A$", CHF: "CHF", CNY: "¥", INR: "₹", MXN: "MX$",
    BRL: "R$", SGD: "S$", HKD: "HK$", NOK: "kr", SEK: "kr",
    DKK: "kr", NZD: "NZ$", ZAR: "R", TRY: "₺", AED: "د.إ", MAD: "MAD",
  };
  return map[code] ?? code;
}
