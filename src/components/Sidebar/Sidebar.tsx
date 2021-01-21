import React, {
    ChangeEvent,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import GenreCheckBoxList from "./GenreCheckboxList/GenreCheckBoxList";

import { APIGenre, IMovie, IMovieContext } from "../Movies/common/Movies.types";
import { MovieContext } from "../../App";

import "./common/Sidebar.scss";

const Sidebar: React.FC = () => {
    const movieContext = useContext(MovieContext);

    const ratingBubbleRef: RefObject<HTMLSpanElement> = useRef(null);

    const [
        nowPlayingGenres,
        setNowPlayingGenres
    ] = useState<APIGenre[] | null>(null);


    useEffect(() => {
        if (!nowPlayingGenres) {
            const { nowPlaying, allGenres } = movieContext;
            setNowPlayingGenres(getNowPlayingGenres(nowPlaying, allGenres));
        }
    }, [movieContext])

    return (
        <aside className="sidebar">{
            (movieContext && nowPlayingGenres) ?
                <form className="filters">
                    <h2>LitFlix</h2>
                    <input 
                        className="search" 
                        type="search" 
                        name="search"
                        placeholder="Search..(TODO)"
                    />
                    <fieldset>
                        <GenreCheckBoxList genres={nowPlayingGenres} />
                    </fieldset>
                    <fieldset>
                        <input
                            type="range"
                            name="rating"
                            defaultValue="3"
                            min="0"
                            max="10"
                            step="0.5"
                            onChange={
                                (e) => {
                                    ratingHandleOnChange(
                                        e,
                                        movieContext,
                                        ratingBubbleRef)
                                }}
                        />
                        <span
                            className="rating_bubble"
                            ref={ratingBubbleRef}
                        >
                            3
                        </span>
                    </fieldset>

                </form>
                : null}
        </aside >
    );

    function getNowPlayingGenres(
        movies: IMovie[],
        genres: APIGenre[],
    ): APIGenre[] {
        const uniqueGenreIDs = getUniqueGenres(movies);
        const relevantGenres: APIGenre[] = [];
        genres.forEach((genre) => {
            if (uniqueGenreIDs.has(genre.id)) {
                relevantGenres.push(genre);
            }
        })
        return relevantGenres;
    }

    function getUniqueGenres(movies: IMovie[]) {
        const uniqueGenreIDs: Set<number> = new Set();
        movies.forEach((movie) => {
            movie.genre_ids!.forEach((genreID: number) => {
                uniqueGenreIDs.add(+genreID);
            })
        });
        return uniqueGenreIDs;
    }

    function ratingHandleOnChange(
        e: ChangeEvent<HTMLInputElement>,
        movieContext: IMovieContext,
        outputRef: RefObject<HTMLSpanElement>,
    ) {
        outputRef.current!.innerHTML = e.target.value;
        movieContext.setGlobalState({
            ...movieContext,
            filters: {
                ...movieContext.filters,
                minimumRating: +e.target.value,
            }
        })
    }
}

export default Sidebar;