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
    return Api.post('/comment/create', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.Comment) {
          dispatch(commentSuccess(response.Comment));
        } else {
          dispatch(commentFailure(response.message));
        }
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(commentFailure(error));
        return error;
      });
  };
};

export const getCommentSuccess = comments => {
  return {
    type: actions.GET_COMMENT_SUCCESS,
    comments,
  };
};

export const getComments = data => {
  return dispatch => {
    dispatch(commentRequest(true));
    return Api.post('/comments', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.Comments) {
          dispatch(getCommentSuccess(response.Comments));
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
