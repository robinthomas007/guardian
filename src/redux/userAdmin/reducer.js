import { USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL } from './constants';

export const initialState = {
    data: null,
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
            return {
                ...state,
                data: action.payload,
                submitting: false,
            };
        case USER_SEARCH_FAIL:
            return {
                ...state,
                data: null,
                error: action.payload,
                submitting: false,
            };
        default:
            return state;
    }
};
