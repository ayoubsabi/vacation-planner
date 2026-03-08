export type PlaceFilter = "restaurant" | "explore" | "shop" | "stay" | "cafe" | "bar";

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  rating?: number;       // Foursquare scale: 0–10
  priceLevel?: 1 | 2 | 3 | 4;
  isOpenNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
  filter: PlaceFilter;
}
