import * as actions from 'types/findProject.types';
import Api from 'lib/api';

export const fetchSuccess = result => {
  return {
    type: actions.GET_PROJECT_SUCCESS,
    result,
  };
};

export const fetchFailure = error => {
  return {
    type: actions.GET_PROJECT_FAILURE,
    message: error,
  };
};

export const fetchRequest = loading => {
  return {
    type: actions.GET_PROJECT_REQUEST,
    loading,
  };
};

export const fetchProjects = data => {
  return dispatch => {
    dispatch(fetchRequest(true));
    return Api.post('/project/search', data)
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
  type: actions.SAVE_FILTERS,
  filters,
});

export const changePageNumber = pageNo => ({
  type: actions.CHANGE_PAGE_NO,
  pageNo,
});

export const changeItemsPerPage = limit => ({
  type: actions.CHANGE_LIMIT,
  limit,
});

export const adminStatusChange = data => {
  return dispatch => {
    dispatch(fetchRequest(true));
    return Api.post('/project/status', data)
      .then(response => response.json())
      .then(response => {
        if (response) {
          dispatch(fetchRequest(false));
        } else {
          dispatch(fetchRequest(false));
        }
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchRequest(false));
        return error;
      });
  };
};
