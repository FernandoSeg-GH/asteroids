import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { getFavoritesAction, removeFavoriteAction } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { AsteroidsContext } from "@/context/AsteroidContext";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { asteroid: { asteroidId: string } };

export default function FavoriteAsteroidItem({ asteroid }: Props) {

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { dispatch } = useContext(AsteroidsContext);
    const router = useRouter();

    const handleRemove = async () => {
        setLoading(true);

        try {
            await removeFavoriteAction(asteroid.asteroidId);
            dispatch({ type: "REMOVE_FAVORITE", payload: asteroid.asteroidId });
            toast({ title: "Removed from favorites" });

            const updatedFavorites = await getFavoritesAction();
            dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
        } catch (error) {
            toast({ title: `Failed to remove: ${error}` });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm flex-wrap">
            <p className="w-full sm:w-auto">
                Asteroid Id:
                <span className="ml-2 font-semibold">{asteroid.asteroidId}</span>
            </p>
            <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start mt-2 sm:mt-0">
                <Button
                    onClick={handleRemove}
                    disabled={loading}
                    variant="destructive"
                    className="flex items-center gap-1 w-full sm:w-auto"
                >
                    <Trash2 className="h-4 w-4" />
                    <span>{loading ? "Removing..." : "Remove"}</span>
                </Button>
                <Button
                    variant={"default"}
                    disabled={loading}
                    onClick={() => router.push(`/asteroids/${asteroid.asteroidId}`)}
                    className="w-full sm:w-auto"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}
