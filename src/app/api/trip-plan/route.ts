import { NextRequest } from "next/server";
import OpenAI from "openai";
import { getTripDuration } from "@/lib/utils";
import type { PlaceResult, PlaceFilter } from "@/lib/places";

export const runtime = "nodejs";

interface TripPlanRequest {
  destination: string;
  budget: number;
  currency: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  interests: string[];
  places?: PlaceResult[];
}

const INTEREST_TO_FILTERS: Record<string, PlaceFilter[]> = {
  Food:      ["restaurant", "cafe"],
  Nightlife: ["bar"],
  Shopping:  ["shop"],
  Culture:   ["explore"],
  History:   ["explore"],
  Art:       ["explore"],
  Adventure: ["explore"],
  Nature:    ["explore"],
  Beach:     ["explore"],
  Sports:    ["explore"],
};
const FALLBACK_FILTERS: PlaceFilter[] = ["restaurant", "explore", "cafe", "bar", "shop"];

const FILTER_LABELS: Record<PlaceFilter, string> = {
  restaurant: "Restaurants",
  cafe:       "Cafes",
  bar:        "Bars & Nightlife",
  explore:    "Attractions & Activities",
  shop:       "Shopping",
  stay:       "Accommodation",
};

function selectPlacesForPrompt(places: PlaceResult[], interests: string[]): PlaceResult[] {
  const relevantFilters = new Set<PlaceFilter>(
    interests.length > 0
      ? interests.flatMap((i) => INTEREST_TO_FILTERS[i] ?? [])
      : FALLBACK_FILTERS
  );
  relevantFilters.delete("stay");

  const perCategory = Math.max(3, Math.floor(28 / relevantFilters.size));
  const selected: PlaceResult[] = [];

  for (const filter of relevantFilters) {
    const top = places
      .filter((p) => p.filter === filter)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, perCategory);
    selected.push(...top);
    if (selected.length >= 28) break;
  }

  return selected.slice(0, 28);
}

function formatPlacesForPrompt(places: PlaceResult[]): string {
  const grouped = new Map<PlaceFilter, PlaceResult[]>();
  for (const p of places) {
    const list = grouped.get(p.filter) ?? [];
    list.push(p);
    grouped.set(p.filter, list);
  }

  const lines: string[] = [];
  for (const [filter, items] of grouped) {
    lines.push(`\n${FILTER_LABELS[filter] ?? filter}:`);
    for (const p of items) {
      const rating = p.rating !== undefined ? `${p.rating.toFixed(1)}/10` : "unrated";
      const price  = p.priceLevel ? "$".repeat(p.priceLevel) : "";
      const parts  = [rating, price].filter(Boolean).join(", ");
      lines.push(`  - [id:${p.id}] ${p.name}${parts ? ` (${parts})` : ""}`);
    }
  }
  return lines.join("\n");
}

function getDayDates(startDate: string, duration: number): string[] {
  const dates: string[] = [];
  const start = new Date(startDate);
  for (let i = 0; i < duration; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
  }
  return dates;
}

function buildGroundedPrompt(p: {
  destination: string;
  budget: number;
  currency: string;
  duration: number;
  dailyBudget: string;
  travelersCount: number;
  interestsList: string;
  placesBlock: string;
  dayDates: string[];
}): string {
  const dayList = p.dayDates.map((d, i) => `Day ${i + 1} — ${d}`).join(", ");
  return `You are an expert travel planner. Create a complete day-by-day itinerary for this trip:

Destination: ${p.destination}
Duration: ${p.duration} days (${dayList})
Total Budget: ${p.budget} ${p.currency} (${p.dailyBudget} ${p.currency}/day per group)
Travelers: ${p.travelersCount}
Interests: ${p.interestsList}

Use ONLY real places from this curated list:
${p.placesBlock}

Format EACH day EXACTLY like this (no deviations):

## Day N — {date} — {Area or Neighbourhood Focus}
**Morning:** [id:EXACT_ID_FROM_LIST] Place Name — [what to do there in one sentence] — ~X ${p.currency}
**Afternoon:** [id:EXACT_ID_FROM_LIST] Place Name — [what to do there in one sentence] — ~X ${p.currency}
**Evening:** [id:EXACT_ID_FROM_LIST] Place Name — [what to do there in one sentence] — ~X ${p.currency}
**Alternatives:** [id:EXACT_ID] Name, [id:EXACT_ID] Name, [id:EXACT_ID] Name
**Day Budget:** ~X ${p.currency} total
**Tip:** [one practical tip specific to the day's activities]

Rules:
- Use ONLY the [id:xxx] values from the list above — copy them exactly as written
- Each day's subtitle should name a neighbourhood, district, or area — NOT a single interest category
- Every day MUST mix different types of activities: e.g. a morning attraction, afternoon leisure (café/shop/nature), evening dining or nightlife
- Nightlife and bars are EVENING-ONLY activities — never place them in the morning or afternoon slot
- Spread the traveler's interests across ALL days rather than dedicating a whole day to one interest
- Keep each day's total within ${p.dailyBudget} ${p.currency}
- Do not repeat the same place on multiple days
- Alternatives should be different places from the list not already used that day
- Be specific and concise — one sentence per activity slot`;
}

