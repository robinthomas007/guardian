import { createReducer } from 'redux-starter-kit';
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from '../types/notifications.types';

export const initialState = {
  notifications: [
    {
      alias: 'RT',
      name: 'Robin Thomas',
      project: 'My Sweet Project',
      time: '2 Hours Ago',
    },
    {
      alias: 'CR',
      name: 'Christy Robin',
      project: 'My Awesome Project',
      time: '3 Days Ago',
    },
  ],
};

export default createReducer(initialState, {
  [NOTIFICATION_REQUEST]: (state, action) => {},
  [NOTIFICATION_SUCCESS]: (state, action) => {
    state.notifications = action.notifications;
  },
  [NOTIFICATION_FAILURE]: (state, action) => {},
});
