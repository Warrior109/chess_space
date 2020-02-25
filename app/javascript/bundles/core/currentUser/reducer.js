import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  object: {},
  locale: null
};

export function currentUserReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_CURRENT_USER:
      return update(state, { object: { $set: payload.currentUser } });
    default: {
      return state;
    }
  }
}
