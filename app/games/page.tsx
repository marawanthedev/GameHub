'use client'

import Image from 'next/image'
import Link from 'next/link'
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
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

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

                {/* Game Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow animate-pulse overflow-hidden"
                            >
                                <div className="w-full h-48 bg-[#21262d]" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 w-3/4 bg-[#21262d] rounded" />
                                    <div className="h-4 w-1/2 bg-[#21262d] rounded" />
                                    <div className="flex gap-2">
                                        <div className="h-4 w-16 bg-[#21262d] rounded-full" />
                                        <div className="h-4 w-16 bg-[#21262d] rounded-full" />
                                    </div>
                                    <div className="h-10 w-full bg-[#30363d] rounded-lg mt-4" />
                                </div>
                            </div>
                        ))
                        : games.map((game) => (
                            <Link
                                key={game.id}
                                href={`/games/${game.id}`}
                                className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`View details for ${game.title}`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 space-y-2">
                                    <h2 className="text-xl font-semibold">{game.title}</h2>
                                    <p className="text-sm text-gray-400">
                                        {game.genres.join(', ')}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {game.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full"
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
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
