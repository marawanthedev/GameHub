'use client'

import { useEffect, useState } from 'react'

export default function GameDetailsPage() {
    const [loading, setLoading] = useState(true)

    const game = {
        id: 1,
        title: 'Elden Ring',
        price: 59.99,
        image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        description:
            'Elden Ring is an action RPG developed by FromSoftware. Explore a vast, hauntingly beautiful world filled with mystery, danger, and powerful enemies.',
        genres: ['Action', 'Souls-like', 'RPG'],
        platforms: ['PC', 'PS5', 'Xbox'],
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000) // simulate loading
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen animate-pulse bg-[#f4f6f8]">
                <div className="relative h-screen bg-gray-300" />
                <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-12">
                    <div className="h-6 w-40 bg-gray-300 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-20 bg-gray-300 rounded-full" />
                        <div className="h-6 w-24 bg-gray-300 rounded-full" />
                        <div className="h-6 w-16 bg-gray-300 rounded-full" />
                    </div>

                    <div className="h-6 w-40 bg-gray-300 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-20 bg-gray-300 rounded-full" />
                        <div className="h-6 w-24 bg-gray-300 rounded-full" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f4f6f8] text-[#1b1f23]">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                <img
                    src={game.image}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#f4f6f8] via-transparent to-[#f4f6f8]/10" />

                <div className="relative z-10 h-full flex items-center justify-start px-6 md:px-20">
                    <div className="max-w-2xl space-y-6">
                        <h1 className="text-white text-5xl font-bold">{game.title}</h1>
                        <p className="text-gray-200 text-lg">{game.description}</p>

                        <p className="text-3xl font-semibold text-white">${game.price}</p>

                        <button className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Genres</h2>
                    <div className="flex gap-2 flex-wrap">
                        {game.genres.map((genre) => (
                            <span
                                key={genre}
                                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Platforms</h2>
                    <div className="flex gap-2 flex-wrap">
                        {game.platforms.map((platform) => (
                            <span
                                key={platform}
                                className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                            >
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
