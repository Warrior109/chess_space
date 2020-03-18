import { graphQLRequest } from 'lib/utils';
import {
  fetchChat
} from './queries';

const api = {
  fetchChat: ({ id }) => graphQLRequest({
    query: fetchChat,
    variables: { id }
  })
};

export default api;
