import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  list: [],
  cursors: [],
  hasMorePages: true
};

export function messageReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_MESSAGES_LIST:
      return update(state, { list: { $set: payload.messages } });
    case types.PUSH_MESSAGE:
      return update(state, { list: { $push: [payload.message] } });
    case types.UNSHIFT_MESSAGE_LIST:
      return update(state, { list: { $unshift: payload.messages } });
    case types.ADD_MESSAGE:
      return update(state, {list: {$splice: [[payload.index + 1, 0, payload.message]]}});
    case types.REPLACE_MESSAGE:
      return update(state, {list: {$splice: [[payload.index, 1, payload.message]]}});
    case types.PUSH_MESSAGE_CURSOR:
      return update(state, { cursors: { $push: [payload.cursor] } });
    case types.SET_MESSAGE_CURSORS:
      return update(state, { cursors: { $set: payload.cursors } });
    case types.SET_MESSAGE_HAS_MORE_PAGES:
      return update(state, { hasMorePages: { $set: payload.hasMorePages } });
    case types.MARK_MESSAGE_ITEM_AS_READ:
      return update(state, {list: {[payload.index]: {status: {$set: 'readed'}}}});
    default: {
      return state;
    }
  }
}
