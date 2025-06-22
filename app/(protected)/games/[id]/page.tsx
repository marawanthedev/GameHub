'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import rawg from '@/app/lib/rawg'
import { GameDetail } from '@/app/types/rawg'
import { useCartStore } from '@/app/stores/cart'
import { DescriptionClamp } from './components/DescriptionClamp'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { GameDetailsSkeleton } from './components/GameDetailsSkeleton'
import { GTM_EVENTS, trackEvent } from '@/app/lib/gtm'
import { getTimeOfDay } from '@/app/lib/time'
import Link from 'next/link'

export default function GameDetailsPage() {
    const [addToCartAnnouncement, setAddToCartAnnouncement] = useState('');
    const { id } = useParams()
    const addToCart = useCartStore((state) => state.addToCart)

    const {
        data: game,
        isLoading,
        error,
    } = useQuery<GameDetail>({
        queryKey: ['game', id],
        queryFn: async () => {
            const { data } = await rawg.get(`/games/${id}`)
            return data
        },
        enabled: !!id,
    })

    // bad memoization candidate
    // bcs it will be called ()=> handleAddToCart(game) -> new function created each time
    const handleAddToCart = (game: GameDetail) => {
        try {
            addToCart({
                id: game.id,
                title: game.name,
                price: 59.99, // Assuming a fixed price for simplicity
                image: game.background_image,
            });

            trackEvent({
                event: GTM_EVENTS.ADD_TO_CART,
                category: 'ecommerce',
                label: game.name,
                value: 59.99,
                productName: game.name,
                productId: game.id.toString(),
                platforms: game.platforms.map(p => p.platform.name).join(', '),
                genres: game.genres.map(g => g.name).join(', '),
                timeOfDay: getTimeOfDay()
            });

            toast.success(`${game.name} added to cart!`);
            setAddToCartAnnouncement(`${game.name} has been added to your cart.`);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Something went wrong adding to cart.';
            toast.error(message);
        }
    };

    useEffect(() => {
        if (game?.name) {
            trackEvent({
                event: GTM_EVENTS.GAME_VIEWED,
                category: 'engagement',
                label: game.name,
                value: 59.99,
                productName: game.name,
                timeOfDay: getTimeOfDay()
            });
        }
    }, [game?.name]);

    if (isLoading) return <GameDetailsSkeleton />
    if (!game) throw new Error('Game not found');
    if (error) throw error;

    return (
        <main className="min-h-screen bg-[#0d1117] text-white">
            {/* Hero Section */}
            <header className="relative py-12 min-h-screen w-full overflow-hidden">
                <Image
                    src={game.background_image}
                    alt={`Background for ${game.name}`}
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/10" />

                <div className="relative z-10 h-full flex items-center justify-start px-6 md:px-20">
                    <article className="max-w-2xl space-y-6" aria-labelledby="game-title">
                        <Link
                            href="/games"
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition font-medium mb-4"
                            aria-label="Back to games list"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Games
                        </Link>
                        <h1 id="game-title" className="text-white text-4xl md:text-5xl font-bold">
                            {game.name}
                        </h1>

                        <DescriptionClamp description={game.description_raw} />

                        <p className="text-2xl md:text-3xl font-semibold text-white">$59.99</p>

                        <button
                            onClick={() =>
                                handleAddToCart(game)
                            }
                            className="mt-4 inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition"
                            aria-label={`Add ${game.name} to cart`}
                        >
                            Add to Cart
                        </button>
                    </article>
                </div>
            </header>

            {/* Details Section */}
            <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-12" aria-labelledby="details-heading">
                <h2 id="details-heading" className="sr-only">Game details</h2>

                <section aria-labelledby="genres-heading">
                    <h3 id="genres-heading" className="text-2xl font-semibold mb-2">Genres</h3>
                    <ul className="flex gap-2 flex-wrap" aria-label="Genres">
                        {game.genres.map((genre) => (
                            <li key={genre.id}>
                                <span className="text-sm bg-blue-900 text-blue-300 px-3 py-1 rounded-full inline-block">
                                    {genre.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="platforms-heading">
                    <h3 id="platforms-heading" className="text-2xl font-semibold mb-2">Platforms</h3>
                    <ul className="flex gap-2 flex-wrap" aria-label="Platforms">
                        {game.platforms.map(({ platform }) => (
                            <li key={platform.id}>
                                <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full inline-block">
                                    {platform.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>

            <span
                id="cart-announcement"
                className="sr-only"
                aria-live="polite"
            >
                {addToCartAnnouncement ? addToCartAnnouncement : 'No items added to cart yet.'}
            </span>
        </main >
    )
}
