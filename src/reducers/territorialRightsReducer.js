import { createReducer } from 'redux-starter-kit';
import { RIGHTS_SUCCESS, RIGHTS_FAILURE, RIGHTS_REQUEST } from '../types/rights.types';

export const initialState = {
  loading: false,
  TerritorialRightsSets: [],
  UnassignedTracks: [],
};

export default createReducer(initialState, {
  [RIGHTS_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [RIGHTS_SUCCESS]: (state, action) => {
    state.TerritorialRightsSets = action.TerritorialRightsSets;
    state.UnassignedTracks = action.UnassignedTracks;
    state.loading = false;
  },
  [RIGHTS_FAILURE]: (state, action) => {
    state.loading = false;
  },
});
