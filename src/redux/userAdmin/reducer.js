import { createReducer } from 'redux-starter-kit';
import {
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  UPDATE_SEARCH_TERM,
  UPDATE_REQ_ITEMS,
  UPDATE_REQ_PAGINATION,
  UPDATE_REQ_SORT,
  UPDATE_EXT_ITEMS,
  UPDATE_EXT_PAGINATION,
  UPDATE_EXT_SORT,
  CHANGE_TAB,
  REQUESTING,
  EXISTING,
  USER_ACCESS_REQUEST,
  USER_ACCESS_SUCCESS,
  USER_ACCESS_FAIL,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_USER_MODAL,
  HIDE_USER_MODAL,
  SET_USER_TO_EDIT,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_REVOKE_REQUEST,
  USER_REVOKE_SUCCESS,
  USER_REINSTATE_REQUEST,
  USER_REINSTATE_SUCCESS,
} from './constants';

export const initialState = {
  searchTerm: '',
  tab: 'requesting',
  isShowingModal: false,
  userToEdit: {
    userID: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    primaryLabel: '',
    action: '',
  },
  requestingUserState: {
    pageNumber: 1,
    itemsPerPage: 10,
    sortColumn: '',
    sortOrder: '',
    totalItems: 0,
    userList: [],
    labelFacets: [],
  },
  existingUserState: {
    pageNumber: 1,
    itemsPerPage: 10,
    sortColumn: '',
    sortOrder: '',
    totalItems: 0,
    userList: [],
    labelFacets: [],
  },
  error: null,
  submitting: false,
};

export default createReducer(initialState, {
  [SHOW_ERROR]: (state, action) => {
    state.error = action.payload;
  },
  [HIDE_ERROR]: state => {
    state.error = '';
  },
  [SHOW_USER_MODAL]: state => {
    state.isShowingModal = true;
  },
  [HIDE_USER_MODAL]: state => {
    state.isShowingModal = false;
  },
  [SET_USER_TO_EDIT]: (state, action) => {
    state.userToEdit = action.payload;
  },
  [USER_SEARCH_REQUEST]: state => {
    state.submitting = true;
  },
  [USER_SEARCH_FAIL]: (state, action) => {
    if (!state.error && action.payload) state.error = action.payload;
    state.submitting = false;
    state.requestingUserState = initialState.requestingUserState;
    state.existingUserState = initialState.existingUserState;
  },
  [USER_SEARCH_SUCCESS]: (state, action) => {
    state.submitting = false;

    let requestingData = action.payload.AccessRequestSearchResponse;
    let existingData = action.payload.UserSearchResponse;

    // If the new pages are less than the current biggest page, wrap it over
    let reqPageNumber =
      state.requestingUserState.pageNumber > requestingData.totalPages
        ? requestingData.totalPages
        : state.requestingUserState.pageNumber;
    let extPageNumber =
      state.existingUserState.pageNumber > existingData.totalPages
        ? existingData.totalPages
        : state.existingUserState.pageNumber;

    state.requestingUserState.totalItems = requestingData.TotalItems;
    state.requestingUserState.userList = requestingData.AccessRequests;
    state.requestingUserState.labelFacets = requestingData.LabelFacets;
    state.requestingUserState.pageNumber = reqPageNumber;

    state.existingUserState.totalItems = existingData.TotalItems;
    state.existingUserState.userList = existingData.Users;
    state.existingUserState.labelFacets = existingData.LabelFacets;
    state.existingUserState.pageNumber = extPageNumber;
  },
  [USER_ACCESS_REQUEST]: state => {
    state.submitting = true;
  },
  [USER_ACCESS_FAIL]: (state, action) => {
    if (!state.error && action.payload) state.error = action.payload;
    state.submitting = false;
  },
  [USER_ACCESS_SUCCESS]: (state, action) => {
    state.submitting = false;
  },
  [UPDATE_SEARCH_TERM]: (state, action) => {
    state.searchTerm = action.payload;
  },
  [UPDATE_REQ_ITEMS]: (state, action) => {
    state.requestingUserState.itemsPerPage = action.payload;
  },
  [UPDATE_REQ_PAGINATION]: (state, action) => {
    state.requestingUserState.pageNumber = action.payload;
  },
  [UPDATE_REQ_SORT]: (state, action) => {
    let columnID = action.payload;
    let sortOrder = state.requestingUserState.sortOrder || 'asc';
    if (columnID === state.requestingUserState.sortColumn) {
      sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    }

    state.requestingUserState.sortColumn = columnID;
    state.requestingUserState.sortOrder = sortOrder;
  },
  [UPDATE_EXT_ITEMS]: (state, action) => {
    state.existingUserState.itemsPerPage = action.payload;
  },
  [UPDATE_EXT_PAGINATION]: (state, action) => {
    state.existingUserState.pageNumber = action.payload;
  },
  [UPDATE_EXT_SORT]: (state, action) => {
    let columnID = action.payload;
    let sortOrder = state.requestingUserState.sortOrder || 'asc';
    if (columnID === state.requestingUserState.sortColumn) {
      sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    }

    state.existingUserState.sortColumn = columnID;
    state.existingUserState.sortOrder = sortOrder;
  },
  [CHANGE_TAB]: (state, action) => {
    if (action.payload === REQUESTING || action.payload === EXISTING) state.tab = action.payload;
  },
  [USER_EDIT_REQUEST]: state => {
    state.submitting = true;
  },
  [USER_EDIT_SUCCESS]: state => {
    state.submitting = false;
    state.isShowingModal = false;
  },
  [USER_REVOKE_REQUEST]: state => {
    state.submitting = true;
  },
  [USER_REVOKE_SUCCESS]: state => {
    state.submitting = false;
  },
  [USER_REINSTATE_REQUEST]: state => {
    state.submitting = true;
  },
  [USER_REINSTATE_SUCCESS]: state => {
    state.submitting = false;
  },
});
