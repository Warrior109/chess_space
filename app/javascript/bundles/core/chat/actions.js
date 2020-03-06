import { types } from './constants';

export const actions = {
  fetchChat: ({ id, callback, errorCallback }) => ({
    type: types.FETCH_CHAT, payload: { id }, callback, errorCallback
  })
};
