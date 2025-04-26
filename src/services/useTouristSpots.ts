import { CreateTouristSpotData, TouristSpot, UpdateTouristSpotData } from "../types/touristSpots";

const TOURIST_SPOT_ENDPOINT = "http://localhost:8080/v1/tourist-spots";

export function useTouristSpots() {
  const create = async (data: CreateTouristSpotData) => {
    try {
      const response = await fetch(TOURIST_SPOT_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res: TouristSpot = await response.json();
      return res;
    } catch (err) {
      console.error("Erro ao criar ponto turistico", { err });
    }
  };
  const update = async (data: UpdateTouristSpotData) => {
    const ENDPOINT = `${TOURIST_SPOT_ENDPOINT}/${data.id}`;

    try {
        const response = await fetch(ENDPOINT, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const res: TouristSpot = await response.json();
        return res;
      } catch (err) {
        console.error("Erro ao  ponto turistico", { err });
      }
  };

  return {
    create,
    update,
  };
}
