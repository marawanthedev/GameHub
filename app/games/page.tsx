


"use client"
import React, { Suspense, useDeferredValue, useEffect, useState } from 'react'
import GamesList from './components/GameList'
import GamesListSkeleton from './components/GameListSkeleton'
import GameActions from './components/GameActions'
import GameActionsSkeleton from './components/GameActionSkeleton'


const MemoizedGamesList = React.memo(GamesList);

export default function GamesPage() {
    const [selectedPlatformId, setSelectedPlatformId] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")

    const deferredSearchQuery = useDeferredValue(searchQuery);

    // get platforms
    // get games
    // get paginated games
    // get paginated games with platform
    // search games, debounced 

    useEffect(() => {
        console.log('searchQuery changed:', searchQuery);
    }, [searchQuery])


    return (
        <div className="min-h-screen bg-[#0d1117] text-white px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Discover Games</h1>

                {/* Filters */}
                <Suspense fallback={<GameActionsSkeleton />}>
                    <GameActions selectedPlatformId={selectedPlatformId} setSelectedPlatformId={setSelectedPlatformId} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Suspense>

                <Suspense fallback={<GamesListSkeleton />}>
                    <MemoizedGamesList selectedPlatformId={selectedPlatformId} searchQuery={deferredSearchQuery} />
                </Suspense>
            </div >
        </div >
    )
}
