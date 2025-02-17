import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Main from "@/components/asteroids/index";
import { Asteroid } from "@/types/asteroids";
import authOptions from "../api/auth/authOptions";
import { fetchAsteroids } from "@/services/asteroidService";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const defaultStartDate = yesterday.toISOString().split("T")[0];
const defaultEndDate = today.toISOString().split("T")[0];

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  let asteroids: Asteroid[] = [];
  try {
    asteroids = await fetchAsteroids(defaultStartDate, defaultEndDate);
  } catch (error) {
    console.error("Error in server component:", error);
  }

  return <Main initialAsteroids={asteroids} />;
}
