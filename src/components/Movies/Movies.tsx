import React from "react";

import "./common/Movies.scss";

import MovieList from "./MovieList/MovieList";

const Movies: React.FC = () => {
    return (
        <div className="movies">
            <MovieList></MovieList>
        </div>
    )
}

export default Movies;