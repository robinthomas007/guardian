import { createReducer } from 'redux-starter-kit';
import {
  ISRC_CHECK_REQUEST,
  ISRC_CHECK_FAILURE,
  ISRC_CHECK_SUCCESS,
  CIS_SUCCESS,
  CIS_FAILURE,
  CIS_REQUEST,
} from '../types/audio.types';

export const initialState = {
  loading: false,
  ExTracks: [],
  message: null,
  cisData: [],
  cisLoading: false,
  Iscrs: [],
};

export default createReducer(initialState, {
  [ISRC_CHECK_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [ISRC_CHECK_SUCCESS]: (state, action) => {
    state.ExTracks = action.result;
    state.loading = action.loading;
  },
  [ISRC_CHECK_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  [CIS_REQUEST]: (state, action) => {
    state.cisLoading = action.loading;
    state.Iscrs = action.Iscrs;
  },
  [CIS_SUCCESS]: (state, action) => {
    state.cisData = action.result;
    state.cisLoading = false;
    state.Iscrs = [];
  },
  [CIS_FAILURE]: (state, action) => {
    state.cisLoading = false;
    state.message = action.message;
    state.Iscrs = [];
  },
});
