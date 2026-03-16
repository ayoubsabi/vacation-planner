export type TripInterest =
  | "Culture"
  | "Food"
  | "Adventure"
  | "Nature"
  | "Shopping"
  | "Nightlife"
  | "Beach"
  | "History"
  | "Art"
  | "Sports";

export interface AISuggestions {
  content: string;
  generatedAt: string;
  interests: TripInterest[];
  groundedWithPlaces?: boolean;
}

export interface TripPlan {
  content: string;
  generatedAt: string;
  interests: TripInterest[];
  groundedWithPlaces?: boolean;
}

export type ExpenseCategory =
  | "accommodation"
  | "food"
  | "transport"
  | "activities"
  | "shopping"
  | "entertainment"
  | "other";

export interface Traveler {
  id: string;
  name: string;
  email?: string;
}

export interface Expense {
  id: string;
  tripId: string;
  description: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  date: string;
  paidBy: string;
  splitBetween: string[];
  notes?: string;
  createdAt: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  destinationLat?: number;
  destinationLng?: number;
  startDate: string;
  endDate: string;
  budget: number;
  baseCurrency: string;
  travelers: Traveler[];
  expenses: Expense[];
  places?: import("@/lib/places").PlaceResult[];
  interests?: TripInterest[];
  aiSuggestions?: AISuggestions;
  tripPlan?: TripPlan;
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

export interface Settings {
  baseCurrency: string;
  dateFormat: "MM/DD/YYYY" | "DD/MM/YYYY";
  theme: "light" | "dark" | "auto";
}

export interface Debt {
  from: string;
  to: string;
  amount: number;
  settled?: boolean;
  notes?: string;
}
