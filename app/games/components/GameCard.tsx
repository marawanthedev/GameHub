import { GameItem } from "@/app/types/rawg"
import GameTags from "./GameTags"
import Image from "next/image"
import React from "react"
import Link from "next/link"

function GameCard({ game }: { game: GameItem }) {
    return <>
        <div className="relative h-48">
            <Image
                src={game.background_image}
                alt={`Background of ${game.name}`}
                fill
                className="object-cover"
            />
        </div>
        <div className="py-4 px-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">
                {game.name}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label={`Genres for ${game.name}`}>
                {game.genres.map((genre) => (
                    <li key={genre.id}>
                        <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">
                            {genre.name}
                        </span>
                    </li>
                ))}
            </ul>
            <GameTags platforms={game.platforms} />
        </div>
        <div className="w-full px-4">
            <Link
                href={`/games/${game.id}`}
                className="inline-block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                aria-label={`View details about ${game.name}`}
            >
                View Details
            </Link>
        </div></>
}

export default React.memo(GameCard)