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
    setError(err);
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
    setError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* checkUserEmailUniqueness({ payload: { email }, errorCallback, callback }) {
  try {
    const { isValid } = yield call(api.checkUserEmailUniqueness, { email });

    if (isValid) {
      if (callback) callback();
    } else {
      const errors = { email: 'Email already been taken' };
      yield put(stopSubmit('signUpForm', errors));
      if (errorCallback) errorCallback();
    }
  } catch(err) {
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
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
    setError(err);
    if (errorCallback) errorCallback(err);
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
}

export const currentUserSagas = [
  fork(currentUserWatch)
];
