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

export interface GameDetail {
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

export interface GameDetail {
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
