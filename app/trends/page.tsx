export default function TrendsPage() {

    return <><main className="min-h-screen bg-[#0d1117] text-white px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-16">
            <h1 className="text-4xl font-bold text-white">Game Analytics</h1>

            {/* Top Rated Games Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Top Rated Games (2024)
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                    {/* <BarChart /> */}
                    bar chat
                </div>
            </section>

            {/* Genre Distribution Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Genre Distribution
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                    {/* <PieChart /> */}
                    pie chart
                </div>
            </section>

            {/* Top Platforms Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-blue-400 border-b border-[#30363d] pb-2">
                    Top Platforms
                </h2>
                <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg border border-[#30363d]">
                    {/* <RadarChart /> */}
                    radar chart
                </div>
            </section>
        </div>
    </main>
    </>
}