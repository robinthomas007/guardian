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

export const updateProjectStatus = data => {
  return () => {
    return Api.post('/project/status', data);
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
            showNotyError(
              'We do not own the rights to one or more of the tracks in your project. They are displayed in the left column in red and can not be assigned to a rights template. Please remove them from your project or correct the rights status outside of the Guardian to continue.',
            );
            dispatch(updateProjectStatus({ ProjectIds: [val.projectID], StatusID: '4' }))
              .then(response => response.json())
              .then(response => {})
              .catch(error => {
                console.error(error);
              });
          } else {
            dispatch(updateProjectStatus({ ProjectIds: [val.projectID], StatusID: '1' }));
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

export const initializeRights = () => {
  return {
    type: actions.INITIALIZE_RIGHTS,
  };
};

export const initializeRightsData = () => {
  return dispatch => {
    dispatch(initializeRights());
  };
};
