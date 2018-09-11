
import { fromJS } from 'immutable';
import userAvatarReducer from '../reducer';

describe('userAvatarReducer', () => {
  it('returns the initial state', () => {
    expect(userAvatarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
