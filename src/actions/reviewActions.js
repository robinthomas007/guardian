import * as actions from 'types/review.types';
import * as findProjectactions from 'types/findProject.types';

import Api from 'lib/api';
import { showNotyInfo, showNotyAutoError } from './../components/Utils';
import { fetchProjects } from './findProjectAction';

export const publishSuccess = comment => {
  return {
    type: actions.GET_PUBLISH_SUCCESS,
    comment,
  };
};

export const publishFailure = error => {
  return {
    type: actions.GET_PUBLISH_FAILURE,
    message: error,
  };
};

export const publishRequest = loading => {
  return {
    type: findProjectactions.GET_PROJECT_REQUEST,
    loading,
  };
};

export const handlePublish = (data, searchData) => {
  return dispatch => {
    dispatch(publishRequest(true));
    return Api.post('/project/publish ', data)
      .then(response => response.json())
      .then(response => {
        if (response.Result) {
          showNotyInfo(response.message);
          dispatch(publishSuccess(response));
          dispatch(fetchProjects({ searchCriteria: searchData }));
        } else {
          showNotyAutoError('Publishing Project Failed');
          dispatch(publishFailure(response.message));
        }
        dispatch(publishRequest(false));
        return response;
      })
      .catch(error => {
        console.log('error', error);
        dispatch(publishRequest(false));
        dispatch(publishFailure(error));
        return error;
      });
  };
};
