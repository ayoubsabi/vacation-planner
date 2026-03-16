import { NextRequest } from "next/server";
import OpenAI from "openai";
import { getTripDuration } from "@/lib/utils";
import type { PlaceResult, PlaceFilter } from "@/lib/places";

export const runtime = "nodejs";

interface SuggestionsRequest {
  destination: string;
  budget: number;
  currency: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  interests: string[];
  places?: PlaceResult[];
}

// Maps trip interests to relevant PlaceFilter values (for server-side selection)
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
  relevantFilters.delete("stay"); // Never send hotel specifics to AI

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
      lines.push(`  - ${p.name}${parts ? ` (${parts})` : ""}`);
    }
  }
  return lines.join("\n");
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
}): string {
  return `You are a knowledgeable travel advisor. Create a concise, practical travel guide for the following trip:

Destination: ${p.destination}
Duration: ${p.duration} days
Total Budget: ${p.budget} ${p.currency} (${p.dailyBudget} ${p.currency}/day)
Travelers: ${p.travelersCount}
Interests: ${p.interestsList}

The following real, highly-rated places are available near ${p.destination}. Base your recommendations on these actual locations:
${p.placesBlock}

Provide your response in exactly this format:

## Recommended Places
Choose 5 places from the list above that best match the traveler's interests and budget. For each: name, one sentence on why it fits, and estimated cost per person in ${p.currency}.

## Daily Budget Breakdown
Suggest how to split the ${p.dailyBudget} ${p.currency} daily budget across: accommodation, food, activities, transport. Reference price levels from the list where relevant.

## Practical Tips
Give 3 specific, actionable tips for ${p.destination} based on the places listed and the interests.

## Local Picks
Highlight 2–3 standout choices from the list that a local would recommend — explain briefly why they are worth visiting.

Keep the response focused, specific to ${p.destination}, and budget-conscious.`;
}

function buildGenericPrompt(p: {
  destination: string;
  budget: number;
  currency: string;
  duration: number;
  dailyBudget: string;
  travelersCount: number;
  interestsList: string;
}): string {
  return `You are a knowledgeable travel advisor. Create a concise, practical travel guide for the following trip:

Destination: ${p.destination}
Duration: ${p.duration} days
Total Budget: ${p.budget} ${p.currency} (${p.dailyBudget} ${p.currency}/day)
Travelers: ${p.travelersCount}
Interests: ${p.interestsList}

Provide your response in exactly this format:

## Top Activities
List 5 must-do activities that match the traveler's interests. For each: name, brief description, and estimated cost per person in ${p.currency}.

## Daily Budget Breakdown
Suggest how to split the ${p.dailyBudget} ${p.currency} daily budget across: accommodation, food, activities, transport.

## Practical Tips
Give 3 specific, actionable tips for this destination that match the interests listed.

## Hidden Gems
Mention 2 lesser-known spots or experiences that match the interests.

Keep the response focused, specific to ${p.destination}, and budget-conscious.`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI_NOT_CONFIGURED" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: SuggestionsRequest;
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

  let prompt: string;
  let groundedWithPlaces = false;
  let maxTokens = 800;

  if (places && places.length > 0) {
    const selected    = selectPlacesForPrompt(places, interests);
    const placesBlock = formatPlacesForPrompt(selected);
    prompt = buildGroundedPrompt({
      destination, budget, currency, duration, dailyBudget, travelersCount, interestsList, placesBlock,
    });
    groundedWithPlaces = true;
    maxTokens = 1100;
  } else {
    prompt = buildGenericPrompt({
      destination, budget, currency, duration, dailyBudget, travelersCount, interestsList,
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
      max_tokens: maxTokens,
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
    console.error("AI suggestions error:", err);
    return new Response(JSON.stringify({ error: "AI_API_ERROR" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
