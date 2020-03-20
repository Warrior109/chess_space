import { graphQLRequest, createSubscription } from 'lib/utils';
import {
  createMessage,
  subscribeToMessageChannel,
  fetchMessagesList,
  readMessages
} from './queries';
import { subscriptionIds } from './constants';

const api = {
  createMessage: ({text, chatId, uuid}) => graphQLRequest({
    query: createMessage,
    variables: {input: {text, chatId, uuid}}
  }),
  subscribeToMessageChannel: ({variables, onReceive, onError, onCompleted}) => createSubscription({
    subscriptionId: subscriptionIds.MESSAGE_CHANNEL,
    query: subscribeToMessageChannel,
    variables,
    onReceive,
    onError,
    onCompleted
  }),
  fetchMessagesList: ({cursor, chatId}) => graphQLRequest({
    query: fetchMessagesList,
    variables: {cursor, chatId}
  }),
  readMessages: ({ids}) => graphQLRequest({
    query: readMessages,
    variables: {input: {ids}}
  })
};

export default api;
