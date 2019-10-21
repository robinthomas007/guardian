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
    USER_ACCESS_REQUEST,
    USER_ACCESS_SUCCESS,
    USER_ACCESS_FAIL,
    SHOW_ERROR,
    HIDE_ERROR,
} from './constants';

const getSearchCriteria = (searchTerm, searchState) => {
    const searchCriteria = (({ pageNumber, itemsPerPage, sortColumn, sortOrder }) => ({
        pageNumber,
        itemsPerPage,
        sortColumn,
        sortOrder,
    }))(searchState);

    searchCriteria.searchTerm = searchTerm;

    return searchCriteria;
};

export const showError = payload => ({
    type: SHOW_ERROR,
    payload,
});

export const hideError = payload => ({
    type: HIDE_ERROR,
    payload,
});

export const userSearchRequest = payload => ({
    type: USER_SEARCH_REQUEST,
    payload,
});

export const userSearchSuccess = payload => ({
    type: USER_SEARCH_SUCCESS,
    payload,
});

export const userSearchFail = payload => ({
    type: USER_SEARCH_FAIL,
    payload,
});

export const fetchUsers = () => {
    return (dispatch, getState) => {
        // Clear Existing Errors First
        dispatch(hideError());

        const user = JSON.parse(sessionStorage.getItem('user'));
        const UserSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.existingUserState);
        const AccessRequestSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.requestingUserState);

        const body = JSON.stringify({
            User: { email: user.email },
            UserSearchCriteria,
            AccessRequestSearchCriteria,
        });

        dispatch(userSearchRequest());

        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        return fetch('https://api-dev.umusic.net/guardian/admin/search', {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(json => dispatch(userSearchSuccess(json)))
            .catch(error => {
                console.error(error);
                dispatch(showError(error));
                dispatch(userSearchFail());
            });
    };
};

export const userAccessRequest = payload => ({
    type: USER_ACCESS_REQUEST,
    payload,
});

export const userAccessSuccess = payload => ({
    type: USER_ACCESS_SUCCESS,
    payload,
});

export const userAccessFail = payload => ({
    type: USER_ACCESS_FAIL,
    payload,
});

export const approveDenyUser = (accessRequestID, action) => {
    return (dispatch, getState) => {
        debugger;
        // Clear Existing Errors First
        dispatch(hideError());

        const user = JSON.parse(sessionStorage.getItem('user'));
        const UserSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.existingUserState);
        const AccessRequestSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.requestingUserState);

        const body = JSON.stringify({
            User: { email: user.email },
            AccessRequestID: accessRequestID,
            Action: action,
            UserSearchCriteria,
            AccessRequestSearchCriteria,
        });

        dispatch(userAccessRequest());

        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        return fetch('https://api-dev.umusic.net/guardian/admin/access', {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(json => {
                if (json.errorMessage) {
                    console.error(json.errorMessage);
                    dispatch(showError(json.errorMessage));
                    dispatch(userAccessFail());
                } else dispatch(userAccessSuccess(json));
            })
            .catch(error => {
                console.error(error);
                dispatch(showError(error));
                dispatch(userAccessFail());
            });
    };
};

export const updateSearchTerm = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_SEARCH_TERM,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqItems = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_REQ_ITEMS,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqPagination = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_REQ_PAGINATION,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqSort = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_REQ_SORT,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtItems = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_EXT_ITEMS,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtPagination = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_EXT_PAGINATION,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtSort = payload => {
    return dispatch => {
        dispatch({
            type: UPDATE_EXT_SORT,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const changeTab = payload => ({
    type: CHANGE_TAB,
    payload,
});
