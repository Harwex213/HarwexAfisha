import React from "react";
import apiConfig from "../constants/apiConfig";
import standardMovieName from "../helpers/standardMovieName";
import { Image } from "antd";

const MoviePoster = ({ name, className, ...rest }) => {
    return (
        <Image
            className={className}
            alt="movie-poster"
            src={`${apiConfig.baseUrl}static/movie/${standardMovieName(name)}/poster.jpg`}
            {...rest}
        />
    );
};

export default MoviePoster;
