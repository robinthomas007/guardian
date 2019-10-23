import { createReducer } from 'redux-starter-kit';
import { LABELS_REQUEST, LABELS_REQUEST_SUCCESS, LABELS_REQUEST_FAIL } from './constants';

export const initialState = {
    submitting: false,
    labels: [],
};

export default createReducer(initialState, {
    [LABELS_REQUEST]: state => {
        state.submitting = true;
    },
    [LABELS_REQUEST_FAIL]: state => {
        state.submitting = false;
    },
    [LABELS_REQUEST_SUCCESS]: (state, action) => {
        state.submitting = false;
        state.labels = action.payload.ReleasingLabels;
    },
});
