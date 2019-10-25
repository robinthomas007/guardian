import { createReducer } from 'redux-starter-kit';
import { ACCESS_REQUEST, ACCESS_REQUEST_SUCCESS, ACCESS_REQUEST_FAIL } from './constants';

export const initialState = {
    submitting: false,
    success: false,
};

export default createReducer(initialState, {
    [ACCESS_REQUEST]: state => {
        state.submitting = true;
        state.success = false;
    },
    [ACCESS_REQUEST_FAIL]: state => {
        state.submitting = false;
        state.success = false;
    },
    [ACCESS_REQUEST_SUCCESS]: state => {
        state.submitting = false;
        state.success = true;
    },
});
