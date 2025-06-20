'use client'

import { useEffect, useState } from 'react'

export default function GamesListPage() {
    const [loading, setLoading] = useState(true)

    const games = [
        {
            id: 1,
            title: 'Cyberpunk 2077',
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
            genres: ['RPG', 'Action'],
            platforms: ['PC', 'PS5', 'Xbox'],
        },
        {
            id: 2,
            title: 'The Witcher 3: Wild Hunt',
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',

            genres: ['RPG', 'Fantasy'],
            platforms: ['PC', 'Switch'],
        },
        {
            id: 3,
            title: 'Elden Ring',
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
            genres: ['Souls-like', 'Action'],
            platforms: ['PC', 'PS5'],
        },
    ]

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#f5f6f8] px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1f23] mb-6">
                    Discover Games
                </h1>

                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-4 text-black">
                    <input
                        type="text"
                        placeholder="Search games..."
                        className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-72 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-48 focus:ring-blue-500 focus:border-blue-500">
                        <option>All Platforms</option>
                        <option>PC</option>
                        <option>PlayStation</option>
                        <option>Xbox</option>
                    </select>
                </div>

                {/* Game Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
                            >
                                <div className="w-full h-48 bg-gray-300" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 w-3/4 bg-gray-300 rounded" />
                                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                                    <div className="flex gap-2">
                                        <div className="h-4 w-16 bg-gray-300 rounded-full" />
                                        <div className="h-4 w-16 bg-gray-300 rounded-full" />
                                    </div>
                                    <div className="h-10 w-full bg-gray-300 rounded-lg mt-4" />
                                </div>
                            </div>
                        ))
                        : games.map((game) => (
                            <div
                                key={game.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-xl font-semibold text-[#1b1f23]">
                                        {game.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {game.genres.join(', ')}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {game.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                                            >
                                                {platform}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
