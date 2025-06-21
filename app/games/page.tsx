


import { Suspense } from 'react'
import GamesList from './components/list'
import GamesListSkeleton from './components/skeleton'

export default function GamesPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-white px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">Discover Games</h1>

                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search games..."
                        className="px-4 py-2 rounded-lg border border-[#30363d] bg-[#161b22] text-white w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 rounded-lg border border-[#30363d] bg-[#161b22] text-white w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Platforms</option>
                        <option>PC</option>
                        <option>PlayStation</option>
                        <option>Xbox</option>
                    </select>
                </div>

                <Suspense fallback={<GamesListSkeleton />}>
                    <GamesList />
                </Suspense>
            </div>
        </div>
    )
}
