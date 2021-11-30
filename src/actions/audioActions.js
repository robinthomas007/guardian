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

export const cisFetchSuccess = result => {
  return {
    type: actions.CIS_SUCCESS,
    result,
  };
};

export const cisFetchFailure = error => {
  return {
    type: actions.CIS_FAILURE,
    message: error,
  };
};

export const cisFetchRequest = loading => {
  return {
    type: actions.CIS_REQUEST,
    loading,
  };
};

export const getCisData = data => {
  return dispatch => {
    dispatch(cisFetchRequest(true));
    return Api.post('/media/api/cisupload', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.length > 0) {
          dispatch(cisFetchSuccess(response));
        } else {
          dispatch(cisFetchFailure(response));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(cisFetchFailure(error));
      });
  };
};
