import * as actions from 'types/audit.types';
import Api from 'lib/api';
import { showNotyAutoError } from './../components/Utils';

export const auditSuccess = audit => {
  return {
    type: actions.AUDIT_SUCCESS,
    audit,
  };
};

export const auditFailure = error => {
  return {
    type: actions.AUDIT_FAILURE,
    message: error,
  };
};

export const auditRequest = loading => {
  return {
    type: actions.AUDIT_REQUEST,
    loading,
  };
};

export const getAuditData = data => {
  return dispatch => {
    dispatch(auditRequest(true));
    return Api.post('/project/audit', data)
      .then(response => response.json())
      .then(response => {
        if (response && response.length > 0) {
          dispatch(auditSuccess(response));
        } else {
          showNotyAutoError(response.message);
          dispatch(auditFailure(response.message));
        }
        dispatch(auditRequest(false));
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(auditRequest(false));
        dispatch(auditFailure(error));
        return error;
      });
  };
};
