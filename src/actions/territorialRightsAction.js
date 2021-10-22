import * as actions from 'types/rights.types';
import Api from 'lib/api';
import { showNotyError } from './../components/Utils';
import React from 'react';

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

export const projectStatusUpdate = status => {
  return {
    type: actions.STATUS_UPDATE,
    status,
  };
};

export const updateProjectStatus = data => {
  return () => {
    return Api.post('/project/statusnonadmin', data);
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
              <span>
                We do not own the rights to one or more of the tracks in your project. They are
                displayed in the left column in red and can not be assigned to a rights template.
                <br /> Please remove them from your project or correct the rights status outside of
                the Guardian to continue.
              </span>,
            );
            dispatch(
              updateProjectStatus({
                ProjectId: val.ProjectId,
                StatusId: '4',
                User: {
                  email: val.User.email,
                },
              }),
            )
              .then(response => response.json())
              .then(response => {
                if (response.success) {
                  dispatch(projectStatusUpdate('No Rights'));
                }
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            dispatch(
              updateProjectStatus({
                ProjectId: val.ProjectId,
                StatusId: '1',
                User: {
                  email: val.User.email,
                },
              }),
            )
              .then(response => response.json())
              .then(response => {
                if (response.success) {
                  dispatch(projectStatusUpdate('In Progress'));
                }
              })
              .catch(error => {
                console.error(error);
              });
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
