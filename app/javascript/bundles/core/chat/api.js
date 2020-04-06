import {graphQLRequest, createSubscription} from 'lib/utils';
import {
  fetchChat,
  fetchChats,
  subscribeToChatWasUpdated
} from './queries';
import { subscriptionIds } from './constants';

const api = {
  fetchChat: ({ id }) => graphQLRequest({
    query: fetchChat,
    variables: { id }
  }),
  fetchChats: ({cursor}) => graphQLRequest({
    query: fetchChats,
    variables: {cursor}
  }),
  fetchChatScreenData: ({id}) => graphQLRequest({
    queries: [
      {
        query: fetchChat,
        variables: {id},
        responseKey: 'chat'
      },
      {
        query: fetchChats,
        responseKey: 'chats'
      }
    ]
  }),
  subscribeToChatWasUpdated: ({onReceive, onError, onCompleted}) => createSubscription({
    subscriptionId: subscriptionIds.CHAT_WAS_UPDATED,
    query: subscribeToChatWasUpdated,
    onReceive,
    onError,
    onCompleted
  }),
};

export default api;
