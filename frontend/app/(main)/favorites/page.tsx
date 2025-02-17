import FavoritesList from "@/components/asteroids/favorites";
import { getFavoritesAction } from "@/lib/services/userService";


export default async function FavoritesPage() {
    let user;
    try {
        user = await getFavoritesAction();
    } catch (error) {
        console.error("Failed to load favorites:", error);
        user = { favorites: [] };
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
            {user.favorites && user.favorites.length > 0 ? (
                <FavoritesList favorites={user.favorites} />
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
}
