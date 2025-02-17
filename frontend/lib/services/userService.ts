"use server";
import { Asteroid } from "../types/asteroids";
import { UserFavorite } from "../types/users";

export async function getFavoritesAction(): Promise<UserFavorite> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function addFavoriteAction(
  asteroid: Asteroid["id"]
): Promise<UserFavorite> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/favorites`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asteroid),
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to add favorite");
  }
  return res.json();
}

export async function removeFavoriteAction(
  asteroidId: string
): Promise<UserFavorite> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/favorites/${asteroidId}`,
    {
      method: "DELETE",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to remove favorite");
  }
  return res.json();
}
