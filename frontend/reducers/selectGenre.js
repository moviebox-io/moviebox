import { SELECT_GENRE } from '../actions';

const selectGenre = (state = '', action) => {
  switch (action.type) {
    case SELECT_GENRE:
      return action.selectedGenre;
    default:
      return state;
  }
};

export default selectGenre;
