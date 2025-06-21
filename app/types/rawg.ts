export type RawgPlatform = {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
    image: string | null
    year_start: number | null
    year_end: number | null
    games: {
        id: number
        slug: string
        name: string
        added: number
    }[]
}


export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface PlatformInfo {
    platform: Platform;
    released_at: string;
    requirements_en: Requirements | null;
    requirements_ru: Requirements | null;
}

export interface Platform {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface Requirements {
    minimum: string;
    recommended: string;
}

export interface ParentPlatform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface StoreEntry {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
        domain: string;
        games_count: number;
        image_background: string;
    };
}

export interface GameItem {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: Record<string, number>;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformInfo[];
    parent_platforms: ParentPlatform[];
    genres: Genre[];
    stores: StoreEntry[];
    clip: null;
    tags: Tag[];
    esrb_rating: EsrbRating;
    short_screenshots: Screenshot[];
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface PlatformInfo {
    platform: Platform;
    released_at: string;
    requirements_en: Requirements | null;
    requirements_ru: Requirements | null;
}

export interface Platform {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface Requirements {
    minimum: string;
    recommended: string;
}

export interface ParentPlatform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface StoreEntry {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
        domain: string;
        games_count: number;
        image_background: string;
    };
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface Screenshot {
    id: number;
    image: string;
}


export type GameDetail = {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    description_raw: string;
    metacritic: number | null;
    metacritic_platforms: {
        metascore: number;
        url: string;
        platform: {
            platform: number;
            name: string;
            slug: string;
        };
    }[];
    released: string;
    tba: boolean;
    updated: string;
    background_image: string;
    background_image_additional: string | null;
    website: string;
    rating: number;
    rating_top: number;
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    reactions: Record<string, number>;
    added: number;
    added_by_status: {
        yet?: number;
        owned?: number;
        beaten?: number;
        toplay?: number;
        dropped?: number;
        playing?: number;
    };
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: string[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    user_game: unknown;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    parent_platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
            image: string | null;
            year_end: number | null;
            year_start: number | null;
            games_count: number;
            image_background: string;
        };
        released_at: string;
        requirements: {
            minimum?: string;
            recommended?: string;
        };
    }[];
    stores: {
        id: number;
        url: string;
        store: {
            id: number;
            name: string;
            slug: string;
            domain: string;
            games_count: number;
            image_background: string;
        };
    }[];
    developers: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    publishers: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    genres: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    tags: {
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
    }[];
    esrb_rating: {
        id: number;
        name: string;
        slug: string;
    } | null;
    clip: unknown;
};
