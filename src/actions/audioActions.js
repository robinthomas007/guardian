import * as actions from 'types/audio.types';
import Api from 'lib/api';
import { showNotyAutoError } from './../components/Utils';

export const fetchSuccess = result => {
  return {
    type: actions.ISRC_CHECK_SUCCESS,
    result,
  };
};

export const fetchFailure = error => {
  return {
    type: actions.ISRC_CHECK_FAILURE,
    message: error,
  };
};

export const fetchRequest = loading => {
  return {
    type: actions.ISRC_CHECK_REQUEST,
    loading,
  };
};

export const isrcCheck = data => {
  return dispatch => {
    dispatch(fetchRequest(true));
    return Api.post('/project/isrc', data)
      .then(response => response.json())
      .then(response => {
        if (response.Status === 'OK' && response.ExTracks && response.ExTracks.length > 0) {
          console.log('success');
          dispatch(fetchSuccess(response.ExTracks));
        } else {
          showNotyAutoError('No matching ISRC found');
          dispatch(fetchFailure(response.message));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchFailure(error));
      });
  };
};
