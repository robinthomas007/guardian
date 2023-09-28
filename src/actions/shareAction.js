import * as actions from 'types/share.types';
import Api from 'lib/api';
import { showNotySucess, showNotyAutoError } from './../components/Utils';

export const shareSuccess = comment => {
  return {
    type: actions.SHARE_SUCCESS,
    comment,
  };
};

export const shareFailure = error => {
  return {
    type: actions.SHARE_FAILURE,
    message: error,
  };
};

export const shareRequest = loading => {
  return {
    type: actions.SHARE_REQUEST,
    loading,
  };
};

export const postEmails = data => {
  return dispatch => {
    dispatch(shareRequest(true));
    return Api.post('/project/sendemailtrack', data)
      .then(response => response.json())
      .then(response => {
        if (response.result) {
          showNotySucess(response.message);
          dispatch(shareSuccess(response.Comment));
        } else {
          showNotyAutoError('Error sending email');
          dispatch(shareFailure(response.message));
        }
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(shareFailure(error));
        return error;
      });
  };
};
