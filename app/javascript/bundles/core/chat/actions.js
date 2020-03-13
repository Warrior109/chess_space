import { types } from './constants';

export const actions = {
  fetchChat: ({ id, callback, errorCallback }) => ({
    type: types.FETCH_CHAT, payload: { id }, callback, errorCallback
  }),
  fetchChatScreenData: ({ id, callback, errorCallback }) => ({
    type: types.FETCH_CHAT_SCREEN_DATA, payload: { id }, callback, errorCallback
  }),
  clearChatScreenData: () => ({type: types.CLEAR_CHAT_SCREEN_DATA})
};
