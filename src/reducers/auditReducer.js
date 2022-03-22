import { createReducer } from 'redux-starter-kit';
import { AUDIT_REQUEST, AUDIT_FAILURE, AUDIT_SUCCESS } from '../types/audit.types';

export const initialState = {
  loading: false,
  audit: [],
  message: null,
};

export default createReducer(initialState, {
  [AUDIT_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [AUDIT_SUCCESS]: (state, action) => {
    state.audit = action.audit;
    state.loading = false;
  },
  [AUDIT_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
});
