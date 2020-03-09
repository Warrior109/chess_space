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
      return update (state, { list: { $push: [payload.message] } });
    default: {
      return state;
    }
  }
}
