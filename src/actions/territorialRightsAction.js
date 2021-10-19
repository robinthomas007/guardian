import * as actions from 'types/rights.types';
import Api from 'lib/api';
import { showNotyError } from './../components/Utils';

export const rightsSuccess = (TerritorialRightsSets, UnassignedTracks, NoRightsTracks) => {
  return {
    type: actions.RIGHTS_SUCCESS,
    TerritorialRightsSets,
    UnassignedTracks,
    NoRightsTracks,
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
          if (response.NoRightsTracks && response.NoRightsTracks.length > 0) {
            showNotyError("Some of the ISRC's are not having rights");
          }
          dispatch(
            rightsSuccess(
              response.TerritorialRightsSets,
              response.UnassignedTracks,
              response.NoRightsTracks,
            ),
          );
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
