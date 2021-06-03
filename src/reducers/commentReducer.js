import { createReducer } from 'redux-starter-kit';
import {
  COMMENT_REQUEST,
  COMMENT_FAILURE,
  COMMENT_SUCCESS,
  GET_COMMENT_SUCCESS,
} from '../types/comments.types';

export const initialState = {
  loading: false,
  comments: [],
  message: null,
};

export default createReducer(initialState, {
  [COMMENT_REQUEST]: (state, action) => {
    state.loading = action.loading;
  },
  [COMMENT_SUCCESS]: (state, action) => {
    state.comments = [...state.comments, action.comment];
    state.loading = false;
  },
  [COMMENT_FAILURE]: (state, action) => {
    state.loading = false;
    state.message = action.message;
  },
  [GET_COMMENT_SUCCESS]: (state, action) => {
    state.comments = action.comments;
    state.loading = false;
  },
});
