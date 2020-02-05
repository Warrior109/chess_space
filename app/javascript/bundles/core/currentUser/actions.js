import { types } from './constants';

export const actions = {
  setCurrentUser: ({ currentUser }) => ({
    type: types.SET_CURRENT_USER, payload: { currentUser }
  }),
  logOut: ({ callback, errorCallback }) => ({
    type: types.LOG_OUT, callback, errorCallback
  }),
  signIn: ({ email, password, callback, errorCallback }) => ({
    type: types.SIGN_IN, payload: { email, password }, callback, errorCallback
  }),
  checkUserEmailUniqueness: ({ email, callback, errorCallback }) => ({
    type: types.CHECK_USER_EMAIL_UNIQUENESS, payload: { email }, callback, errorCallback
  }),
  signUpUser: ({
    firstName, lastName, email, password, passwordConfirmation, callback, errorCallback
  }) => ({
    type: types.SIGN_UP_USER,
    payload: { firstName, lastName, email, password, passwordConfirmation },
    callback, errorCallback
  })
};
