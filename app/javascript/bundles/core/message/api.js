import { graphQLRequest, createSubscription } from 'lib/utils';
import {
  createMessage,
  subscribeToMessageWasCreated,
  subscribeToMessageWasReaded,
  fetchMessagesList,
  readMessages
} from './queries';
import { subscriptionIds } from './constants';

const api = {
  createMessage: ({text, chatId, uuid}) => graphQLRequest({
    query: createMessage,
    variables: {input: {text, chatId, uuid}}
  }),
  subscribeToMessageWasCreated: ({variables, onReceive, onError, onCompleted}) => createSubscription({
    subscriptionId: subscriptionIds.MESSAGE_WAS_CREATED,
    query: subscribeToMessageWasCreated,
    variables,
    onReceive,
    onError,
    onCompleted
  }),
  subscribeToMessageWasReaded: ({variables, onReceive, onError, onCompleted}) => createSubscription({
    subscriptionId: subscriptionIds.MESSAGE_WAS_READED,
    query: subscribeToMessageWasReaded,
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
