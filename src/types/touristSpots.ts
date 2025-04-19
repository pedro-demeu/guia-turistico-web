export interface TouristSpot {
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date | null;
}
