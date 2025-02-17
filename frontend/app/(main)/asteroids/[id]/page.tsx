import { fetchAsteroidById } from "@/services/asteroidService";
import { ApiResponseWrapper, AsteroidDetail } from "@/types/asteroids";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function AsteroidDetailPage({ params }: PageProps) {
    const { id } = await params;
    let asteroid: ApiResponseWrapper<AsteroidDetail> | null = null;

    try {
        asteroid = await fetchAsteroidById(id);
    } catch (error) {
        console.error(error);
        notFound();
    }
    if (!asteroid) notFound();

    console.log('asteroid', asteroid);

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-bold text-center md:text-left">{asteroid?.data.name || "N/A"}</h1>
                <p className="text-gray-600 text-center md:text-left">{asteroid?.data.id || "N/A"}</p>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">General Information</h2>
                <p><strong>Absolute Magnitude:</strong> {asteroid?.data.absolute_magnitude_h ?? "N/A"}</p>
                <p><strong>Potentially Hazardous:</strong> {asteroid?.data.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
                <p><strong>Is Sentry Object:</strong> {asteroid?.data.is_sentry_object ? "Yes" : "No"}</p>
                <p><strong>NASA JPL URL:</strong>
                    {asteroid?.data.nasa_jpl_url ? (
                        <a href={asteroid?.data.nasa_jpl_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {asteroid?.data.nasa_jpl_url}
                        </a>
                    ) : "N/A"}
                </p>
            </section>
            <section>
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Close Approach Data</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Miss Distance (km)</th>
                                <th className="border p-2 text-left">Relative Velocity (km/h)</th>
                                <th className="border p-2 text-left">Orbiting Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asteroid?.data.close_approach_data?.map((cad, idx) => (
                                <tr key={idx} className="odd:bg-gray-50">
                                    <td className="border p-2">{cad.close_approach_date_full || "N/A"}</td>
                                    <td className="border p-2">{cad.miss_distance?.kilometers
                                        ? parseFloat(cad.miss_distance.kilometers).toLocaleString()
                                        : "N/A"}</td>
                                    <td className="border p-2">{cad.relative_velocity?.kilometers_per_hour
                                        ? parseFloat(cad.relative_velocity.kilometers_per_hour).toLocaleString()
                                        : "N/A"}</td>
                                    <td className="border p-2">{cad.orbiting_body || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Orbital Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                </div>
            </section>
        </div>
    );
}
