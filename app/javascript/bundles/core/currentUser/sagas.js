import React from 'react';
import { FormattedMessage } from 'react-intl';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { setError } from 'lib/utils';

import { selectors } from './selectors';
import api from './api';
import { types } from './constants';

export function* logOut({ errorCallback, callback }) {
  try {
    const resp = yield call(api.logOut);

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: {} } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* signIn({ payload: { email, password }, errorCallback, callback }) {
  try {
    const resp = yield call(api.signIn, { email, password });

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* checkUserEmailUniqueness({ payload: { email }, errorCallback, callback }) {
  try {
    const { isValid } = yield call(api.checkUserEmailUniqueness, { email });

    if (isValid) {
      if (callback) callback();
    } else {
      const errors = {email: <FormattedMessage id='validations.email.taken' />};
      yield put(stopSubmit('signUpForm', errors));
      if (errorCallback) errorCallback();
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* signUpUser({
  payload: { firstName, lastName, email, password, passwordConfirmation },
  errorCallback, callback
}) {
  try {
    const resp = yield call(
      api.signUpUser,
      { firstName, lastName, email, password, passwordConfirmation }
    );

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* userUpdate({ payload, errorCallback, callback }) {
  try {
    const resp = yield call(api.userUpdate, payload);

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* updateCurrentUserAvatar({
  payload: { originalAvatar, thumbnailAvatar }, errorCallback, callback
}) {
  try {
    const resp = yield call(api.updateCurrentUserAvatar, { originalAvatar, thumbnailAvatar });

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* userSecureUpdate({ payload, errorCallback, callback }) {
  try {
    const resp = yield call(api.userSecureUpdate, payload);

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* currentUserDelete({ payload: { password }, errorCallback, callback }) {
  try {
    const resp = yield call(api.currentUserDelete, { password });

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: {} } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* currentUserForgotPassword({ payload: { email }, errorCallback, callback }) {
  try {
    const resp = yield call(api.currentUserForgotPassword, { email });

    if (!resp.errors.length) {
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* currentUserForgotPasswordUpdate({
  payload: { password, passwordConfirmation, resetPasswordToken }, errorCallback, callback
}) {
  try {
    const resp = yield call(
      api.currentUserForgotPasswordUpdate, { password, passwordConfirmation, resetPasswordToken }
    );

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* currentUserDisconnectSocial({ payload: { provider }, errorCallback, callback }) {
  try {
    const resp = yield call(api.currentUserDisconnectSocial, { provider });

    if (!resp.errors.length) {
      yield put({ type: types.SET_CURRENT_USER, payload: { currentUser: resp.user } });
      if (callback) callback();
    } else {
      yield* setError(resp.errors);
      if (errorCallback) errorCallback(resp.errors);
    }
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* fetchCurrentUserSkillLevelOptions({ errorCallback, callback }) {
  try {
    const skillLevelOptions = yield call(api.fetchCurrentUserSkillLevelOptions);

    yield put({ type: types.SET_SKILL_LEVEL_OPTIONS, payload: { skillLevelOptions } });
    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* fetchCurrentUser({ callback, errorCallback }) {
  try {
    const currentUser = yield call(api.fetchCurrentUser);

    yield put({ type: types.SET_CURRENT_USER, payload: { currentUser } });
    if (callback) callback();
  } catch(err) {
    setError(err);
    if (errorCallback) errorCallback();
  }
};

// In case when user is authorized, but try to send request to unauthorized route (or in reverse case)
// We receive an error 'undefinedField', for this case we should to update currentUser in store.
// NOTE: Should always be used in the catch block for al sagas
export function* checkError(err) {
  if (err.errors && err.errors[1] && err.errors[1].extensions.code === 'undefinedField') {
    const currentUserBefore = yield select(selectors.getCurrentUser);
    const isCurrentUserBefore = !!(currentUserBefore && currentUserBefore.id);
    yield fetchCurrentUser({});
    const currentUserAfter = yield select(selectors.getCurrentUser);
    const isCurrentUserAfter = !!(currentUserAfter && currentUserAfter.id);

    if (isCurrentUserBefore && !isCurrentUserAfter) {
      toastr.error('', {component: <FormattedMessage id='error_messages.logouted' />});
    } else if (!isCurrentUserBefore && isCurrentUserAfter) {
      toastr.error('', {component: <FormattedMessage id='error_messages.logined' />});
    } else {
      setError(err);
    };
  } else {
    setError(err);
  }
}

export function* currentUserWatch() {
  yield takeLatest(types.LOG_OUT, logOut);
  yield takeLatest(types.SIGN_IN, signIn);
  yield takeLatest(types.CHECK_USER_EMAIL_UNIQUENESS, checkUserEmailUniqueness);
  yield takeLatest(types.SIGN_UP_USER, signUpUser);
  yield takeLatest(types.USER_UPDATE, userUpdate);
  yield takeLatest(types.USER_SECURE_UPDATE, userSecureUpdate);
  yield takeLatest(types.UPDATE_CURRENT_USER_AVATAR, updateCurrentUserAvatar);
  yield takeLatest(types.CURRENT_USER_DELETE, currentUserDelete);
  yield takeLatest(types.CURRENT_USER_FORGOT_PASSWORD, currentUserForgotPassword);
  yield takeLatest(types.CURRENT_USER_FORGOT_PASSWORD_UPDATE, currentUserForgotPasswordUpdate);
  yield takeLatest(types.CURRENT_USER_DISCONNECT_SOCIAL, currentUserDisconnectSocial);
  yield takeLatest(types.FETCH_CURRENT_USER_SKILL_LEVEL_OPTIONS, fetchCurrentUserSkillLevelOptions);
}

export const currentUserSagas = [
  fork(currentUserWatch)
];
