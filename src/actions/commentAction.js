import * as actions from 'types/comments.types';
import Api from 'lib/api';

export const commentSuccess = comment => {
  return {
    type: actions.COMMENT_SUCCESS,
    comment,
  };
};

export const commentFailure = error => {
  return {
    type: actions.COMMENT_FAILURE,
    message: error,
  };
};

export const commentRequest = loading => {
  return {
    type: actions.COMMENT_REQUEST,
    loading,
  };
};

export const postComment = data => {
  return dispatch => {
    dispatch(commentRequest(true));
    return Api.post('/project/search', data)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(commentSuccess(response));
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
