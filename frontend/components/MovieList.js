import React, { PropTypes } from 'react';

const MovieList = ({ movies }) => (
  <ul>
    {movies.map((movie, i) =>
      <li key={i}>{movie.title}</li>
    )}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default MovieList;
