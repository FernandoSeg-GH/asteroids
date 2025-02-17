import {
  Asteroid,
  ApiResponseWrapper,
  AsteroidDetail,
  AsteroidsData,
} from "@/types/asteroids";

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function fetchAsteroids(
  startDate: string,
  endDate: string
): Promise<Asteroid[]> {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_API_URL}/asteroids?start_date=${startDate}&end_date=${endDate}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch asteroids: ${res.status} ${res.statusText}`
      );
    }

    const response: ApiResponseWrapper<AsteroidsData> = await res.json();

    if (!response || !response.success || !response.data) {
      throw new Error("Invalid API response: data is missing");
    }

    const asteroidsArray = Object.values(
      response.data.near_earth_objects
    ).flat();
    return asteroidsArray;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

export async function fetchAsteroidById(
  id: string
): Promise<ApiResponseWrapper<AsteroidDetail>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/asteroids/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch asteroid details: ${res.statusText}`);
    }

    const response: ApiResponseWrapper<AsteroidDetail> = await res.json();
    return response;
  } catch (error) {
    console.error("Error fetching asteroid by ID:", error);
    throw error;
  }
}
