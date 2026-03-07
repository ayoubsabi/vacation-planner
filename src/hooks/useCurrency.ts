"use client";
import { useState, useEffect } from "react";
import { getExchangeRates, convertCurrency } from "@/lib/currency";

export function useCurrency() {
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });

  useEffect(() => {
    getExchangeRates().then(setRates);
  }, []);

  const convert = (amount: number, from: string, to: string) =>
    convertCurrency(amount, from, to, rates);

  return { rates, convert };
}
