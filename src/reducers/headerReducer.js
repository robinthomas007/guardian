import { createReducer } from 'redux-starter-kit';
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from '../types/notifications.types';

export const initialState = {
  notifications: [],
  count: 0,
  error: null,
};

export default createReducer(initialState, {
  [NOTIFICATION_REQUEST]: (state, action) => {},
  [NOTIFICATION_SUCCESS]: (state, action) => {
    state.notifications = action.data;
    state.count = action.count;
    state.error = null;
  },
  [NOTIFICATION_FAILURE]: (state, action) => {
    state.error = action.message;
  },
});
