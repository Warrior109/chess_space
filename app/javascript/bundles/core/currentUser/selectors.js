import { createSelector } from 'reselect';

const getCurrentUser = state => state.currentUser.object;
export const selectors = {
  getCurrentUser
};
