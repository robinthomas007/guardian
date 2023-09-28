import * as actions from 'types/audio.types';
import Api from 'lib/api';
import { showNotyInfo, showNotyWarning, renderMessage } from './../components/Utils';
import { startUpload, setUploadProgress, endUpload } from './../redux/uploadProgressAlert/actions';
import i18n from './../i18n';
import { toast } from 'react-toastify';

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
    // dispatch(fetchRequest(true));
    return Api.post('/project/isrc', data)
      .then(response => response.json())
      .then(response => {
        if (response.Status === 'OK' && response.ExTracks && response.ExTracks.length > 0) {
          dispatch(fetchSuccess(response.ExTracks));
        } else {
          showNotyWarning(i18n.t('audio:NoMatchingISRC'));
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

export const cisFetchRequest = (loading, Iscrs) => {
  return {
    type: actions.CIS_REQUEST,
    loading,
    Iscrs,
  };
};

export const getCisData = data => {
  const toastId = toast(
    renderMessage(i18n.t('audio:UploadInProgress'), 'uploading', 'uploading', 10),
    { autoClose: 10 },
  );
  return dispatch => {
    dispatch(cisFetchRequest(true, data.Iscrs));
    for (let i = 0; i < data.Iscrs.length; i++) {
      toast.update(toastId, {
        render: renderMessage(i18n.t('audio:UploadInProgress'), 'uploading', 'uploading', 50),
        autoClose: false,
        className: 'auto-progress',
      });
    }
    return Api.post('/media/api/cisupload', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.length > 0) {
          dispatch(cisFetchSuccess(response));
          for (let i = 0; i < data.Iscrs.length; i++) {
            toast.update(toastId, {
              render: renderMessage(
                i18n.t('audio:UploadInProgress'),
                'success',
                'Upload Success',
                100,
              ),
              autoClose: 1000,
              className: 'auto-success',
            });
          }
          if (data.mediaType === 2) {
            showNotyInfo(`${i18n.t('audio:weHaveFoundYourVideo')}`);
          } else {
            showNotyInfo(
              `${i18n.t('audio:weHaveFound')} ${response.length} ${i18n.t('audio:trackFromUMG')}`,
            );
          }
        } else {
          for (let i = 0; i < data.Iscrs.length; i++) {
            toast.update(toastId, {
              render: renderMessage(i18n.t('audio:UploadInProgress'), 'error', 'Upload Failed', 10),
              autoClose: 1000,
              className: 'auto-error',
            });
          }
          showNotyWarning(i18n.t('audio:NoFileFoundFromASPEN'));
          dispatch(cisFetchFailure(response));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(cisFetchFailure(error));
      });
  };
};
