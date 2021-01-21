import React, { ChangeEvent, useContext, useEffect } from "react";

import { APIGenre } from "../../../Movies/common/Movies.types";
import { MovieContext } from "../../../../App";

const GenreCheckBox: React.FC<{ genre: APIGenre }> = ({ genre }) => {
    const movieContext = useContext(MovieContext);
    useEffect(() => {
    }, [movieContext])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (movieContext) {
            const inState = movieContext.filters.selectedGenres.includes(genre)
            const checked = e.target.checked;
            const movieCtxCpy = [...movieContext.filters.selectedGenres];

            if (checked && !inState) {
                movieCtxCpy.push(genre);
            }
            else if (!checked && inState) {
                const idx = movieCtxCpy.indexOf(genre);
                movieCtxCpy.splice(idx, 1);
            }
            movieContext.setGlobalState({
                ...movieContext,
                filters: {
                    ...movieContext.filters,
                    selectedGenres: movieCtxCpy
                }
            })
        }
    }

    return (
        <div className="checkbox_wrapper">

            <div className="checkbox">
                <input id={genre.name} type="checkbox" onChange={(e) => {
                    handleOnChange(e);
                }} />
                <label
                    htmlFor={genre.name}
                >
                    {genre.name}
                </label>
            </div>
        </div>
    )
}


export default GenreCheckBox;