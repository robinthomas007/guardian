import { createReducer } from 'redux-starter-kit';
import { COMMENT_REQUEST, COMMENT_FAILURE, COMMENT_SUCCESS } from '../types/comments.types';

export const initialState = {
  loading: false,
  comments: [
    {
      date: '02/04/20',
      name: 'Ethan Karp',
      step: 'Release Notes',
      comment: 'Is this the correct label for this project?',
    },
    {
      date: '02/04/20',
      name: 'Ethan Karp',
      step: 'Release Notes',
      comment: 'Is this the correct label for this project?',
    },
    {
      date: '02/04/20',
      name: 'Matt Conlon Karp',
      step: 'Release Notes',
      comment: 'Is this the correct label for this project?',
    },
    {
      date: '02/04/20',
      name: ' as test',
      step: 'contact page',
      comment: 'Is this the correct label for this project?',
    },
  ],
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
});
