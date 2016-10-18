import actions from './index';
import chai from 'chai';

describe('Actions', () => {
  it('selectGenre should create selectGenre action', () => {
    chai.expect(actions.selectGenre('Comedy')).toEqual({
      selectedGenre: 'comedy',
    });
  });
});
