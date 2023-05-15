import * as actions from './userAdmin.types';
export const setFacetsSuccess = result => {
  return {
    type: actions.SET_ADMIN_LABEL_FACETS,
    result,
  };
};

export const setFacets = data => {
  return dispatch => {
    dispatch(setFacetsSuccess(data));
  };
};
