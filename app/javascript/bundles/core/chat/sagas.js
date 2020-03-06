import React from 'react';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { setError } from 'lib/utils';

import { checkError } from 'core/currentUser/sagas';
import { selectors } from './selectors';
import api from './api';
import { types } from './constants';

export function* fetchChat({ payload: { id }, errorCallback, callback }) {
  try {
    const chat = yield call(api.fetchChat, { id });

    yield put({ type: types.SET_CHAT, payload: { chat } });
    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* chatWatch() {
  yield takeLatest(types.FETCH_CHAT, fetchChat);
}

export const chatSagas = [
  fork(chatWatch)
];
