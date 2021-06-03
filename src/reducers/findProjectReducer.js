import { createReducer } from 'redux-starter-kit';
import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  SAVE_FILTERS,
  CHANGE_PAGE_NO,
  CHANGE_LIMIT,
} from '../types/findProject.types';

export const initialState = {
  loading: false,
  result: {},
  facets: {},
  message: null,
  searchCriteria: {
    itemsPerPage: '10',
    pageNumber: '1',
    filter: {},
  },
};

export default createReducer(initialState, {
  [GET_PROJECT_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [GET_PROJECT_SUCCESS]: (state, action) => {
    state.result = action.result;
    state.loading = false;
    if (Object.keys(state.facets).length === 0 && state.facets.constructor === Object) {
      state.facets = action.result.Facets;
    }
  },
  [GET_PROJECT_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  [SAVE_FILTERS]: (state, action) => {
    state.searchCriteria.filter = action.filters;
  },
  [CHANGE_PAGE_NO]: (state, action) => {
    state.searchCriteria.pageNumber = action.pageNo;
  },
  [CHANGE_LIMIT]: (state, action) => {
    state.searchCriteria.itemsPerPage = action.limit;
  },
});
