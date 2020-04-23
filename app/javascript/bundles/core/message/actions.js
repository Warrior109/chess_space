import { types } from './constants';

export const actions = {
  createMessage: ({text, callback, errorCallback}) => ({
    type: types.CREATE_MESSAGE, payload: {text}, callback, errorCallback
  }),
  subscribeToMessageWasCreated: ({onReceive, onError, onCompleted}) => ({
    type: types.SUBSCRIBE_TO_MESSAGE_WAS_CREATED, onReceive, onError, onCompleted
  }),
  subscribeToMessagesWasReaded: ({onReceive, onError, onCompleted}) => ({
    type: types.SUBSCRIBE_TO_MESSAGES_WAS_READED, onReceive, onError, onCompleted
  }),
  pushMessage: ({message}) => ({
    type: types.PUSH_MESSAGE, payload: {message}
  }),
  processMessage: ({message, action}) => ({
    type: types.PROCESS_MESSAGE, payload: {message, action}
  }),
  clearMessages: () => ({type: types.CLEAR_MESSAGES}),
  fetchMessagesList: ({ chatId, page, callback, errorCallback }) => ({
    type: types.FETCH_MESSAGES_LIST, payload: { chatId, page }, callback, errorCallback
  }),
  readMessages: ({ids, callback}) => ({type: types.READ_MESSAGES, payload: {ids}, callback}),
  markMessagesAsReaded: ({ids}) => ({type: types.MARK_MESSAGES_AS_READED, payload: {ids}})
};
