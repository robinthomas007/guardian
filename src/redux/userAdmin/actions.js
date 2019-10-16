import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL } from './constants';

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
