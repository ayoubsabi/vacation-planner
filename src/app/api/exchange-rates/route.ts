import { NextResponse } from "next/server";

// USD-only stub. Structured for easy swap to Open Exchange Rates API.
// To enable real rates: set NEXT_PUBLIC_EXCHANGE_RATES_API_KEY and update this route.
const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36,
  AUD: 1.53, CHF: 0.89, CNY: 7.24, INR: 83.1, MXN: 17.2,
  BRL: 4.97, SGD: 1.34, HKD: 7.82, NOK: 10.5, SEK: 10.4,
  DKK: 6.88, NZD: 1.63, ZAR: 18.6, TRY: 30.5, AED: 3.67, MAD: 10.1,
};

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`,
        { next: { revalidate: 86400 } }
      );
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(
          { rates: data.rates, source: "live" },
          { headers: { "Cache-Control": "public, max-age=86400" } }
        );
      }
    } catch {
      // fallthrough to stub
    }
  }

  return NextResponse.json(
    { rates: FALLBACK_RATES, source: "fallback" },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  );
}
