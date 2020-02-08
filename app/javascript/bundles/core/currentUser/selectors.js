import { createSelector } from 'reselect';

const getCurrentUser = state => state.currentUser.object;
export const selectors = {
  getCurrentUser,
  getUserUpdateFormInitialValues: createSelector(
    [getCurrentUser],
    ({ trainer, skillLevel, birthday, goal, aboutMe, lat, lng, address, countryCode }) => ({
      trainer,
      skillLevel,
      birthday: birthday && new Date(birthday),
      goal,
      aboutMe,
      location: { lat, lng, address, countryCode }
    })
  )
};
