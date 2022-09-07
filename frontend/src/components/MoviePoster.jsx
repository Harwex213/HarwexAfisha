import React from "react";
import apiConfig from "../constants/apiConfig";
import standardMovieName from "../helpers/standardMovieName";
import { Image } from "antd";

const MoviePoster = ({ name, time = "0", ...rest }) => {
    return (
        <Image
            alt="movie-poster"
            src={`${apiConfig.baseUrl}static/movie/${standardMovieName(name)}/poster.jpg?time=${time}`}
            {...rest}
        />
    );
};

export default MoviePoster;
