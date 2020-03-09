import { graphQLRequest } from 'lib/utils';
import {
  createMessage
} from './queries';

const api = {
  createMessage: ({text, chatId}) => graphQLRequest({
    query: createMessage,
    variables: {input: {text, chatId}}
  })
};

export default api;
