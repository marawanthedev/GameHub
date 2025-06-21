// components/GamesList.tsx
import Image from 'next/image'
import Link from 'next/link'

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default async function GamesList() {
    await wait(1500)

    const games = [
        { id: 1, title: 'Cyberpunk 2077', image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg', genres: ['RPG'], platforms: ['PC'] },
        { id: 2, title: 'Witcher 3', image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg', genres: ['RPG'], platforms: ['PC'] },
        { id: 3, title: 'Elden Ring', image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg', genres: ['Souls-like'], platforms: ['PC'] },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map((game) => (
                <Link key={game.id} href={`/games/${game.id}`} className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow overflow-hidden">
                    <Image src={game.image} alt={game.title} width={400} height={300} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{game.title}</h2>
                        <p className="text-sm text-gray-400">{game.genres.join(', ')}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {game.platforms.map((platform) => (
                                <span key={platform} className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
