import { graphQLRequest } from 'lib/utils';
import {
  fetchChat
} from './queries';
import {
  fetchMessagesList
} from 'core/message/queries';

const api = {
  fetchChat: ({ id }) => graphQLRequest({
    query: fetchChat,
    variables: { id }
  }),
  fetchChatScreenData: ({ id }) => graphQLRequest({
    queries: [
      {
        query: fetchChat,
        variables: { id }
      },
      {
        query: fetchMessagesList,
        variables: { chatId: id }
      }
    ]
  })
};

export default api;
