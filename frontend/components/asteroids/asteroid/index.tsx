"use client";

import { Asteroid as AsteroidType } from "@/types/asteroids";
import Link from "next/link";
import Image from "next/image";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import FavoriteButton from "@/components/ui/favorite";
import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { AsteroidsContext } from "@/context/AsteroidContext";

type AsteroidItemProps = {
    asteroid: AsteroidType;
};

export default function AsteroidCard({ asteroid }: AsteroidItemProps) {
    const { state } = useContext(AsteroidsContext);
    const isFavorited = state.favorites.some((fav) => fav.asteroidId === asteroid.id);

    return (
        <Accordion type="single" collapsible className="mb-4">
            <AccordionItem
                value={asteroid.id}
                className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-xl"
            >
                <AccordionTrigger className="flex flex-col md:flex-row justify-between items-center w-full text-left">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/asteroid.svg"
                            alt="Asteroid"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-bold text-blue-800">
                            {asteroid.name}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Magnitude: {asteroid.absolute_magnitude_h}
                    </p>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-3 border-t">
                        <p>
                            <strong>Estimated Diameter:</strong>{" "}
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                                2
                            )}{" "}
                            –{" "}
                            {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                                2
                            )}{" "}
                            km
                        </p>
                        <p className="text-sm text-gray-600">
                            Magnitude: {asteroid.absolute_magnitude_h}
                        </p>
                        <p>
                            <strong>Potentially Hazardous:</strong>{" "}
                            {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Close Approach:</strong>{" "}
                            {asteroid.close_approach_data[0].close_approach_date_full}
                        </p>
                        <p>
                            <strong>Miss Distance:</strong>{" "}
                            {parseFloat(
                                asteroid.close_approach_data[0].miss_distance.kilometers
                            ).toLocaleString()}{" "}
                            km
                        </p>
                        <p>
                            <strong>Relative Velocity:</strong>{" "}
                            {parseFloat(
                                asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
                            ).toLocaleString()}{" "}
                            km/h
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        <FavoriteButton asteroid={asteroid} isFavorited={isFavorited} />
                        <Link
                            href={`/asteroids/${asteroid.id}`}
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                            <PlusCircle className="h-5 w-5" />
                            <span>View Details</span>
                        </Link>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
