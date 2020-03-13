import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { setError } from 'lib/utils';

import { checkError } from 'core/currentUser/sagas';
import { selectors as chatSelectors } from 'core/chat';
import { selectors as currentUserSelectors } from 'core/currentUser';

import { selectors } from './selectors';
import api from './api';
import { types } from './constants';

export function* createMessage({ payload: { text }, errorCallback, callback }) {
  try {
    const chat = yield select(chatSelectors.getChat);
    const currentUser = yield select(currentUserSelectors.getCurrentUser);
    const uuid = uuidv4();
    const newMessage = {text, status: 'sended', sender: {id: currentUser.id}, uuid};
    yield put({type: types.PUSH_MESSAGE, payload: {message: newMessage}});

    const resp = yield call(api.createMessage, { text, uuid, chatId: chat.id });

    if (!resp.errors.length) {
      yield* processMessage({payload: {message: resp.message}});
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

export function* subscribeToMessageChannel({onReceive, onError, onCompleted}) {
  const chat = yield select(chatSelectors.getChat);

  yield call(
    api.subscribeToMessageChannel,
    {variables: {chatId: chat.id}, onReceive, onError, onCompleted}
  );
}

// Push on the correct place or replace existing message
export function* processMessage({payload: {message}}) {
  const messages = yield select(selectors.getMessagesList);
  for (let index = messages.length - 1; index >= 0; index--) {
    if (!messages[index].id && messages[index].uuid === message.uuid) {
      yield put({type: types.REPLACE_MESSAGE, payload: {index, message}});
      break;
    } else if (messages[index].id < message.id) {
      // It's mean that message should be on the next place of index
      yield put({type: types.ADD_MESSAGE, payload: {index, message}});
      break;
    } else if (messages[index].id === message.id) {
      // It's mean that we should to update message. Message could to change status, or etc
      yield put({type: types.REPLACE_MESSAGE, payload: {index, message}});
      break;
    } else if (index === 0) {
      // It means that we not have the such message in our list
      // and we should to put this message at the first place
      yield put({type: types.ADD_MESSAGE, payload: {index: -1, message}});
      break;
    }
  }
};

export function* messageWatch() {
  yield takeLatest(types.CREATE_MESSAGE, createMessage);
  yield takeLatest(types.SUBSCRIBE_TO_MESSAGE_CHANNEL, subscribeToMessageChannel);
  yield takeLatest(types.PROCESS_MESSAGE, processMessage);
}

export const messageSagas = [
  fork(messageWatch)
];
