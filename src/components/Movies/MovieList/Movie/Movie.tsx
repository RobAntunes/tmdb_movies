import React, { useEffect, useRef } from "react";

import { APIGenre, MovieWithImageInfo } from "../../common/Movies.types";

import { MovieContext } from "../../../../App";

const Movie: React.FC<MovieWithImageInfo> = (props) => {
    const movieRef = useRef<HTMLDivElement | null>(null);

    const baseURL = props.images.base_url;
    const path = props.poster_path;
    const posterSizes = props.images.poster_sizes;

    useEffect(() => {
        // Could be updated to be responsive and return higher res images
        // on resize
        const movieElem = movieRef?.current;
        if (movieElem) {
            const splash = constructImageURL(
                baseURL,
                path,
                movieElem.clientWidth,
                posterSizes
            )
            movieElem.style.backgroundImage = `url(${splash})`;
        }
    }, [props, movieRef.current])

    return (
        <div className="movie" >
            <div className="splash" ref={movieRef}></div>
            <div className="movie_info">

                <p className="title">{props.title}</p>
                <div className="genres">{
                    <MovieContext.Consumer>
                        {(data) => {
                            return getGenresAsString(data.allGenres, props.genre_ids);
                        }}
                    </MovieContext.Consumer>
                }
                </div>
            </div>
        </div>
    )
}

function getGenresAsString(genres: APIGenre[], genreIDs: number[]): React.ReactNode {
    const genreStr = genreIDs.reduce(
        (acc, curr) => {
            acc += `${genres.find(
                (genre) => (genre.id === curr)
            )?.name}, `
            return acc;
        }, ``)
    return <div>{genreStr.trim().slice(0, -1)}</div>
}

// This could be tweaked to handle finding the correct size for any style
// of image needed (Poster, Backdrop, etc...)
function constructImageURL(
    baseURL: string,
    path: string,
    width: number,
    posterSizes: string[]
): string | void {
    const size: string = getSuitableImageSizeForPosters(
        width, posterSizes
    );
    return `${baseURL}${size}${path}`;
}

function getSuitableImageSizeForPosters(
    width: number, posterSizes: string[]
) {
    // Doesn't allow for retrieval of original image size
    const suitableSizes = posterSizes
        .filter((size) => {
            // API uses size as part of path hence providing the value
            // as a string and prefixed with a "w"
            const wNum = +size.split("w")[1];
            // no fallback if none is found
            return wNum >= width * 0.6 && wNum <= width * 1.4
        });
    // Returns largest valid/workable size
    return suitableSizes[suitableSizes.length - 1];
}

export default Movie;