import { graphQLRequest, createSubscription } from 'lib/utils';
import {
  createMessage,
  subscribeToMessageChannel
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
};

export default api;
