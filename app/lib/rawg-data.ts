import { GameItem, Genre, Platform } from '../types/rawg';
import rawg from './rawg';

export async function getTopRatedGames2024(limit = 10) {
    const { data } = await rawg.get('/games', {
        params: {
            ordering: '-rating',
            dates: '2024-01-01,2024-12-31',
            page_size: limit,
        },
    });

    return data.results.map((game: GameItem) => ({
        name: game.name,
        rating: game.rating,
    }));
}


export async function getGenreDistribution2024(limit = 100) {
    const { data } = await rawg.get('/games', {
        params: {
            dates: '2024-01-01,2024-12-31',
            page_size: limit,
        },
    });

    const genreCount: Record<string, number> = {};

    data.results.forEach((game: GameItem) => {
        game.genres.forEach((genre: Genre) => {
            genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
        });
    });

    return Object.entries(genreCount).map(([name, count]) => ({
        name,
        value: count,
    }));
}


export async function getPlatformUsage2024(limit = 100) {
    const { data } = await rawg.get('/games', {
        params: {
            dates: '2024-01-01,2024-12-31',
            page_size: limit,
        },
    });

    const platformCount: Record<string, number> = {};

    data.results.forEach((game: GameItem) => {
        game.platforms?.forEach(({ platform }: { platform: Platform }) => {
            platformCount[platform.name] = (platformCount[platform.name] || 0) + 1;
        });
    });

    return Object.entries(platformCount).map(([platform, count]) => ({
        platform,
        count,
    }));
}
