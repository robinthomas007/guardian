import * as actions from 'types/inbox.types';
import Api from 'lib/api';
import { notificationSuccess } from './../actions/headerActions';
export const fetchSuccess = result => {
  return {
    type: actions.GET_INBOX_SUCCESS,
    result,
  };
};

export const fetchFailure = error => {
  return {
    type: actions.GET_INBOX_FAILURE,
    message: error,
  };
};

export const fetchRequest = loading => {
  return {
    type: actions.GET_INBOX_REQUEST,
    loading,
  };
};

export const fetchInboxNotifications = data => {
  return dispatch => {
    dispatch(fetchRequest(true));
    return Api.post('/notification/search', data)
      .then(response => response.json())
      .then(response => {
        if (response) {
          dispatch(fetchSuccess(response));
          dispatch(notificationSuccess(response.UnreadNotifications));
        } else {
          dispatch(fetchFailure(response.message));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchFailure(error));
      });
  };
};

export const saveFilters = filters => ({
  type: actions.SAVE_FILTERS_INBOX,
  filters,
});

export const changePageNumber = pageNo => ({
  type: actions.CHANGE_PAGE_NO_INBOX,
  pageNo,
});

export const changeItemsPerPage = limit => ({
  type: actions.CHANGE_LIMIT_INBOX,
  limit,
});

export const markAsRead = id => ({
  type: actions.MARK_AS_READ,
  id,
});

export const readNotification = obj => {
  return dispatch => {
    dispatch(fetchRequest(true));
    return Api.post('/notification/read', obj)
      .then(response => response.json())
      .then(response => {
        if (response) {
          dispatch(fetchRequest(false));
          dispatch(markAsRead(obj.NotificationId));
          dispatch(notificationSuccess(response.UnreadNotifications));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchRequest(false));
        dispatch(fetchFailure(error));
      });
  };
};
