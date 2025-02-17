"use client"
import { useContext } from "react";
import { AsteroidsContext } from "@/context/AsteroidContext";
import FavoriteAsteroidItem from "./item";

export default function FavoritesList() {
    const { state } = useContext(AsteroidsContext);

    return (
        <div className="space-y-3">
            {state.favorites.length > 0 ? (
                state.favorites.map((asteroid) => (
                    <FavoriteAsteroidItem key={asteroid.asteroidId} asteroid={asteroid} />
                ))
            ) : (
                <p className="text-center text-gray-500">No favorite asteroids saved.</p>
            )}
        </div>
    );
}
