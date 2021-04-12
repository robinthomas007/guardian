import { ACCESS_REQUEST, ACCESS_REQUEST_SUCCESS, ACCESS_REQUEST_FAIL } from './constants';

export const accessRequest = payload => ({
  type: ACCESS_REQUEST,
  payload,
});

export const accessRequestSuccess = payload => ({
  type: ACCESS_REQUEST_SUCCESS,
  payload,
});

export const accessRequestFail = payload => ({
  type: ACCESS_REQUEST_FAIL,
  payload,
});

export const requestAccess = user => {
  return dispatch => {
    dispatch(accessRequest());

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      FirstName: user.firstName,
      LastName: user.lastName,
      LabelID: user.primaryLabelID,
      Email: user.email,
      PhoneNumber: user.phoneNumber,
    });

    return fetch(window.env.api.url + '/access', {
      method: 'POST',
      headers,
      body,
    })
      .then(response => response.json())
      .then(json => {
        dispatch(accessRequestSuccess(json));
      })
      .catch(error => {
        console.error(error);
        dispatch(accessRequestFail());
      });
  };
};
