import { INCREMENT, CLEAR } from './constants';

export const incrementUploadCount = val => ({
  progress: val,
  type: INCREMENT,
});

export const clearUploadCount = () => ({
  type: CLEAR,
});
