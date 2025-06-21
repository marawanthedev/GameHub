import { useDebounce } from "@/app/hooks/useThrottle"
import rawg from "@/app/lib/rawg"
import { RawgPlatform } from "@/app/types/rawg"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"


const fetchPlatforms = async (): Promise<RawgPlatform[]> => {
    const { data } = await rawg.get('/platforms')
    return data.results
}

type GameActionsProps = {
    setSelectedPlatformId: React.Dispatch<React.SetStateAction<string>>
    selectedPlatformId: string;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function GameActions({ setSelectedPlatformId, selectedPlatformId, searchQuery, setSearchQuery }: GameActionsProps) {

    const { data: platforms = [], isLoading: loadingPlatforms } = useSuspenseQuery({
        queryKey: ['platforms'],
        queryFn: fetchPlatforms,
        staleTime: 1000 * 60 * 60 // 1 hour cache
    })
    return (
        <div className="mb-8 flex flex-wrap gap-4" >
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                placeholder="Search games..."
                className="px-4 py-2 rounded-lg border border-[#30363d] bg-[#161b22] text-white w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select onChange={(e) => setSelectedPlatformId(e.target.value)} value={selectedPlatformId} className="px-4 py-2 rounded-lg border border-[#30363d] bg-[#161b22] text-white w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                {loadingPlatforms && (
                    <option value="" disabled > Loading platforms...</option>)
                }
                {
                    platforms.map((platform: RawgPlatform) => {
                        return (
                            <option
                                key={platform.id}
                                value={platform.id}
                                className="bg-[#161b22] text-white"
                            >
                                {platform.name}
                            </option>
                        )
                    })}
            </select>
        </div>
    )
}