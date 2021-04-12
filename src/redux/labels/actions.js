import { LABELS_REQUEST, LABELS_REQUEST_SUCCESS, LABELS_REQUEST_FAIL } from './constants';

export const labelsRequest = payload => ({
  type: LABELS_REQUEST,
  payload,
});

export const labelsRequestSuccess = payload => ({
  type: LABELS_REQUEST_SUCCESS,
  payload,
});

export const labelsRequestFail = payload => ({
  type: LABELS_REQUEST_FAIL,
  payload,
});

export const fetchLabels = () => {
  return dispatch => {
    dispatch(labelsRequest());

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return fetch(window.env.api.url + '/labels', {
      method: 'GET',
      headers,
    })
      .then(response => response.json())
      .then(json => dispatch(labelsRequestSuccess(json)))
      .catch(error => {
        console.error(error);
        dispatch(labelsRequestFail());
      });
  };
};
