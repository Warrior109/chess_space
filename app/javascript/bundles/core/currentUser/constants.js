//
// ACTION TYPES
//

export const types = {
  SET_SKILL_LEVEL_OPTIONS: 'SET_SKILL_LEVEL_OPTIONS',
  FETCH_CURRENT_USER_SKILL_LEVEL_OPTIONS: 'FETCH_CURRENT_USER_SKILL_LEVEL_OPTIONS',
  CURRENT_USER_DISCONNECT_SOCIAL: 'CURRENT_USER_DISCONNECT_SOCIAL',
  CURRENT_USER_FORGOT_PASSWORD_UPDATE: 'CURRENT_USER_FORGOT_PASSWORD_UPDATE',
  CURRENT_USER_FORGOT_PASSWORD: 'CURRENT_USER_FORGOT_PASSWORD',
  CURRENT_USER_DELETE: 'CURRENT_USER_DELETE',
  UPDATE_CURRENT_USER_AVATAR: 'UPDATE_CURRENT_USER_AVATAR',
  USER_SECURE_UPDATE: 'USER_SECURE_UPDATE',
  USER_UPDATE: 'USER_UPDATE',
  SIGN_UP_USER: 'SIGN_UP_USER',
  CHECK_USER_EMAIL_UNIQUENESS: 'CHECK_USER_EMAIL_UNIQUENESS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOG_OUT: 'LOG_OUT',
  SIGN_IN: 'SIGN_IN',
  CURRENT_USER_SIGN_UP: 'CURRENT_USER_SIGN_UP'
};

export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 128;
export const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line max-len
