import { createReducer } from 'redux-starter-kit';
import { START, SET, END } from './constants';

export const initialState = {
  uploads: {},
};

const handleBeforeUnload = event => {
  const message = 'Are you sure? \n Upload in progress.';
  event.preventDefault();
  event.returnValue = message;
  return message;
};

export default createReducer(initialState, {
  [START]: (state, action) => {
    if (Object.keys(state.uploads).length === 0) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    state.uploads = { ...state.uploads, [action.name]: 0 };
  },
  [SET]: (state, action) => {
    state.uploads = { ...state.uploads, [action.name]: action.progress };
  },
  [END]: (state, action) => {
    let uploads = { ...state.uploads };
    delete uploads[action.name];
    if (Object.keys(uploads).length === 0) {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    state.uploads = uploads;
  },
});
