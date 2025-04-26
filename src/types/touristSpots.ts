export interface TouristSpot {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export type CreateTouristSpotData = Omit<TouristSpot, "createdAt" | "updatedAt" | "id">;
export type UpdateTouristSpotData = Omit<TouristSpot, "createdAt" | "updatedAt">;