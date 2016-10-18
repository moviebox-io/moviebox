import INITIAL_STATE from '../samples/movies.js';
import { SELECT_GENRE } from '../actions';

export const getVisibleMovies = (movies, filter) => {
  if (filter) {
    return movies.filter(t => t.genre === filter);
  }
  return movies;
};

const movies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_GENRE:
      return getVisibleMovies(state.movies, state.selectGenre);
    default:
      return state;
  }
};

export default movies;
