import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerPath, setTrailerPath] = useState("");
  /*   const [description, setDescription] = useState("");
  const [original_title, setOriginal_title] = useState("");
  const [Title, setTitle] = useState(""); */
  //A snippet of code which runs based on a specific condition
  useEffect(() => {
    //if [], run once when the row loads and don get run gain
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerPath === "") {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.original_title
      )
        .then((response) => {
          const path = response.split("?v=")[1];
          setTrailerPath(path);
          /* setTitle(movie?.name || movie?.title);
          setOriginal_title(movie?.original_name); */
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setTrailerPath("");
      /* setDescription("");
      setTitle("");
      setOriginal_title("");
  */
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerPath && <YouTube videoId={trailerPath} opts={opts} />}
    </div>
  );
}

export default Row;
