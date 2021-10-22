import { createReducer } from 'redux-starter-kit';
import {
  RIGHTS_SUCCESS,
  RIGHTS_FAILURE,
  RIGHTS_REQUEST,
  INITIALIZE_RIGHTS,
  STATUS_UPDATE,
} from '../types/rights.types';

export const initialState = {
  loading: false,
  TerritorialRightsSets: [],
  UnassignedTracks: [],
  NoRightsTracks: [],
  status: null,
};

export default createReducer(initialState, {
  [RIGHTS_REQUEST]: (state, action) => {
    state.loading = action.isLoading;
    state.status = null;
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
  [INITIALIZE_RIGHTS]: (state, action) => {
    state.TerritorialRightsSets = [];
    state.UnassignedTracks = [];
    state.NoRightsTracks = [];
    state.status = null;
  },
  [STATUS_UPDATE]: (state, action) => {
    state.status = action.status;
  },
});