function buildGenericPrompt(p: {
  destination: string;
  budget: number;
  currency: string;
  duration: number;
  dailyBudget: string;
  travelersCount: number;
  interestsList: string;
  dayDates: string[];
}): string {
  const dayList = p.dayDates.map((d, i) => `Day ${i + 1} — ${d}`).join(", ");
  return `You are an expert travel planner. Create a complete day-by-day itinerary for this trip:

Destination: ${p.destination}
Duration: ${p.duration} days (${dayList})
Total Budget: ${p.budget} ${p.currency} (${p.dailyBudget} ${p.currency}/day per group)
Travelers: ${p.travelersCount}
Interests: ${p.interestsList}

Format EACH day EXACTLY like this (no deviations):

## Day N — {date} — {Area or Neighbourhood Focus}
**Morning:** Place or Activity Name — [one sentence description] — ~X ${p.currency}
**Afternoon:** Place or Activity Name — [one sentence description] — ~X ${p.currency}
**Evening:** Place or Activity Name — [one sentence description] — ~X ${p.currency}
**Alternatives:** Alternative Place 1, Alternative Place 2
**Day Budget:** ~X ${p.currency} total
**Tip:** [one practical tip specific to the day's activities]

Rules:
- Each day's subtitle should name a neighbourhood, district, or area — NOT a single interest category
- Every day MUST mix different types of activities: e.g. a morning attraction, afternoon leisure (café/shop/nature), evening dining or nightlife
- Nightlife and bars are EVENING-ONLY activities — never place them in the morning or afternoon slot
- Spread the traveler's interests across ALL days rather than dedicating a whole day to one interest
- Keep each day's total within ${p.dailyBudget} ${p.currency}
- Be specific to ${p.destination} — avoid generic suggestions
- One sentence per activity slot`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI_NOT_CONFIGURED" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: TripPlanRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "INVALID_REQUEST" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { destination, budget, currency, startDate, endDate, travelersCount, interests, places } = body;

  const duration      = getTripDuration(startDate, endDate);
  const dailyBudget   = (budget / Math.max(duration, 1)).toFixed(0);
  const interestsList = interests.length > 0 ? interests.join(", ") : "general sightseeing";
  const dayDates      = getDayDates(startDate, duration);

  let prompt: string;
  let groundedWithPlaces = false;
  // More tokens for longer trips; cap at 4000 (includes alternatives per day)
  const baseTokens = Math.min(4000, 800 + duration * 240);

  if (places && places.length > 0) {
    const selected    = selectPlacesForPrompt(places, interests);
    const placesBlock = formatPlacesForPrompt(selected);
    prompt = buildGroundedPrompt({
      destination, budget, currency, duration, dailyBudget, travelersCount, interestsList, placesBlock, dayDates,
    });
    groundedWithPlaces = true;
  } else {
    prompt = buildGenericPrompt({
      destination, budget, currency, duration, dailyBudget, travelersCount, interestsList, dayDates,
    });
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "google/gemma-7b",
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: baseTokens,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
        "X-Grounded-With-Places": groundedWithPlaces ? "1" : "0",
      },
    });
  } catch (err) {
    console.error("Trip plan error:", err);
    return new Response(JSON.stringify({ error: "AI_API_ERROR" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
