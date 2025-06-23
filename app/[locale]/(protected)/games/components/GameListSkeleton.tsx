import React from "react"

export default function GamesListSkeleton() {
    return (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow p-4 space-y-4">
                    <div className="h-48 bg-[#21262d] rounded" />
                    <div className="h-6 w-3/4 bg-[#21262d] rounded" />
                    <div className="h-4 w-1/2 bg-[#21262d] rounded" />
                    <div className="flex gap-2">
                        <div className="h-5 w-16 bg-[#21262d] rounded-full" />
                        <div className="h-5 w-16 bg-[#21262d] rounded-full" />
                    </div>
                </div>
            ))}
        </main>
    )
}

// good candidate for memo as we have lots of pagination and on filter changes that are possible
export const MemoizedGamesListSkeleton = React.memo(GamesListSkeleton)