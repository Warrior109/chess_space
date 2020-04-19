import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from '@k.sh/react-visibility-sensor';
import { array, number, bool, func } from 'prop-types';

import { MessageItem } from './components';
import {subscriptionIds} from 'core/message/constants';
import {deleteSubscription} from 'lib/utils';
import Loader from 'components/Loader';

const propTypes = {
  messages: array.isRequired,
  hasMorePages: bool.isRequired,
  chatId: number.isRequired,
  fetchMessagesListDispatch: func.isRequired,
  readMessageDispatch: func.isRequired,
  subscribeToMessageWasCreatedDispatch: func.isRequired,
  subscribeToMessageWasReadedDispatch: func.isRequired,
  processMessageDispatch: func.isRequired
};

class Body extends Component {
  state = {
    isTabOpen: document.hasFocus(),
  };

  componentDidMount() {
    const {onWindowFocus, onWindowBlur, scrollContainer, subscribeToChannels} = this;

    this._ismounted = true;
    window.addEventListener('focus', onWindowFocus);
    window.addEventListener('blur', onWindowBlur);

    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    subscribeToChannels();
  };

  componentWillUnmount() {
    const {onWindowFocus, onWindowBlur, unsubscribeFromChannels} = this;

    this._ismounted = false;
    window.removeEventListener('focus', onWindowFocus);
    window.removeEventListener('blur', onWindowBlur);

    unsubscribeFromChannels();
  };

  onWindowFocus = () => this._ismounted && this.setState({isTabOpen: true});
  onWindowBlur = () => this._ismounted && this.setState({isTabOpen: false});

  subscribeToChannels = () => {
    const {
      subscribeToMessageWasCreatedDispatch,
      subscribeToMessageWasReadedDispatch,
      processMessageDispatch
    } = this.props;

    subscribeToMessageWasCreatedDispatch({
      onReceive: message => processMessageDispatch({message, action: 'create'})
    });

    subscribeToMessageWasReadedDispatch({
      onReceive: message => processMessageDispatch({message, action: 'update'})
    });
  };

  unsubscribeFromChannels = () => {
    deleteSubscription(subscriptionIds.MESSAGE_WAS_CREATED);
    deleteSubscription(subscriptionIds.MESSAGE_WAS_READED);
  };

  loadMore = (page) => {
    const {
      props: {chatId, fetchMessagesListDispatch}
    } = this;

    fetchMessagesListDispatch({chatId, page});
  };

  onChangeMessageVisibility = (message, isVisible) => {
    const { readMessageDispatch } = this.props;

    // TODO: Read batch of messages
    if (isVisible) readMessageDispatch({id: message.id});
  };

  render() {
    const {
      loadMore,
      onChangeMessageVisibility,
      state: {isTabOpen},
      props: {messages, hasMorePages}
    } = this;


    return (
      <div
        style={ {height: '700px', overflow: 'auto'} }
        ref={ (scrollContainer) => this.scrollContainer = scrollContainer }
      >
        <InfiniteScroll
          pageStart={ 1 }
          loadMore={ loadMore }
          initialLoad={ !messages.length }
          loader={ <center key='loader'>Loading...</center> }
          hasMore={ hasMorePages }
          useWindow={ false }
          isReverse
        >
          <div>
            {
              messages.map((message) => (
                <div
                  key={ message.uuid }
                  style={ {width: '100%', minHeight: '40px', position: 'relative'} }
                >
                  {
                    message.status === 'readed' || message.isMine ?
                      <MessageItem { ...{ message } } />
                      :
                      <VisibilitySensor
                        active={ isTabOpen }
                        onChange={ (isVisible) => onChangeMessageVisibility(message, isVisible) }
                      >
                        <MessageItem { ...{ message } } />
                      </VisibilitySensor>
                  }
                </div>
              ))
            }
          </div>
        </InfiniteScroll>
      </div>
    );
  };
};
Body.propTypes = propTypes;

export default Body;
