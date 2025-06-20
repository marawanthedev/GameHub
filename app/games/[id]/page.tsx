'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function GameDetailsPage() {
    const [loading, setLoading] = useState(true)

    const game = {
        id: 1,
        title: 'Elden Ring',
        price: 59.99,
        image:
            'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        description:
            'Elden Ring is an action RPG developed by FromSoftware. Explore a vast, hauntingly beautiful world filled with mystery, danger, and powerful enemies.',
        genres: ['Action', 'Souls-like', 'RPG'],
        platforms: ['PC', 'PS5', 'Xbox'],
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen animate-pulse bg-[#0d1117] text-white">
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
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0d1117] text-white">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                <Image
                    src={game.image}
                    alt={game.title}
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/10" />

                <div className="relative z-10 h-full flex items-center justify-start px-6 md:px-20">
                    <div className="max-w-2xl space-y-6">
                        <h1 className="text-white text-5xl font-bold">{game.title}</h1>
                        <p className="text-gray-300 text-lg">{game.description}</p>
                        <p className="text-3xl font-semibold text-white">${game.price}</p>
                        <button className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
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
                                className="text-sm bg-blue-900 text-blue-300 px-3 py-1 rounded-full"
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
                                className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
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
