import React from "react";
import { useState } from "react";
import { TableContent } from "../tableContent/tableContent";
import { GenreList } from "../genreListContent/genreList";
import { getMoviesFromServer } from "../../services/moviesSevices";

function compare(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

export const Movie = (props) => {
  let moviesDB = getMoviesFromServer();
  const [movies, setMovies] = useState(moviesDB.sort((a, b) => compare(a, b)));
  const [filter, setFilter] = useState();

  const handleDelete = (id) => {
    let newData = movies.filter((m) => m.id !== id);
    newData = newData.sort((a, b) => compare(a, b));
    setMovies(newData);
  };

  const handleIsLike = (id, isLike) => {
    console.log(isLike, id);

    let movie = movies.find((m) => m.id === id);
    if (movie) {
      movie.isLike = isLike;
    }

    let movieArrayWithoutEditedOne = movies.filter((m) => m.id !== id);
    let newData = [...movieArrayWithoutEditedOne, movie].sort((a, b) =>
      compare(a, b)
    );

    setMovies(newData);
  };

  const handleFilter = () => {};
  return (
    <div>
      <h1>Showing {movies.length}</h1>
      <GenreList></GenreList>
      <TableContent
        moviesArr={movies}
        deleteMovie={handleDelete}
        handleLike={handleIsLike}
      ></TableContent>
    </div>
  );
};
