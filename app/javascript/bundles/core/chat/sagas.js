import React from 'react';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { setError } from 'lib/utils';

import { checkError } from 'core/currentUser/sagas';
import { selectors } from './selectors';
import api from './api';
import { types } from './constants';
import { types as messageTypes } from 'core/message/constants';

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

export function* fetchChatScreenData({ payload: {id}, errorCallback, callback }) {
  try {
    const {chat, messages} = yield call(api.fetchChatScreenData, {id});

    yield put({type: types.SET_CHAT, payload: {chat}});
    yield put({type: messageTypes.SET_MESSAGES_LIST, payload: {messages}});
    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* clearChatScreenData() {
  yield put({type: types.SET_CHAT, payload: {chat: null}});
  yield put({type: messageTypes.SET_MESSAGES_LIST, payload: {messages: []}});
}

export function* chatWatch() {
  yield takeLatest(types.FETCH_CHAT, fetchChat);
  yield takeLatest(types.FETCH_CHAT_SCREEN_DATA, fetchChatScreenData);
  yield takeLatest(types.CLEAR_CHAT_SCREEN_DATA, clearChatScreenData);
}

export const chatSagas = [
  fork(chatWatch)
];
