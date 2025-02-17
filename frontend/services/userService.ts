"use server";
import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`  Registration failed: ${data.error || res.statusText}`);
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`  Login failed: ${data.error || res.statusText}`);
  }

  return data;
}

export async function getFavoritesAction(): Promise<{ asteroidId: string }[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/favorites`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to fetch favorites. Status:", res.status, data.error);
    throw new Error(data.error || "Failed to fetch user favorites");
  }

  if (!data.success || !data.data) {
    throw new Error("Invalid response from backend");
  }

  return data.data;
}

export async function addFavoriteAction(asteroidId: string): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
      },
      body: JSON.stringify({ asteroidId }),
    }
  );

  if (!res.ok) throw new Error("Failed to add favorite");
}

export async function removeFavoriteAction(asteroidId: string): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/favorites/${asteroidId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: session.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to remove favorite");
}
