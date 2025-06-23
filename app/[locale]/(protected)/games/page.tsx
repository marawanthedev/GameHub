"use client"
import React, { Suspense, useDeferredValue, useState } from 'react'
import GamesList from './components/GameList'
import GameActions from './components/GameActions'
import { MemoizedGameActionsSkeleton } from './components/GameActionSkeleton'
import { MemoizedGamesListSkeleton } from './components/GameListSkeleton'
// import ErrorBoundaryWrapper from '@/app/components/ErrorBoundaryWrapper'

const MemoizedGamesList = React.memo(GamesList);

export default function GamesPage() {
    const [selectedPlatformId, setSelectedPlatformId] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const deferredSearchQuery = useDeferredValue(searchQuery);

    return (
        <div className="min-h-screen bg-[#0d1117] text-white px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Discover Games</h1>

                <Suspense fallback={<MemoizedGameActionsSkeleton />}>
                    <GameActions selectedPlatformId={selectedPlatformId} setSelectedPlatformId={setSelectedPlatformId} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Suspense>

                <Suspense fallback={<MemoizedGamesListSkeleton />}>
                    {/* wrapping games  could be useful but in our case its not since that all errors within it are async so they wont crash nor be caught by the error boundary thats why we have global error listenrs to at least let the user know that smth went wrong (same applies to game actions) */}
                    {/* <ErrorBoundaryWrapper> */}
                    <MemoizedGamesList selectedPlatformId={selectedPlatformId} searchQuery={deferredSearchQuery} />
                    {/* </ErrorBoundaryWrapper> */}
                </Suspense>
            </div >
        </div >
    )
}
