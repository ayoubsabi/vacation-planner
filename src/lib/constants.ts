import { ExpenseCategory } from "./types";

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; emoji: string }[] = [
  { value: "accommodation", label: "Accommodation", emoji: "🏨" },
  { value: "food", label: "Food & Drink", emoji: "🍽️" },
  { value: "transport", label: "Transport", emoji: "✈️" },
  { value: "activities", label: "Activities", emoji: "🎭" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬" },
  { value: "other", label: "Other", emoji: "📦" },
];

export const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
];

// Popular destinations with suggested budgets (per person per day in USD)
export const DESTINATION_SUGGESTIONS = [
  { name: "Paris, France", currency: "EUR", dailyBudgetUSD: 200 },
  { name: "Tokyo, Japan", currency: "JPY", dailyBudgetUSD: 150 },
  { name: "New York, USA", currency: "USD", dailyBudgetUSD: 250 },
  { name: "London, UK", currency: "GBP", dailyBudgetUSD: 220 },
  { name: "Barcelona, Spain", currency: "EUR", dailyBudgetUSD: 130 },
  { name: "Bangkok, Thailand", currency: "THB", dailyBudgetUSD: 60 },
  { name: "Bali, Indonesia", currency: "IDR", dailyBudgetUSD: 70 },
  { name: "Rome, Italy", currency: "EUR", dailyBudgetUSD: 150 },
  { name: "Sydney, Australia", currency: "AUD", dailyBudgetUSD: 180 },
  { name: "Dubai, UAE", currency: "AED", dailyBudgetUSD: 200 },
  { name: "Cancun, Mexico", currency: "MXN", dailyBudgetUSD: 100 },
  { name: "Amsterdam, Netherlands", currency: "EUR", dailyBudgetUSD: 170 },
  { name: "Singapore", currency: "SGD", dailyBudgetUSD: 160 },
  { name: "Prague, Czech Republic", currency: "CZK", dailyBudgetUSD: 90 },
  { name: "Lisbon, Portugal", currency: "EUR", dailyBudgetUSD: 110 },
  { name: "Marrakech, Morocco", currency: "MAD", dailyBudgetUSD: 70 },
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  accommodation: "#FF6B35",
  food: "#F4B860",
  transport: "#004E89",
  activities: "#2DD4BF",
  shopping: "#A78BFA",
  entertainment: "#FB7185",
  other: "#94A3B8",
};

export const APP_NAME = "TripBudget";
export const APP_VERSION = "1.0.0";
