export type FormDataF = {
    email: string;
    password: string;
};

export type FormDataS = {
    fullName: string;
    email: string;
    password: string;
};

interface ThumbnailSizes {
    small: string;
    medium: string;
    large?: string;
}

interface Thumbnail {
    regular: ThumbnailSizes;
}

export interface Movie {
    _id: string;
    id: string;
    title: string;
    thumbnail: Thumbnail;
    year: number;
    category: "Movie" | "TV Series";
    rating: "PG" | "E" | "18+" | string;
    isBookmarked: boolean;
    isTrending: boolean;
    __v: number;
}

export interface TProps {
    title: string;
    category: string;
    img?: string;
    rating: string;
    year: number;
    isBookmarked?: boolean | undefined;
    isTrending?: boolean;
    id?: string | undefined;
}
