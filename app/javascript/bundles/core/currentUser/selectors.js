import { createSelector } from 'reselect';
import moment from 'moment';

const getCurrentUser = state => state.currentUser.object;
const getLocale = state => state.currentUser.locale;
export const selectors = {
  getCurrentUser,
  getBirthday: createSelector(
    [getCurrentUser, getLocale],
    ({ birthday }, locale) => birthday && moment(birthday).locale(locale).format('D MMMM YYYY')
  ),
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
