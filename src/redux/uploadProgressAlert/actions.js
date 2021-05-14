import { START, SET, END } from './constants';

export const startUpload = name => ({
  type: START,
  name,
});

export const setUploadProgress = (name, progress) => ({
  type: SET,
  name,
  progress,
});

export const endUpload = name => ({
  type: END,
  name,
});
