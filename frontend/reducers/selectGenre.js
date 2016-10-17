import { SELECT_GENRE } from '../actions';

const selectGenre = (state = '', action) => {
  switch (action.type) {
    case SELECT_GENRE:
      return action.genre;
    default:
      return state;
  }
};

export default selectGenre;
