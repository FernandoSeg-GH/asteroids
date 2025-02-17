
import authOptions from "@/app/api/auth/authOptions";
import FavoritesClient from "@/components/asteroids/favorites";
import { getFavoritesAction } from "@/services/userService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    let favorites: { asteroidId: string }[] = [];
    let isLoading = true;
    let errorMessage = "";

    try {
        favorites = await getFavoritesAction();
        isLoading = false;
    } catch (error) {
        console.error("Failed to load favorites:", error);
        errorMessage = error instanceof Error ? error.message : "Unknown error";
        isLoading = false;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Favorites</h1>

            {isLoading ? (
                <p>Loading favorites...</p>
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <FavoritesClient initialFavorites={favorites} />
            )}
        </div>
    );
}
