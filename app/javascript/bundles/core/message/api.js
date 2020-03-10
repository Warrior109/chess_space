import { graphQLRequest, createSubscription } from 'lib/utils';
import {
  createMessage,
  subscribeToMessagesChannel
} from './queries';
import { subscriptionIds } from './constants';

const api = {
  createMessage: ({text, chatId}) => graphQLRequest({
    query: createMessage,
    variables: {input: {text, chatId}}
  }),
  subscribeToMessagesChannel: ({variables, onReceive, onError, onCompleted}) => createSubscription({
    subscriptionId: subscriptionIds.MESSAGES_CHANNEL,
    query: subscribeToMessagesChannel,
    variables,
    onReceive,
    onError,
    onCompleted
  }),
};

export default api;
