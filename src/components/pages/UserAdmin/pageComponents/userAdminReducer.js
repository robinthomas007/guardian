import { createReducer } from 'redux-starter-kit';
import { SET_ADMIN_LABEL_FACETS } from './userAdmin.types';

export const initialState = {
  userFacets: {},
  accessFacets: {},
  userTagList: [],
  accessTagList: [],
  isLabelRemoved: false,
};

export default createReducer(initialState, {
  [SET_ADMIN_LABEL_FACETS]: (state, action) => {
    if (
      (Object.keys(state.userFacets).length === 0 && state.userFacets.constructor === Object) ||
      action.result.isLabelRemoved
    ) {
      const usersFac = action.result.response.UserSearchResponse.LabelFacets;
      const userTagList = action.result.response.UserSearchResponse.TagList;
      state.userFacets = usersFac;
      state.userTagList = userTagList;
    }
    if (
      (Object.keys(state.accessFacets).length === 0 && state.accessFacets.constructor === Object) ||
      action.result.isLabelRemoved
    ) {
      const accessFac = action.result.response.AccessRequestSearchResponse.LabelFacets;
      const accessTagList = action.result.response.AccessRequestSearchResponse.TagList;
      state.accessFacets = accessFac;
      state.accessTagList = accessTagList;
    }
  },
});
