import * as actions from './release.types';
import Api from '../../../lib/api';
import history from '../../../history';
import { toast } from 'react-toastify';
import { showNotyError } from 'components/Utils';

// export const projectSuccess = data => {
//   return {
//     type: actions.PROJECT_SUCCESS,
//     data,
//   };
// };

// export const projectFailure = error => {
//   return {
//     type: actions.PROJECT_FAILURE,
//     message: error,
//   };
// };

// export const projectRequest = isLoading => {
//   return {
//     type: actions.PROJECT_REQUEST,
//     isLoading,
//   };
// };

// export const getProjectDetails = data => {
//   return dispatch => {
//     dispatch(projectRequest(true));
//     return Api.post('/project/review', data)
//       .then(response => response.json())
//       .then(response => {
//         if (response) {
//           dispatch(projectSuccess(response));
//           localStorage.removeItem('projectData');
//         } else {
//           dispatch(projectFailure(response.message));
//         }
//       })
//       .catch(error => {
//         console.log('error', error);
//         dispatch(projectFailure(error));
//       });
//   };
// };

// export const createReleaseInfo = data => {
//   return dispatch => {
//     dispatch(projectRequest(true));
//     return Api.post('/project/validate', data)
//       .then(response => response.json())
//       .then(response => {
//         dispatch(projectRequest(false));
//         localStorage.setItem('projectData', JSON.stringify(data));
//         toast.success('Your project has been successfully saved', {
//           position: toast.POSITION.TOP_CENTER,
//           className: 'foo-bar',
//         });
//         history.push('/projectContacts');
//       })
//       .catch(error => {
//         console.log('error', error);
//         dispatch(projectRequest(false));
//         dispatch(projectFailure(error));
//       });
//   };
// };

// export const updateReleaseInfo = (data, pathaname, clearLocal) => {
//   return dispatch => {
//     dispatch(projectRequest(true));
//     return Api.post('/project', data)
//       .then(response => response.json())
//       .then(response => {
//         if (response && response.Project && response.Project.projectID) {
//           if (clearLocal) {
//             localStorage.removeItem('projectData');
//             dispatch(projectSuccess(response));
//           } else {
//             localStorage.setItem('projectData', JSON.stringify(data));
//           }
//           toast.success('Your project has been successfully saved', {
//             position: toast.POSITION.TOP_CENTER,
//             className: 'foo-bar',
//           });
//           history.push(`/${pathaname}/${response.Project.projectID}`);
//         } else {
//           toast.error('Your project has NOT been successfully saved', {
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//         dispatch(projectRequest(false));
//       })
//       .catch(error => {
//         console.log('error', error);
//         toast.error('Your project has NOT been successfully saved', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//         dispatch(projectRequest(false));
//         dispatch(projectFailure(error));
//       });
//   };
// };

// export const validateEmailAndSubmit = (data, pathaname) => {
//   return dispatch => {
//     dispatch(projectRequest(true));
//     return Api.post('/project/validate/emails', { emails: data.projectAdditionalContacts })
//       .then(response => response.json())
//       .then(response => {
//         if (response.IsValid) {
//           dispatch(updateReleaseInfo({ Project: data }, pathaname, true));
//         } else {
//           toast.error('Your project has NOT been successfully saved', {
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//         dispatch(projectRequest(false));
//       })
//       .catch(error => {
//         console.log('error', error);
//         dispatch(projectRequest(false));
//         dispatch(projectFailure(error));
//       });
//   };
// };

// export const initialize = () => {
//   return {
//     type: actions.PROJECT_INITIALIZE,
//   };
// };

// export const clearProject = () => {
//   return dispatch => {
//     dispatch(initialize());
//   };
// };

export const findUpc = val => {
  return dispatch => {
    dispatch(upcRequest(true));
    return Api.post('/project/upc', { upc: val })
      .then(res => res.json())
      .then(response => {
        if (response && response.Status === 'OK') {
          dispatch(upcSuccess(response));
        } else {
          showNotyError('No matching UPC found.');
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
    dispatch(initialize());
  };
};
