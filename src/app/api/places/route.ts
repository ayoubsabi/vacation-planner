import { NextResponse } from "next/server";
import type { PlaceResult, PlaceFilter } from "@/lib/places";

const YELP_SEARCH_URL = "https://api.yelp.com/v3/businesses/search";

const PRICE_MAP: Record<string, 1 | 2 | 3 | 4> = {
  "$": 1, "$$": 2, "$$$": 3, "$$$$": 4,
};

interface YelpCategory {
  alias: string;
  title: string;
}

interface YelpBusiness {
  id: string;
  name: string;
  image_url?: string;
  rating?: number;
  review_count?: number;
  price?: string;
  is_closed?: boolean;
  categories: YelpCategory[];
  coordinates: { latitude: number; longitude: number };
  location: { address1?: string; city?: string; country?: string };
}

function mapToFilter(categories: YelpCategory[]): PlaceFilter {
  const a = categories.map((c) => c.alias).join(",");
  if (/restaurant|food|pizza|sushi|burger|italian|french|chinese/.test(a)) return "restaurant";
  if (/cafe|coffee|tea|bakery/.test(a)) return "cafe";
  if (/bar|pub|nightlife|cocktail|brewery/.test(a)) return "bar";
  if (/hotel|hostel|lodging|bed_breakfast|resort/.test(a)) return "stay";
  if (/shop|retail|mall|market|fashion|jewelry/.test(a)) return "shop";
  return "explore";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
    return NextResponse.json(
      { error: "INVALID_PARAMS", message: "lat and lng are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "PLACES_NOT_CONFIGURED", message: "Yelp API key not set" },
      { status: 503 }
    );
  }

  try {
    const url = new URL(YELP_SEARCH_URL);
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lng);
    url.searchParams.set("categories", "restaurants,cafes,bars,hotels,arts,shopping,museums,landmarks");
    url.searchParams.set("limit", "50");
    url.searchParams.set("radius", "10000");
    url.searchParams.set("sort_by", "rating");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "PLACES_API_ERROR", message: text },
        { status: 502 }
      );
    }

    const data = await res.json();
    const businesses: YelpBusiness[] = data.businesses ?? [];

    const places: PlaceResult[] = businesses.map((b) => ({
      id: b.id,
      name: b.name,
      address: [b.location.address1, b.location.city].filter(Boolean).join(", "),
      rating: b.rating,
      priceLevel: b.price ? PRICE_MAP[b.price] : undefined,
      isOpenNow: b.is_closed !== undefined ? !b.is_closed : undefined,
      photoUrl: b.image_url || undefined,
      lat: b.coordinates.latitude,
      lng: b.coordinates.longitude,
      filter: mapToFilter(b.categories),
    }));

    return NextResponse.json(
      { places },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    );
  } catch {
    return NextResponse.json(
      { error: "PLACES_API_ERROR", message: "Failed to fetch places" },
      { status: 502 }
    );
  }
}
