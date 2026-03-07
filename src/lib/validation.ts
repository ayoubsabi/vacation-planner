import { z } from "zod";

export const travelerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email().optional().or(z.literal("")),
});

export const expenseSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  description: z.string().min(1, "Description is required").max(100),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().min(3).max(3),
  category: z.enum([
    "accommodation",
    "food",
    "transport",
    "activities",
    "shopping",
    "entertainment",
    "other",
  ]),
  date: z.string(),
  paidBy: z.string().min(1, "Paid by is required"),
  splitBetween: z.array(z.string()),
  notes: z.string().max(500).optional(),
  createdAt: z.string(),
});

export const tripSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Trip name is required").max(80),
  destination: z.string().min(1, "Destination is required").max(100),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().positive("Budget must be positive"),
  baseCurrency: z.string().min(3).max(3),
  travelers: z.array(travelerSchema).min(1, "At least one traveler required"),
  expenses: z.array(expenseSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean().optional(),
});

export type TripInput = z.infer<typeof tripSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
export type TravelerInput = z.infer<typeof travelerSchema>;
