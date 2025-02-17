import { Asteroid } from "@/lib/types/asteroids";
import AsteroidCard from "../asteroid";


type FavoritesListProps = {
    favorites: Asteroid[];
};

export default function FavoritesList({ favorites }: FavoritesListProps) {
    return (
        <div className="space-y-4">
            {favorites.length > 0 ? favorites.map((asteroid) => (
                <AsteroidCard key={asteroid.id} asteroid={asteroid} />
            )) : (
                <p className="text-center text-gray-500">No favorite asteroids saved.</p>
            )
            }
        </div>
    );
}
