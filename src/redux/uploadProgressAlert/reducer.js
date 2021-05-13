import { createReducer } from 'redux-starter-kit';
import { INCREMENT, CLEAR } from './constants';

export const initialState = {
  progress: 0,
};

export default createReducer(initialState, {
  [INCREMENT]: (state, action) => {
    state.progress = action.progress;
  },
  [CLEAR]: state => {
    state.progress = 0;
  },
});
