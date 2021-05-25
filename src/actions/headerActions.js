import * as actions from 'types/notifications.types';
import Api from 'lib/api';

export const notificationSuccess = data => {
  return {
    type: actions.NOTIFICATION_SUCCESS,
    data,
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

export const getNotifications = () => {
  return dispatch => {
    dispatch(notificationRequest(true));
    return Api.get('/notifications')
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          dispatch(notificationSuccess(data));
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
