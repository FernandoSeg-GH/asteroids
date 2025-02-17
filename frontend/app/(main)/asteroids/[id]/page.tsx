import { fetchAsteroidById } from "@/lib/services/asteroidService";
import { AsteroidDetail } from "@/lib/types/asteroids";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        id: string
    }>
};

export default async function AsteroidDetailPage({ params }: PageProps) {

    const { id } = await params;
    let asteroid: AsteroidDetail | null = null;
    try {
        asteroid = await fetchAsteroidById(id);
    } catch (error) {
        console.error(error)
        notFound();
    }
    if (!asteroid) notFound();
    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-bold">{asteroid.name || ""}</h1>
                <p className="text-gray-600">{asteroid.designation || ""}</p>
            </header>

            <section className="space-y-2">
                <h2 className="text-2xl font-semibold border-b pb-2">General Information</h2>
                <p>
                    <strong>Absolute Magnitude:</strong> {asteroid.absolute_magnitude_h ?? ""}
                </p>
                <p>
                    <strong>Potentially Hazardous:</strong>{" "}
                    {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Is Sentry Object:</strong>{" "}
                    {asteroid.is_sentry_object ? "Yes" : "No"}
                </p>
                <p>
                    <strong>NASA JPL URL:</strong>{" "}
                    {asteroid.nasa_jpl_url ? (
                        <a
                            href={asteroid.nasa_jpl_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {asteroid.nasa_jpl_url}
                        </a>
                    ) : (
                        ""
                    )}
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-2xl font-semibold border-b pb-2">Estimated Diameter</h2>
                <p>
                    <strong>Kilometers:</strong>{" "}
                    {asteroid.estimated_diameter?.kilometers
                        ? `${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} – ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`
                        : ""}
                </p>
                <p>
                    <strong>Meters:</strong>{" "}
                    {asteroid.estimated_diameter?.meters
                        ? `${asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} – ${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m`
                        : ""}
                </p>
                <p>
                    <strong>Miles:</strong>{" "}
                    {asteroid.estimated_diameter?.miles
                        ? `${asteroid.estimated_diameter.miles.estimated_diameter_min.toFixed(2)} – ${asteroid.estimated_diameter.miles.estimated_diameter_max.toFixed(2)} mi`
                        : ""}
                </p>
                <p>
                    <strong>Feet:</strong>{" "}
                    {asteroid.estimated_diameter?.feet
                        ? `${asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(2)} – ${asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(2)} ft`
                        : ""}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
                    Close Approach Data
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Miss Distance (km)</th>
                                <th className="border p-2 text-left">Relative Velocity (km/h)</th>
                                <th className="border p-2 text-left">Orbiting Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asteroid.close_approach_data?.map((cad, idx) => (
                                <tr key={idx} className="odd:bg-gray-50">
                                    <td className="border p-2">{cad.close_approach_date_full || ""}</td>
                                    <td className="border p-2">
                                        {cad.miss_distance?.kilometers
                                            ? parseFloat(cad.miss_distance.kilometers).toLocaleString()
                                            : ""}
                                    </td>
                                    <td className="border p-2">
                                        {cad.relative_velocity?.kilometers_per_hour
                                            ? parseFloat(cad.relative_velocity.kilometers_per_hour).toLocaleString()
                                            : ""}
                                    </td>
                                    <td className="border p-2">{cad.orbiting_body || ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Orbital Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Orbit ID:</strong> {asteroid.orbital_data?.orbit_id || ""}
                    </p>
                    <p>
                        <strong>Orbit Determination Date:</strong>{" "}
                        {asteroid.orbital_data?.orbit_determination_date || ""}
                    </p>
                    <p>
                        <strong>First Observation:</strong>{" "}
                        {asteroid.orbital_data?.first_observation_date || ""}
                    </p>
                    <p>
                        <strong>Last Observation:</strong>{" "}
                        {asteroid.orbital_data?.last_observation_date || ""}
                    </p>
                    <p>
                        <strong>Data Arc (days):</strong>{" "}
                        {asteroid.orbital_data?.data_arc_in_days || ""}
                    </p>
                    <p>
                        <strong>Observations Used:</strong>{" "}
                        {asteroid.orbital_data?.observations_used || ""}
                    </p>
                    <p>
                        <strong>Orbit Uncertainty:</strong>{" "}
                        {asteroid.orbital_data?.orbit_uncertainty || ""}
                    </p>
                    <p>
                        <strong>Minimum Orbit Intersection:</strong>{" "}
                        {asteroid.orbital_data?.minimum_orbit_intersection || ""}
                    </p>
                    <p>
                        <strong>Jupiter Tisserand:</strong>{" "}
                        {asteroid.orbital_data?.jupiter_tisserand_invariant || ""}
                    </p>
                    <p>
                        <strong>Eccentricity:</strong>{" "}
                        {asteroid.orbital_data?.eccentricity || ""}
                    </p>
                    <p>
                        <strong>Semi-Major Axis:</strong>{" "}
                        {asteroid.orbital_data?.semi_major_axis || ""}
                    </p>
                    <p>
                        <strong>Inclination:</strong>{" "}
                        {asteroid.orbital_data?.inclination || ""}
                    </p>
                    <p>
                        <strong>Ascending Node Longitude:</strong>{" "}
                        {asteroid.orbital_data?.ascending_node_longitude || ""}
                    </p>
                    <p>
                        <strong>Orbital Period:</strong>{" "}
                        {asteroid.orbital_data?.orbital_period || ""}
                    </p>
                    <p>
                        <strong>Perihelion Distance:</strong>{" "}
                        {asteroid.orbital_data?.perihelion_distance || ""}
                    </p>
                    <p>
                        <strong>Perihelion Argument:</strong>{" "}
                        {asteroid.orbital_data?.perihelion_argument || ""}
                    </p>
                    <p>
                        <strong>Aphelion Distance:</strong>{" "}
                        {asteroid.orbital_data?.aphelion_distance || ""}
                    </p>
                    <p>
                        <strong>Perihelion Time:</strong>{" "}
                        {asteroid.orbital_data?.perihelion_time || ""}
                    </p>
                    <p>
                        <strong>Mean Anomaly:</strong>{" "}
                        {asteroid.orbital_data?.mean_anomaly || ""}
                    </p>
                    <p>
                        <strong>Mean Motion:</strong>{" "}
                        {asteroid.orbital_data?.mean_motion || ""}
                    </p>
                    <p>
                        <strong>Equinox:</strong>{" "}
                        {asteroid.orbital_data?.equinox || ""}
                    </p>
                    <p>
                        <strong>Orbit Class:</strong>{" "}
                        {asteroid.orbital_data?.orbit_class
                            ? `${asteroid.orbital_data.orbit_class.orbit_class_type} - ${asteroid.orbital_data.orbit_class.orbit_class_description}`
                            : ""}
                    </p>
                </div>
            </section>
        </div>
    );
}
