import * as actions from 'types/audio.types';
import Api from 'lib/api';
import { showNotyAutoError, showNotyInfo } from './../components/Utils';
import { startUpload, setUploadProgress, endUpload } from './../redux/uploadProgressAlert/actions';
export const fetchSuccess = result => {
  return {
    type: actions.ISRC_CHECK_SUCCESS,
    result,
    loading: false,
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
    for (let i = 0; i < data.Iscrs.length; i++) {
      dispatch(startUpload('CIS' + i));
      dispatch(setUploadProgress('CIS' + i, 100));
    }
    return Api.post('/media/api/cisupload', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.length > 0) {
          dispatch(cisFetchSuccess(response));
          for (let i = 0; i < data.Iscrs.length; i++) {
            dispatch(endUpload('CIS' + i));
          }
          showNotyInfo(
            `We've found and uploaded ${response.length} Tracks from UMG's ASPEN repository`,
          );
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
