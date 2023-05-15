import { createReducer } from 'redux-starter-kit';
import { SET_ADMIN_LABEL_FACETS } from './userAdmin.types';

export const initialState = {
  userFacets: {},
  accessFacets: {},
};

export default createReducer(initialState, {
  [SET_ADMIN_LABEL_FACETS]: (state, action) => {
    if (Object.keys(state.userFacets).length === 0 && state.userFacets.constructor === Object) {
      const usersFac = action.result.UserSearchResponse.LabelFacets;
      state.userFacets = usersFac;
    }
    if (Object.keys(state.accessFacets).length === 0 && state.accessFacets.constructor === Object) {
      const accessFac = action.result.AccessRequestSearchResponse.LabelFacets;
      state.accessFacets = accessFac;
    }
  },
});
