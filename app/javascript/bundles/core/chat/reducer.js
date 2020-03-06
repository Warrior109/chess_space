import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  object: null
};

export function chatReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_CHAT:
      return update(state, { object: { $set: payload.chat } });
    default: {
      return state;
    }
  }
}
