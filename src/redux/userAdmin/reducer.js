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
} from './constants';

let sortColumn;
let sortOrder;
let columnID;

export const initialState = {
    searchTerm: '',
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

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return {
                ...state,
                error: null,
                submitting: true,
            };
        case USER_SEARCH_SUCCESS:
            let requestingData = action.payload.AccessRequestSearchResponse;
            let existingData = action.payload.UserSearchResponse;

            let reqPageNumber =
                requestingData.totalPages > state.requestingUserState.pageNumber ? state.requestingUserState.pageNumber : requestingData.totalPages;
            let extPageNumber = existingData.totalPages > state.existingUserState.pageNumber ? state.existingUserState.pageNumber : existingData.totalPages;

            return {
                ...state,
                requestingUserState: {
                    ...state.requestingUserState,
                    totalItems: requestingData.TotalItems,
                    userList: requestingData.AccessRequests,
                    labelFacets: requestingData.LabelFacets,
                    pageNumber: reqPageNumber,
                },
                existingUserState: {
                    ...state.existingUserState,
                    totalItems: existingData.TotalItems,
                    userList: existingData.Users,
                    labelFacets: existingData.LabelFacets,
                    pageNumber: extPageNumber,
                },
                submitting: false,
            };
        case USER_SEARCH_FAIL:
            return {
                ...state,
                requestingUserState: initialState.requestingUserState,
                existingUserState: initialState.existingUserState,
                error: action.payload,
                submitting: false,
            };
        case UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case UPDATE_REQ_ITEMS:
            console.log(action.payload);
            return {
                ...state,
                requestingUserState: {
                    ...state.requestingUserState,
                    itemsPerPage: action.payload,
                },
            };
        case UPDATE_REQ_PAGINATION:
            return {
                ...state,
                requestingUserState: {
                    ...state.requestingUserState,
                    pageNumber: action.payload,
                },
            };
        case UPDATE_REQ_SORT:
            columnID = action.payload;
            sortColumn = columnID;
            sortOrder = state.requestingUserState.sortOrder || 'asc';
            if (columnID === state.requestingUserState.sortColumn) {
                sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            }
            return {
                ...state,
                requestingUserState: {
                    ...state.requestingUserState,
                    sortColumn,
                    sortOrder,
                },
            };
        case UPDATE_EXT_ITEMS:
            return {
                ...state,
                existingUserState: {
                    ...state.existingUserState,
                    itemsPerPage: action.payload,
                },
            };
        case UPDATE_EXT_PAGINATION:
            return {
                ...state,
                existingUserState: {
                    ...state.existingUserState,
                    pageNumber: action.payload,
                },
            };
        case UPDATE_EXT_SORT:
            columnID = action.payload;
            sortColumn = columnID;
            sortOrder = state.requestingUserState.sortOrder || 'asc';
            if (columnID === state.requestingUserState.sortColumn) {
                sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
            }
            return {
                ...state,
                existingUserState: {
                    ...state.existingUserState,
                    sortColumn,
                    sortOrder,
                },
            };
        default:
            return state;
    }
};
