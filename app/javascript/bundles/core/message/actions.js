import { types } from './constants';

export const actions = {
  createMessage: ({text, callback, errorCallback}) => ({
    type: types.CREATE_MESSAGE, payload: {text}, callback, errorCallback
  }),
  subscribeToMessageChannel: ({onReceive, onError, onCompleted}) => ({
    type: types.SUBSCRIBE_TO_MESSAGE_CHANNEL, onReceive, onError, onCompleted
  }),
  pushMessage: ({message}) => ({
    type: types.PUSH_MESSAGE, payload: {message}
  }),
  processMessage: ({message}) => ({
    type: types.PROCESS_MESSAGE, payload: {message}
  }),
  clearMessages: () => ({type: types.CLEAR_MESSAGES}),
  fetchMessagesList: ({ chatId, page, callback, errorCallback }) => ({
    type: types.FETCH_MESSAGES_LIST, payload: { chatId, page }, callback, errorCallback
  })
};
