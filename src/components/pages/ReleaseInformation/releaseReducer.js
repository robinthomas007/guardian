import { createReducer } from 'redux-starter-kit';
import {
  PROJECT_FAILURE,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_INITIALIZE,
} from './release.types';

export const initialState = {
  result: {},
  loading: false,
};
export default createReducer(initialState, {
  [PROJECT_REQUEST]: (state, actions) => {
    state.loading = actions.isLoading;
  },
  [PROJECT_SUCCESS]: (state, action) => {
    state.result = action.data;
    state.loading = false;
  },
  [PROJECT_FAILURE]: state => {
    state.loading = false;
  },
  [PROJECT_INITIALIZE]: state => {
    state.result = {};
  },
});
