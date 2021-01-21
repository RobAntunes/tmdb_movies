import React, { useContext, useEffect, useState } from "react";

import { IMovie } from "../common/Movies.types";

import Movie from "./Movie/Movie";

import { MovieContext } from "../../../App";
import {
    filterMoviesByGenre,
    filterMoviesByRating,
    moviesByPopularity
} from "../../../helpers/manipulateMovies";

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>();

    const movieContext = useContext(MovieContext);
    const { nowPlaying, filters } = movieContext;

    useEffect(() => {
        // TODO: Figure out nice simple abstraction to make this dynamic.
        let movies: IMovie[] = [...nowPlaying];

        // Check if we have an active conditional filter
        const flag = conditionalFilterCheck(filters);

        // Filter pipeline
        if (flag) {
            // Conditional filters
            movies = filterMoviesByGenre(
                nowPlaying,
                filters.selectedGenres
            )
        }
        else {
            movies = moviesByPopularity(nowPlaying);
        }
        // Permanent filters
        movies = filterMoviesByRating(
            movies,
            filters.minimumRating
        )
        setMovies(movies);
    }, [movieContext.filters])

    return (
        <>
            {(movies)
                ? movies.map((movie: IMovie) => {
                    return <Movie {...movie} {...movieContext.imageInfo} />
                })
                : null}
        </>
    )

    function conditionalFilterCheck(filters: { [key: string]: any }) {
        return Object.values(filters).every((filter) => {
            if (filter instanceof Object) {
                if (Object.values(filter).length > 0) {
                    return true;
                }
            }
            return filter ? true : false;
        })
    }
}

export default MovieList;