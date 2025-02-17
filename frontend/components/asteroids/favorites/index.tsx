"use client"
import { useEffect, useContext, useMemo } from "react";
import { AsteroidsContext } from "@/context/AsteroidContext";
import FavoritesList from "./list/list";

interface FavoritesClientProps {
    initialFavorites: { asteroidId: string }[];
}

export default function FavoritesClient({ initialFavorites }: FavoritesClientProps) {
    const { state, dispatch } = useContext(AsteroidsContext);

    const formattedFavorites = useMemo(() => {
        return initialFavorites.map((asteroid) => ({
            asteroidId: asteroid.asteroidId,
        }));
    }, [initialFavorites]);



    useEffect(() => {
        if (state.favorites.length === 0 && formattedFavorites.length > 0) {
            dispatch({ type: "SET_FAVORITES", payload: formattedFavorites })
        }
    }, [formattedFavorites, state.favorites.length, dispatch]);

    return (
        <div>
            <FavoritesList />
        </div>
    );
}
