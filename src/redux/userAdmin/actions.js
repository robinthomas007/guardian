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
        const user = JSON.parse(sessionStorage.getItem('user'));

        const UserSearchCriteria = (({ pageNumber, itemsPerPage, sortColumn, sortOrder }) => ({ pageNumber, itemsPerPage, sortColumn, sortOrder }))(
            getState().userAdmin.existingUserState
        );
        const AccessRequestSearchCriteria = (({ pageNumber, itemsPerPage, sortColumn, sortOrder }) => ({ pageNumber, itemsPerPage, sortColumn, sortOrder }))(
            getState().userAdmin.requestingUserState
        );

        // Both requesting and existing search use the same term right now
        UserSearchCriteria.searchTerm = getState().userAdmin.searchTerm;
        AccessRequestSearchCriteria.searchTerm = getState().userAdmin.searchTerm;

        const searchCriteria = JSON.stringify({
            User: { email: user.email },
            UserSearchCriteria,
            AccessRequestSearchCriteria,
        });

        dispatch(userSearchRequest());

        const fetchHeaders = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        return fetch('https://api-dev.umusic.net/guardian/admin/search', {
            method: 'POST',
            headers: fetchHeaders,
            body: searchCriteria,
        })
            .then(response => response.json())
            .then(json => dispatch(userSearchSuccess(json)))
            .catch(error => {
                console.error(error);
                dispatch(userSearchFail());
            });
    };
};

export const updateSearchTerm = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_SEARCH_TERM,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqItems = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_REQ_ITEMS,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqPagination = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_REQ_PAGINATION,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateReqSort = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_REQ_SORT,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtItems = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_EXT_ITEMS,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtPagination = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_EXT_PAGINATION,
            payload,
        });
        dispatch(fetchUsers());
    };
};

export const updateExtSort = payload => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_EXT_SORT,
            payload,
        });
        dispatch(fetchUsers());
    };
};
