import { createSelector } from 'reselect';

export const selectorState = state => state.userAdmin;

export const selectorData = createSelector(
  selectorState,
  state => state.data,
);

export const selectorError = createSelector(
  selectorState,
  state => state.error,
);

export const selectorSubmitting = createSelector(
  selectorState,
  state => state.submitting,
);
