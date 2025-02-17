import Main from "@/components/asteroids";
import { fetchAsteroids } from "@/lib/services/asteroidService";
import { Asteroid } from "@/lib/types/asteroids";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const defaultStartDate = yesterday.toISOString().split("T")[0];
const defaultEndDate = today.toISOString().split("T")[0];

export default async function HomePage() {
  let asteroids: Asteroid[] = [];
  try {
    asteroids = await fetchAsteroids(defaultStartDate, defaultEndDate);
  } catch (error) {
    console.error("Error in server component:", error);
  }

  return <Main initialAsteroids={asteroids} />;
}
