import { graphQLRequest } from 'lib/utils';
import {
  fetchChat,
  fetchChats
} from './queries';

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
  })
};

export default api;
