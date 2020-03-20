import createActionCableHandler from 'graphql-ruby-client/subscriptions/createActionCableHandler';
import { createConsumer } from '@rails/actioncable';

import { CABLE_URL } from './constants';

class Socket {
  callbacks = [];

  connectToSocket = () => {
    // should require, not import, because should run this library only on client side rendering
    const cable = createConsumer(CABLE_URL);
    const createHandler = createActionCableHandler(cable);
    this.cable = cable;
    this.createHandler = createHandler;
    [...this.callbacks].forEach((callback, index) => {
      callback(createHandler);
      this.callbacks.splice(index, 1);
    });
  }

  createSubscription = ({ subscriptionId, query, variables, onNext, onError, onCompleted }) => {
    if (this.createHandler) {
      this[subscriptionId] = this.createHandler({ text: query }, variables, {}, { onNext, onError, onCompleted });
    }
    this.callbacks.push(createHandler => {
      this[subscriptionId] = createHandler({ text: query }, variables, {}, { onNext, onError, onCompleted });
    });
  }

  deleteSubscription = subscriptionId => {
    if (this[subscriptionId]) {
      this[subscriptionId].dispose();
      delete this[subscriptionId];
    } else {
      // eslint-disable-next-line
      console.warn('Try to unsubscribe from subscription which doesn\'t exists: ', subscriptionId);
    }
  }
}

global.socket = new Socket();

const connectToSocket = () => {
  global.socket.connectToSocket();
};

const createSubscription = ({ subscriptionId, query, variables, onReceive, onError, onCompleted }) => {
  const onNextWrapper = ({data}) => (onReceive && data && onReceive(data));
  const onErrorWrapper = errors => (onError && onError(errors));
  const onCompletedWrapper = () => (onCompleted && onCompleted());
  return global.socket.createSubscription({
    subscriptionId,
    query,
    variables,
    onNext: onNextWrapper,
    onError: onErrorWrapper,
    onCompleted: onCompletedWrapper
  });
};

const deleteSubscription = subscriptionId => global.socket.deleteSubscription(subscriptionId);

export { createSubscription, connectToSocket, deleteSubscription };
