"use client";
import { useEffect, useContext, useState } from "react";
import { Asteroid as AsteroidType } from "@/types/asteroids";
import { Skeleton } from "@/components/ui/skeleton";
import { AsteroidsContext } from "@/context/AsteroidContext";
import SearchForm from "./search";
import AsteroidCard from "./asteroid";
import { fetchAsteroids } from "@/services/asteroidService";

type MainProps = {
    initialAsteroids: AsteroidType[];
};

export default function Main({ initialAsteroids }: MainProps) {
    const { state, dispatch } = useContext(AsteroidsContext);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        if (initialAsteroids.length > 0) {
            dispatch({ type: "SET_ASTEROIDS", payload: initialAsteroids });
        }
    }, [initialAsteroids, dispatch]);


    const handleSearch = async (startDate: string, endDate: string) => {
        try {
            setLoading(true);
            const asteroidsArray = await fetchAsteroids(startDate, endDate);
            dispatch({ type: "SET_ASTEROIDS", payload: asteroidsArray });
        } catch (error) {
            console.error("Error during search:", error);
        } finally {
            setLoading(false);
        }
    };

    const sortedAsteroids = state.asteroids.slice().sort((a, b) =>
        sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );

    return (
        <div className="container max-w-lg mx-auto p-4">
            <SearchForm onSearch={handleSearch} />

            <div className="mb-4 flex items-center justify-end gap-2">
                <label htmlFor="sortOrder" className="font-semibold">
                    Sort by:
                </label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                    className="p-2 border rounded text-sm font-medium"
                >
                    <option value="asc">Name: A–Z</option>
                    <option value="desc">Name: Z–A</option>
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {Array.from({ length: 42 }).map((_, index) => (
                        <Skeleton key={index} className="h-20 w-full rounded" />
                    ))}
                </div>
            ) : sortedAsteroids.length > 0 ? (
                sortedAsteroids.map((asteroid) => (
                    <AsteroidCard key={asteroid.id} asteroid={asteroid} />
                ))
            ) : (
                <p className="text-center text-gray-500">No asteroids found.</p>
            )}
        </div>
    );
}
