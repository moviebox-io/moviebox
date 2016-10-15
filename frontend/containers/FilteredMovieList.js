import { connect } from 'react-redux';
import MovieList from '../components/MovieList';

const getVisibleMovies = (movies, filter) => {
  if (filter) {
    return movies.filter(t => t.genre === filter);
  }
  return movies;
};

const mapStateToProps = (state) => ({
  movies: getVisibleMovies(state.movies, state.selectedGenre),
});

const FilteredMovieList = connect(
  mapStateToProps,
)(MovieList);

export default FilteredMovieList;
