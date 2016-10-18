import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MovieList from '../components/MovieList';
import SelectGenre from '../components/SelectGenre';
import { getVisibleMovies } from '../reducers';

class FilteredMovieList extends Component {
  static propTypes = {
    getVisibleMovies: PropTypes.func.isRequired,
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { selectGenre, movies } = this.props;
    return (
      <div>
        <SelectGenre value={selectGenre}
                 onChange={this.handleChange} />
        <MovieList movies={movies} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getVisibleMovies(state.movies, state.selectGenre),
  selectGenre: state.selectGenre,
});

export default connect(
  mapStateToProps,
)(FilteredMovieList);
