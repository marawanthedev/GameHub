
import { BarChartComponent, PieChartComponent } from "@/app/components";
import ErrorBoundaryWrapper from "@/app/components/ErrorBoundaryWrapper";
import { getGenreDistribution2024, getPlatformUsage2024, getTopRatedGames2024 } from "@/app/lib/rawg-data";

export default async function TrendsPage() {

    const [topRated, genres, platforms] = await Promise.all([
        getTopRatedGames2024(),
        getGenreDistribution2024(),
        getPlatformUsage2024(),
    ]) as [
            { name: string, rating: number }[],
            { name: string; value: number }[],
            { platform: string, count: number }[]
        ];


    return <><main className="min-h-screen bg-[#0d1117] text-white px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-16">
            <h1 className="text-4xl font-bold text-white">Game Analytics</h1>

            {/* Top Rated Games Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Top Rated Games (2024)
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                    <ErrorBoundaryWrapper>
                        <BarChartComponent barProps={{
                            dataKey: 'rating', label: {
                                position: 'top',
                                fill: 'white',
                                fontSize: 12,
                            }
                        }} xAxisProps={{ dataKey: "name", angle: 90, fontSize: 12, interval: 0 }} data={topRated} height={400} uniformColor="blue" />
                    </ErrorBoundaryWrapper>
                </div>
            </section>

            {/* Genre Distribution Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Genre Distribution
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                    <ErrorBoundaryWrapper>
                        <PieChartComponent<{ name: string, value: number }> height={400} biggestPieColor="red" smallestPieColor="yellow" pieProps={{ data: genres, dataKey: "value" }} toolTipProps={{ contentStyle: { backgroundColor: 'blue', border: 'none', color: 'white', fontSize: "14px" }, }} />
                    </ErrorBoundaryWrapper>
                </div>
            </section>

            {/* Top Platforms Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Top Platforms
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">

                    <ErrorBoundaryWrapper>

                        <BarChartComponent<{ platform: string, count: number }> barProps={{
                            dataKey: 'count', label: {
                                position: 'top',
                                fill: 'white',
                                fontSize: 12,
                            }
                        }} xAxisProps={{ dataKey: "platform", angle: 90, fontSize: 12, interval: 0 }} data={platforms} height={400} uniformColor="blue" />
                    </ErrorBoundaryWrapper>
                </div>
            </section>
        </div>
    </main>
    </>
}