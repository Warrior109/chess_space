import { types } from './constants';

export const actions = {
  fetchChat: ({ id, callback, errorCallback }) => ({
    type: types.FETCH_CHAT, payload: { id }, callback, errorCallback
  }),
  setChat: ({chat}) => ({type: types.SET_CHAT, payload: {chat}}),
  fetchChatScreenData: ({id, callback, errorCallback}) => ({
    type: types.FETCH_CHAT_SCREEN_DATA, payload: {id}, callback, errorCallback
  }),
  clearChatScreenData: () => ({type: types.CLEAR_CHAT_SCREEN_DATA}),
  fetchChats: ({page, callback, errorCallback}) => ({
    type: types.FETCH_CHATS, payload: {page}, callback, errorCallback
  })
};
