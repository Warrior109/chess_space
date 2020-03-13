import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  list: []
};

export function messageReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_MESSAGES_LIST:
      return update(state, { list: { $set: payload.messages } });
    case types.PUSH_MESSAGE:
      return update(state, { list: { $push: [payload.message] } });
    case types.ADD_MESSAGE:
      return update(state, {list: {$splice: [[payload.index + 1, 0, payload.message]]}});
    case types.REPLACE_MESSAGE:
      return update(state, {list: {$splice: [[payload.index, 1, payload.message]]}});
    default: {
      return state;
    }
  }
}
