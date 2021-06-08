import * as actions from 'types/inbox.types';
import Api from 'lib/api';

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
