import * as actions from 'types/notifications.types';
import Api from 'lib/api';

export const notificationSuccess = data => {
  return {
    type: actions.NOTIFICATION_SUCCESS,
    data,
    count: data.length,
  };
};

export const notificationFailure = error => {
  return {
    type: actions.NOTIFICATION_FAILURE,
    message: error,
  };
};

export const notificationRequest = isLoading => {
  return {
    type: actions.NOTIFICATION_REQUEST,
    isLoading,
  };
};

export const getNotifications = val => {
  return dispatch => {
    dispatch(notificationRequest(true));
    return Api.post('/notifications/unread', val)
      .then(response => response.json())
      .then(response => {
        if (response.Notifications) {
          dispatch(notificationSuccess(response.Notifications));
        } else {
          dispatch(notificationFailure(response.message));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(notificationFailure(error));
      });
  };
};
