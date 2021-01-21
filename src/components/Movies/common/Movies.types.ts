export interface IMovieContext {
    allGenres: APIGenre[];
    imageInfo: IImageInfo;
    nowPlaying: IMovie[];
    filters: {
      selectedGenres: APIGenre[];
      minimumRating: number
    }
    setGlobalState: React.Dispatch<React.SetStateAction<IMovieContext | null>>;
  }

export interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    key: any
}

export interface IImageInfo {
    change_keys?: string[],
    images: {
        backdrop_sizes: string[],
        base_url: string,
        logo_sizes: string[],
        poster_sizes: string[],
        profile_sizes: string[],
        secure_base_url: string,
        still_sizes: string[],
    }
}

export type APIGenre = { id: number, name: string };
export type MovieWithImageInfo = IMovie & IImageInfo;