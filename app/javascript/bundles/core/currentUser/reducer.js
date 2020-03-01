import update from 'immutability-helper';

import { types } from './constants';

const initialState = {
  object: {},
  locale: null,
  skillLevelOptions: null
};

export function currentUserReducer(state = initialState, { payload, type }) {
  switch (type) {
    case types.SET_CURRENT_USER:
      return update(state, { object: { $set: payload.currentUser } });
    case types.SET_SKILL_LEVEL_OPTIONS:
      return update(state, { skillLevelOptions: { $set: payload.skillLevelOptions } });
    default: {
      return state;
    }
  }
}
