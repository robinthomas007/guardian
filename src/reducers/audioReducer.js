import { createReducer } from 'redux-starter-kit';
import { ISRC_CHECK_REQUEST, ISRC_CHECK_FAILURE, ISRC_CHECK_SUCCESS } from '../types/audio.types';

export const initialState = {
  loading: false,
  ExTracks: [],
  message: null,
};

export default createReducer(initialState, {
  [ISRC_CHECK_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [ISRC_CHECK_SUCCESS]: (state, action) => {
    state.ExTracks = action.result;
    state.loading = false;
  },
  [ISRC_CHECK_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
});
