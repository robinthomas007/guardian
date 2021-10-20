import * as actions from './release.types';
import Api from '../../../lib/api';
import history from '../../../history';
import { toast } from 'react-toastify';
import { showNotyAutoError } from 'components/Utils';
import * as rightsActions from '../../../types/rights.types';

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
          showNotyAutoError('No matching UPC found.');
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

export const initializeRights = () => {
  return {
    type: rightsActions.INITIALIZE_RIGHTS,
  };
};

export const initializeUpcData = () => {
  return dispatch => {
    localStorage.removeItem('upc');
    dispatch(initialize());
    dispatch(initializeRights());
  };
};
