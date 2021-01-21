import React, { useContext, useEffect, useRef, useState } from "react";
import { APIGenre } from "../../Movies/common/Movies.types";

import GenreCheckBox from "./GenreCheckBox/GenreCheckbox";

const GenreCheckBoxList: React.FC<{ genres: APIGenre[] }> = ({ genres }) => {
    return (
        <div className="checkboxes">
            {genres && genres.map((genre) => {
                return <GenreCheckBox genre={genre} />
            })}
        </div>
    )
}

export default GenreCheckBoxList;