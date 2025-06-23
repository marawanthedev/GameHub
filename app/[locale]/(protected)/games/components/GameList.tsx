'use client'
import { GameItem } from '@/app/types/rawg'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '@/app/hooks/useThrottle';
import { useEffect, useRef } from 'react';
import rawg from '@/app/lib/rawg'
import GameCard from './GameCard'


type RawgGamesApiResponse = {
    results: GameItem[]
    nextPage?: number
    isLastPage?: boolean
}

const fetchGames = async ({
    selectedPlatformId,
    page,
    searchQuery,
}: {
    selectedPlatformId: string;
    page: number;
    searchQuery?: string;
}): Promise<RawgGamesApiResponse> => {
    const response = await rawg.get("/games", {
        params: {
            page,
            page_size: 10,
            platforms: selectedPlatformId === 'all' ? undefined : selectedPlatformId,
            search: searchQuery?.trim() || undefined, // only send if not empty
            search_precise: searchQuery ? true : undefined,
        },
    });

    return {
        results: response.data.results,
        nextPage: page + 1,
        isLastPage: !response.data.next,
    };
};

export default function GamesList({ selectedPlatformId, searchQuery, }: { selectedPlatformId: string, searchQuery: string }) {
    const debouncedFetchNextPage = useDebounce(() => {
        fetchNextPage();
    }, 500);


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery<RawgGamesApiResponse, Error>({
        queryKey: ['games', selectedPlatformId, searchQuery],
        queryFn: ({ pageParam = 1 }) =>
            fetchGames({ selectedPlatformId, page: Number(pageParam), searchQuery: searchQuery }),
        getNextPageParam: (lastPage) => lastPage.isLastPage ? undefined : lastPage.nextPage,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60,
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const parentRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                debouncedFetchNextPage();
            }
        }, {
            rootMargin: '200px',
        });

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, debouncedFetchNextPage]);

    return (
        <>
            <h2
                id="games-heading"
                className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight"
            >
                Games
            </h2>


            <ul
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                aria-label="List of video games"
                ref={parentRef}
            >
                {data?.pages?.map((page) =>
                    page.results.map((game) => (
                        <li
                            key={game.id}
                            className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow pb-4 hover:shadow-lg transition overflow-hidden"
                        >
                            <GameCard game={game} />
                        </li>
                    ))
                )}
            </ul>


            <div ref={loadMoreRef} className="h-10" />

            {
                isFetchingNextPage && (
                    <div className="flex justify-center mt-6" role="status" aria-live="polite">
                        <div
                            className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"
                            aria-label="Loading more games"
                        />
                    </div>
                )
            }
        </>
    );
}
