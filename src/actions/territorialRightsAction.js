import * as actions from 'types/rights.types';
import Api from 'lib/api';
import { showNotyAutoError } from './../components/Utils';

export const rightsSuccess = (TerritorialRightsSets, UnassignedTracks) => {
  return {
    type: actions.RIGHTS_SUCCESS,
    TerritorialRightsSets,
    UnassignedTracks,
  };
};

export const rightsFailure = error => {
  return {
    type: actions.RIGHTS_FAILURE,
    message: error,
  };
};

export const rightRequest = isLoading => {
  return {
    type: actions.RIGHTS_REQUEST,
    isLoading,
  };
};

export const getRights = val => {
  return dispatch => {
    dispatch(rightRequest(true));
    return Api.post('/project/ugcrights', val)
      .then(response => response.json())
      .then(response => {
        if (response.Status === 'OK') {
          dispatch(rightsSuccess(response.TerritorialRightsSets, response.UnassignedTracks));
        } else {
          dispatch(rightsFailure(response.message));
        }
      })
      .catch(error => {
        console.log('error', error);
        dispatch(rightsFailure(error));
      });
  };
};
