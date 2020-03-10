import { types } from './constants';

export const actions = {
  createMessage: ({ text, callback, errorCallback }) => ({
    type: types.CREATE_MESSAGE, payload: { text }, callback, errorCallback
  }),
  subscribeToMessagesChannel: ({ onReceive, onError, onCompleted }) => ({
    type: types.SUBSCRIBE_TO_MESSAGES_CHANNEL, onReceive, onError, onCompleted
  }),
  pushMessage: ({ message }) => ({
    type: types.PUSH_MESSAGE, payload: { message }
  })
};
