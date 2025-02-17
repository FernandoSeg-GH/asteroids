"use client";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { addFavoriteAction, removeFavoriteAction } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { Asteroid } from "@/types/asteroids";
import { AsteroidsContext } from "@/context/AsteroidContext";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

type FavoriteButtonProps = {
    asteroid: Asteroid;
    isFavorited?: boolean;
};

export default function FavoriteButton({ asteroid, isFavorited = false }: FavoriteButtonProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { dispatch } = useContext(AsteroidsContext);
    const router = useRouter()

    const handleFavorite = async () => {
        setLoading(true);
        try {
            if (isFavorited) {
                await removeFavoriteAction(asteroid.id);
                dispatch({ type: "REMOVE_FAVORITE", payload: asteroid.id });
                toast({ title: "Removed from favorites" });
                router.push("/favorites")
            } else {
                await addFavoriteAction(String(asteroid.id));
                dispatch({ type: "ADD_FAVORITE", payload: asteroid });
                toast({ title: "Added to favorites" });
            }
        } catch (error) {
            toast({ title: `Failed to update favorite: ${error}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleFavorite} disabled={loading} variant="secondary" className="flex items-center gap-2 w-32">
            {loading ? (
                "Processing..."
            ) : isFavorited ? (
                <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    <span>Remove</span>
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5" />
                    <span>Add</span>
                </div>
            )}
        </Button>
    );
}
