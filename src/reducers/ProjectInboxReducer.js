import { createReducer } from 'redux-starter-kit';
import {
  GET_INBOX_FAILURE,
  GET_INBOX_REQUEST,
  GET_INBOX_SUCCESS,
  CHANGE_LIMIT_INBOX,
  SAVE_FILTERS_INBOX,
  CHANGE_PAGE_NO_INBOX,
} from '../types/inbox.types';

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
  [GET_INBOX_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [GET_INBOX_SUCCESS]: (state, action) => {
    state.result = action.result;
    state.loading = false;
    if (Object.keys(state.facets).length === 0 && state.facets.constructor === Object) {
      state.facets = action.result.Facets;
    }
  },
  [GET_INBOX_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  [SAVE_FILTERS_INBOX]: (state, action) => {
    state.searchCriteria.filter = action.filters;
  },
  [CHANGE_PAGE_NO_INBOX]: (state, action) => {
    state.searchCriteria.pageNumber = action.pageNo;
  },
  [CHANGE_LIMIT_INBOX]: (state, action) => {
    state.searchCriteria.itemsPerPage = action.limit;
  },
});
