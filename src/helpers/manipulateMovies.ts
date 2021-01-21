import { APIGenre, IMovie } from "../components/Movies/common/Movies.types";

export function moviesByPopularity(movies: IMovie[]): IMovie[] {
    return movies.sort((a: IMovie, b: IMovie) => {
        return b.popularity - a.popularity;
    })
}

export function filterMoviesByGenre(movies: IMovie[], genres: APIGenre[]) {
    if (genres.length === 0) return movies;
    else {
        return movies.filter((movie) => genres.every((genre) => {
            return movie.genre_ids.includes(genre.id);
        }))
    }
}

export function filterMoviesByRating(movies: IMovie[], rating: number) {
    return movies.filter((movie) => movie.vote_average >= rating);
}

// need to make the respective sorting functions