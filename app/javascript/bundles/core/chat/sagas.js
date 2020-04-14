import React from 'react';
import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { setError } from 'lib/utils';

import { checkError } from 'core/currentUser/sagas';
import { selectors } from './selectors';
import api from './api';
import { types } from './constants';
import { types as messageTypes } from 'core/message/constants';
import { saveMessagesList, clearMessages } from 'core/message/sagas';

export function* fetchChat({payload: {id}, errorCallback, callback}) {
  try {
    const chat = yield call(api.fetchChat, {id});

    yield put({type: types.SET_CHAT, payload: {chat}});
    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* fetchChatScreenData({payload: {id}, errorCallback, callback}) {
  try {
    const {chat, chats, messages} = yield call(api.fetchChatScreenData, {id});

    yield put({type: types.SET_CHAT, payload: {chat}});
    yield* saveChats(chats);
    yield* saveMessagesList(messages);

    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* fetchChats({payload: {page}, errorCallback, callback}) {
  try {
    const cursors = yield select(selectors.getCursors);
    const cursor = cursors[page - 2];
    const chats = yield call(api.fetchChats, {cursor});

    yield* saveChats(chats);
    if (callback) callback();
  } catch(err) {
    yield checkError(err);
    if (errorCallback) errorCallback(err);
  }
}

export function* subscribeToChatWasUpdated({onReceive, onError, onCompleted}) {
  const onReceiveOverrided = ({chatWasUpdated}) => {
    if (onReceive && chatWasUpdated) onReceive(chatWasUpdated.item);
  };

  yield call(api.subscribeToChatWasUpdated, {onReceive: onReceiveOverrided, onError, onCompleted});
}

export function* saveChats({pageInfo: {endCursor, hasNextPage}, nodes}) {
  yield put({type: types.PUSH_CHAT_CURSOR, payload: {cursor: endCursor}});
  yield put({type: types.PUSH_CHAT_LIST, payload: {chats: nodes}});
  yield put({type: types.SET_CHAT_HAS_MORE_PAGES, payload: {hasMorePages: hasNextPage}});
};

export function* clearChatScreenData() {
  yield put({type: types.SET_CHAT, payload: {chat: null}});
  yield put({type: types.SET_CHAT_LIST, payload: {chats: []}});
  yield put({type: types.PUSH_CHAT_CURSOR, payload: {cursor: []}});
  yield put({type: types.SET_CHAT_HAS_MORE_PAGES, payload: {hasMorePages: true}});
  yield* clearMessages();
}

export function* replaceChatItem({payload: {chat}}) {
  const chats = yield select(selectors.getChats);
  const chatIndex = chats.findIndex(chatItem => chatItem.id === chat.id);
  if (chatIndex !== -1) yield put({type: types.SET_CHAT_ITEM, payload: {index: chatIndex, chat}});
};

export function* chatWatch() {
  yield takeLatest(types.FETCH_CHAT, fetchChat);
  yield takeLatest(types.FETCH_CHAT_SCREEN_DATA, fetchChatScreenData);
  yield takeLatest(types.CLEAR_CHAT_SCREEN_DATA, clearChatScreenData);
  yield takeLatest(types.FETCH_CHATS, fetchChats);
  yield takeLatest(types.SUBSCRIBE_TO_CHAT_WAS_UPDATED, subscribeToChatWasUpdated);
  yield takeLatest(types.REPLACE_CHAT_ITEM, replaceChatItem);
}

export const chatSagas = [
  fork(chatWatch)
];
