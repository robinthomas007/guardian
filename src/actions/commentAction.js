import * as actions from 'types/comments.types';
import Api from 'lib/api';

export const commentSuccess = data => {
  return {
    type: actions.COMMENT_SUCCESS,
    data,
  };
};

export const commentFailure = error => {
  return {
    type: actions.COMMENT_FAILURE,
    message: error,
  };
};

export const commentRequest = isLoading => {
  return {
    type: actions.COMMENT_REQUEST,
    isLoading,
  };
};

export const postComment = data => {
  return dispatch => {
    dispatch(commentRequest(true));
    return Api.post('/project/search', data)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          dispatch(commentSuccess(data));
        } else {
          dispatch(commentFailure(response.message));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(commentFailure(error));
      });
  };
};
