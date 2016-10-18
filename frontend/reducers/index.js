import { combineReducers } from 'redux';
import movies from './movies';
import selectGenre from './selectGenre';

const rootReducer = combineReducers({
  movies,
  selectGenre,
});

export default rootReducer;
