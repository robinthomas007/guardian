import { createReducer } from 'redux-starter-kit';
import {
  PROJECT_FAILURE,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  UPC_INITIALIZE,
  UPC_REQUEST,
  UPC_SUCCESS,
  UPC_FAILURE,
} from './release.types';

export const initialState = {
  result: {},
  loading: false,
  upcData: {},
  upcLoading: false,
};
export default createReducer(initialState, {
  // [PROJECT_REQUEST]: (state, actions) => {
  //   state.loading = actions.isLoading;
  // },
  // [PROJECT_SUCCESS]: (state, action) => {
  //   state.result = action.data;
  //   state.loading = false;
  // },
  // [PROJECT_FAILURE]: state => {
  //   state.loading = false;
  // },
  // [PROJECT_INITIALIZE]: state => {
  //   state.result = {};
  // },
  [UPC_REQUEST]: (state, actions) => {
    state.loading = actions.isLoading;
    state.upcLoading = actions.isLoading;
  },
  [UPC_SUCCESS]: (state, action) => {
    state.upcData = action.data;
  },
  [UPC_FAILURE]: state => {},
  [UPC_INITIALIZE]: state => {
    state.upcData = {};
  },
});
