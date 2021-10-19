import { createReducer } from 'redux-starter-kit';
import { RIGHTS_SUCCESS, RIGHTS_FAILURE, RIGHTS_REQUEST } from '../types/rights.types';

export const initialState = {
  loading: false,
  TerritorialRightsSets: [],
  UnassignedTracks: [],
  NoRightsTracks: [],
};

export default createReducer(initialState, {
  [RIGHTS_REQUEST]: (state, action) => {
    state.loading = action.isLoading;
  },
  [RIGHTS_SUCCESS]: (state, action) => {
    state.TerritorialRightsSets = action.TerritorialRightsSets;
    state.UnassignedTracks = action.UnassignedTracks;
    state.NoRightsTracks = action.NoRightsTracks;
    state.loading = false;
  },
  [RIGHTS_FAILURE]: (state, action) => {
    state.loading = false;
  },
});
