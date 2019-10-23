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
    SHOW_USER_MODAL,
    HIDE_USER_MODAL,
    SET_USER_TO_EDIT,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_REVOKE_REQUEST,
    USER_REVOKE_SUCCESS,
    USER_REINSTATE_REQUEST,
    USER_REINSTATE_SUCCESS,
    MODIFY,
    REVOKE,
    REINSTATE,
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

export const showUserModal = payload => ({
    type: SHOW_USER_MODAL,
    payload,
});

export const hideUserModal = payload => ({
    type: HIDE_USER_MODAL,
    payload,
});

export const setUserToEdit = payload => ({
    type: SET_USER_TO_EDIT,
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
                } else {
                    dispatch(userAccessSuccess(json));
                    dispatch(userSearchSuccess(json));
                }
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

export const userEditRequest = payload => ({
    type: USER_EDIT_REQUEST,
    payload,
});

export const userEditSuccess = payload => ({
    type: USER_EDIT_SUCCESS,
    payload,
});

export const editUser = userToEdit => {
    return (dispatch, getState) => {
        // Clear Existing Errors First
        dispatch(hideError());
        const user = JSON.parse(sessionStorage.getItem('user'));
        const UserSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.existingUserState);
        const AccessRequestSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.requestingUserState);

        const body = JSON.stringify({
            User: { email: user.email },
            ExistingUserID: userToEdit.userID,
            Action: MODIFY,
            FirstName: userToEdit.firstName,
            LastName: userToEdit.lastName,
            LabelID: userToEdit.primaryLabelID,
            PhoneNumber: userToEdit.phoneNumber,
            UserSearchCriteria,
            AccessRequestSearchCriteria,
        });

        dispatch(userEditRequest());

        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        return fetch('https://api-dev.umusic.net/guardian/admin/user', {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(json => {
                if (json.errorMessage) {
                    console.error(json.errorMessage);
                    dispatch(showError(json.errorMessage));
                } else {
                    dispatch(userEditSuccess(json));
                    dispatch(userSearchSuccess(json));
                }
            })
            .catch(error => {
                console.error(error);
                dispatch(showError(error));
                // Show edit error?
            });
    };
};

export const userRevokeRequest = payload => ({
    type: USER_REVOKE_REQUEST,
    payload,
});

export const userRevokeSuccess = payload => ({
    type: USER_REVOKE_SUCCESS,
    payload,
});

export const userReinstateRequest = payload => ({
    type: USER_REINSTATE_REQUEST,
    payload,
});

export const userReinstateSuccess = payload => ({
    type: USER_REINSTATE_SUCCESS,
    payload,
});

export const revokeReinstnateUser = (ExistingUserID, action) => {
    return (dispatch, getState) => {
        // Clear Existing Errors First
        dispatch(hideError());
        const user = JSON.parse(sessionStorage.getItem('user'));
        const UserSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.existingUserState);
        const AccessRequestSearchCriteria = getSearchCriteria(getState().userAdmin.searchTerm, getState().userAdmin.requestingUserState);

        const body = JSON.stringify({
            User: { email: user.email },
            ExistingUserID,
            Action: action,
            UserSearchCriteria,
            AccessRequestSearchCriteria,
        });

        if (action === REVOKE) dispatch(userRevokeRequest());
        else if (action === REINSTATE) dispatch(userReinstateRequest());

        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        return fetch('https://api-dev.umusic.net/guardian/admin/user', {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(json => {
                if (json.errorMessage) {
                    console.error(json.errorMessage);
                    dispatch(showError(json.errorMessage));
                } else {
                    if (action === REVOKE) dispatch(userRevokeSuccess(json));
                    else if (action === REINSTATE) dispatch(userReinstateSuccess(json));
                    dispatch(userSearchSuccess(json));
                }
            })
            .catch(error => {
                console.error(error);
                dispatch(showError(error));
                // Dispatch specific action failure?
                // if (action === REVOKE)
                // else if (action === REINSTATE)
            });
    };
};
