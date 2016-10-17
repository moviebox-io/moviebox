import React from 'react';
import FilteredMovieList from '../containers/FilteredMovieList';
import SelectGenre from '../containers/SelectGenre';

const App = () => (
  <div>
    <SelectGenre />
    <FilteredMovieList />
  </div>
);

export default App;
