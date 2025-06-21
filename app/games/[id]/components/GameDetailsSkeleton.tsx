export function GameDetailsSkeleton() {
    return (
        <main className="min-h-screen animate-pulse bg-[#0d1117] text-white">
            <div className="relative h-screen bg-[#161b22]" />
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-10">
                <div className="h-6 w-40 bg-[#21262d] rounded" />
                <div className="h-4 w-3/4 bg-[#21262d] rounded" />
                <div className="h-8 w-24 bg-[#30363d] rounded" />
                <div className="flex gap-2 mt-4">
                    <div className="h-6 w-20 bg-[#21262d] rounded-full" />
                    <div className="h-6 w-24 bg-[#21262d] rounded-full" />
                    <div className="h-6 w-16 bg-[#21262d] rounded-full" />
                </div>
            </div>
        </main>
    );
}
