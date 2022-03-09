import * as actions from 'types/review.types';
import Api from 'lib/api';
import { showNotyInfo, showNotyAutoError } from './../components/Utils';

export const publishSuccess = comment => {
  return {
    type: actions.GET_PUBLISH_SUCCESS,
    comment,
  };
};

export const publishFailure = error => {
  return {
    type: actions.GET_PUBLISH_FAILURE,
    message: error,
  };
};

export const publishRequest = loading => {
  return {
    type: actions.GET_PUBLISH_REQUEST,
    loading,
  };
};

export const handlePublish = data => {
  return dispatch => {
    dispatch(publishRequest(true));
    return Api.post('/project/publish ', data)
      .then(response => response.json())
      .then(response => {
        if (response.Result) {
          showNotyInfo(response.message);
          dispatch(publishSuccess(response));
        } else {
          showNotyAutoError('Publishing Project Failed');
          dispatch(publishFailure(response.message));
        }
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(publishFailure(error));
        return error;
      });
  };
};
