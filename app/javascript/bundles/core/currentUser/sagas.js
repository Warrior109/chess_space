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

export function* currentUserWatch() {
  yield takeLatest(types.LOG_OUT, logOut);
  yield takeLatest(types.SIGN_IN, signIn);
  yield takeLatest(types.CHECK_USER_EMAIL_UNIQUENESS, checkUserEmailUniqueness);
  yield takeLatest(types.SIGN_UP_USER, signUpUser);
  yield takeLatest(types.USER_UPDATE, userUpdate);
}

export const currentUserSagas = [
  fork(currentUserWatch)
];
