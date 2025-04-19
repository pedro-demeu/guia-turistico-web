import { TouristSpot } from "../types/touristSpots";

const TOURIST_SPOT_ENDPOINT = "http://localhost:8080/v1/tourist-spots";

export function useTouristSpots() {
  const create = async (data: TouristSpot) => {
    try {
      const response = await fetch(TOURIST_SPOT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res: TouristSpot = await response.json();
      return res;
    } catch (err) {
      console.error("Erro ao criar ponto turistico", { err });
    }
  };
  const update = async (id: number, data: TouristSpot) => {
    const ENDPOINT = `${TOURIST_SPOT_ENDPOINT}/${id}`;

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
