import { INCREMENT, DECREMENT } from './constants';

export const incrementUploadCount = () => ({
  type: INCREMENT,
});

export const decrementUploadCount = () => ({
  type: DECREMENT,
});
