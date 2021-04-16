import { createReducer } from 'redux-starter-kit';
import { INCREMENT, DECREMENT } from './constants';

export const initialState = {
  count: 0,
};

export default createReducer(initialState, {
  [INCREMENT]: state => {
    state.count = state.count + 1;
  },
  [DECREMENT]: state => {
    state.count = state.count > 0 ? state.count - 1 : 0;
  },
});
