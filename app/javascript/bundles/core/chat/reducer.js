import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  object: null,
  list: [],
  cursors: [],
  hasMorePages: true
};

export function chatReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_CHAT:
      return update(state, {object: {$set: payload.chat}});
    case types.SET_CHAT_LIST:
      return update(state, {list: {$set: payload.chats}});
    case types.PUSH_CHAT_LIST:
      return update(state, {list: {$push: payload.chats}});
    case types.PUSH_CHAT_CURSOR:
      return update(state, {cursors: {$push: [payload.cursor]}});
    case types.SET_CHAT_CURSORS:
      return update(state, {cursors: {$set: payload.cursors}});
    case types.SET_CHAT_HAS_MORE_PAGES:
      return update(state, {hasMorePages: {$set: payload.hasMorePages}});
    case types.SET_CHAT_ITEM:
      return update(state, {list: {[payload.index]: {$set: payload.chat}}});
    default: {
      return state;
    }
  }
}
