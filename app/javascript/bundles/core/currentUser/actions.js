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
  }),
  userUpdate: ({ callback, errorCallback, ...params }) => ({
    type: types.USER_UPDATE, payload: params, callback, errorCallback
  }),
  userSecureUpdate: ({ callback, errorCallback, ...params }) => ({
    type: types.USER_SECURE_UPDATE, payload: params, callback, errorCallback
  }),
  updateCurrentUserAvatar: ({ originalAvatar, thumbnailAvatar, callback, errorCallback }) => ({
    type: types.UPDATE_CURRENT_USER_AVATAR,
    payload: { originalAvatar, thumbnailAvatar }, callback, errorCallback
  }),
  currentUserDelete: ({ password, callback, errorCallback }) => ({
    type: types.CURRENT_USER_DELETE, payload: { password }, callback, errorCallback
  }),
  currentUserForgotPassword: ({ email, callback, errorCallback }) => ({
    type: types.CURRENT_USER_FORGOT_PASSWORD, payload: { email }, callback, errorCallback
  }),
  currentUserForgotPasswordUpdate: ({
    password, passwordConfirmation, resetPasswordToken, callback, errorCallback
  }) => ({
    type: types.CURRENT_USER_FORGOT_PASSWORD_UPDATE,
    payload: { password, passwordConfirmation, resetPasswordToken },
    callback, errorCallback
  }),
  currentUserDisconnectSocial: ({ provider, callback, errorCallback }) => ({
    type: types.CURRENT_USER_DISCONNECT_SOCIAL, payload: { provider }, callback, errorCallback
  }),
  fetchCurrentUserSkillLevelOptions: ({ callback, errorCallback }) => ({
    type: types.FETCH_CURRENT_USER_SKILL_LEVEL_OPTIONS, callback, errorCallback
  }),
  subscribeToCurrentUserWasUpdated: ({onReceive, onError, onCompleted}) => ({
    type: types.SUBSCRIBE_TO_CURRENT_USER_WAS_UPDATED, onReceive, onError, onCompleted
  })
};
