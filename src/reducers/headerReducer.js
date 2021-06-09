import { createReducer } from 'redux-starter-kit';
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from '../types/notifications.types';

export const initialState = {
  notifications: [],
};

export default createReducer(initialState, {
  [NOTIFICATION_REQUEST]: (state, action) => {},
  [NOTIFICATION_SUCCESS]: (state, action) => {
    state.notifications = action.data;
  },
  [NOTIFICATION_FAILURE]: (state, action) => {},
});
