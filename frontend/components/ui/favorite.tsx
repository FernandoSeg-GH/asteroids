"use client";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { addFavoriteAction, removeFavoriteAction } from "@/lib/services/userService";
import { useToast } from "@/hooks/use-toast";
import { Asteroid } from "@/lib/types/asteroids";
import { AsteroidsContext } from "@/context/AsteroidContext";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
    asteroid: Asteroid;
    isFavorited?: boolean;
};

export default function FavoriteButton({ asteroid, isFavorited = false }: FavoriteButtonProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { dispatch } = useContext(AsteroidsContext);

    const handleFavorite = async () => {
        setLoading(true);
        try {
            if (isFavorited) {
                await removeFavoriteAction(asteroid.id);
                dispatch({ type: "REMOVE_FAVORITE", payload: asteroid.id });
                toast({ title: "Removed from favorites" });
            } else {
                await addFavoriteAction(String(asteroid));
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
                <>
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    <span>Remove</span>
                </>
            ) : (
                <>
                    <Heart className="h-5 w-5" />
                    <span>Add</span>
                </>
            )}
        </Button>
    );
}
