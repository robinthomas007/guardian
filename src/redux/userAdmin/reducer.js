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
} from './constants';

export const initialState = {
    searchTerm: '',
    tab: 'requesting',
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
    [USER_SEARCH_REQUEST]: state => {
        state.submitting = true;
    },
    [USER_SEARCH_FAIL]: (state, action) => {
        state.error = action.payload;
        state.submitting = false;
        state.requestingUserState = initialState.requestingUserState;
        state.existingUserState = initialState.existingUserState;
    },
    [USER_SEARCH_SUCCESS]: (state, action) => {
        let requestingData = action.payload.AccessRequestSearchResponse;
        let existingData = action.payload.UserSearchResponse;

        let reqPageNumber = requestingData.totalPages > state.requestingUserState.pageNumber ? state.requestingUserState.pageNumber : requestingData.totalPages;
        let extPageNumber = existingData.totalPages > state.existingUserState.pageNumber ? state.existingUserState.pageNumber : existingData.totalPages;

        state.requestingUserState.totalItems = requestingData.TotalItems;
        state.requestingUserState.userList = requestingData.AccessRequests;
        state.requestingUserState.labelFacets = requestingData.LabelFacets;
        state.requestingUserState.pageNumber = reqPageNumber;

        state.existingUserState.totalItems = existingData.TotalItems;
        state.existingUserState.userList = existingData.Users;
        state.existingUserState.labelFacets = existingData.LabelFacets;
        state.existingUserState.pageNumber = extPageNumber;

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
});
