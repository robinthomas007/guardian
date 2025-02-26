import * as actions from './release.types';
import Api from '../../../lib/api';
import { showNotyWarning } from 'components/Utils';
import i18n from './../../../i18n';

export const getProjectDetails = data => {
  return () => {
    return Api.post('/project/review', data);
  };
};

export const submitProjectDetails = data => {
  return () => {
    return Api.post('/project', data);
  };
};

export const validateProjectDetails = data => {
  return () => {
    return Api.post('/project/validate', data);
  };
};

export const validateEmails = data => {
  return () => {
    return Api.post('/project/validate/emails', data);
  };
};

export const getCisCoverArt = projectId => {
  return () => {
    return Api.get('/media/api/cisimageupload?projectId=' + projectId);
  };
};

export const findUpc = val => {
  return dispatch => {
    dispatch(upcRequest(true));
    return Api.post('/project/upc', val)
      .then(res => res.json())
      .then(response => {
        if (response && response.Status === 'OK') {
          dispatch(upcSuccess(response));
        } else {
          showNotyWarning(i18n.t('releaseInfo:NoMatchingUPCfound'));
          localStorage.removeItem('upc');
        }
        dispatch(upcRequest(false));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(upcRequest(false));
        dispatch(upcFailure(error));
      });
  };
};

export const upcSuccess = data => {
  return {
    type: actions.UPC_SUCCESS,
    data,
  };
};

export const upcFailure = error => {
  return {
    type: actions.UPC_FAILURE,
    message: error,
  };
};

export const upcRequest = isLoading => {
  return {
    type: actions.UPC_REQUEST,
    isLoading,
  };
};

export const initialize = () => {
  return {
    type: actions.UPC_INITIALIZE,
  };
};

export const initializeUpcData = () => {
  return dispatch => {
    localStorage.removeItem('upc');
    dispatch(initialize());
  };
};
