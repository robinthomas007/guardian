import { createReducer } from 'redux-starter-kit';
import { SHARE_SUCCESS, SHARE_FAILURE, SHARE_REQUEST } from '../types/share.types';

export const initialState = {
  loading: false,
  success: false,
};

export default createReducer(initialState, {
  [SHARE_REQUEST]: (state, action) => {
    state.loading = action.loading;
    state.success = false;
  },
  [SHARE_SUCCESS]: (state, action) => {
    state.success = true;
    state.loading = false;
  },
  [SHARE_FAILURE]: (state, action) => {
    state.loading = false;
    state.success = false;
  },
});
