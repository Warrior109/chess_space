import React from 'react';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { setError } from 'lib/utils';

import { checkError } from 'core/currentUser/sagas';
import { selectors as chatSelectors } from 'core/chat';

import { selectors } from './selectors';
import api from './api';
import { types } from './constants';

export function* createMessage({ payload: { text }, errorCallback, callback }) {
  try {
    const chat = yield select(chatSelectors.getChat);
    const resp = yield call(api.createMessage, { text, chatId: chat.id });

    if (!resp.errors.length) {
      yield put({ type: types.PUSH_MESSAGE, payload: {message: resp.message} });
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

export function* messageWatch() {
  yield takeLatest(types.CREATE_MESSAGE, createMessage);
}

export const messageSagas = [
  fork(messageWatch)
];
