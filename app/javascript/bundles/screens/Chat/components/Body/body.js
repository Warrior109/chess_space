import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from '@k.sh/react-visibility-sensor';
import {shape, array, number, bool, func} from 'prop-types';

import {MessageItem} from './components';
import {MIN_SCROLL_FROM_BOTTOM} from './constants';
import {subscriptionIds} from 'core/message/constants';
import {deleteSubscription} from 'lib/utils';
import Loader from 'components/Loader';

const propTypes = {
  messages: array.isRequired,
  hasMorePages: bool.isRequired,
  chat: shape({
    id: number.isRequired,
    unreadMessagesCount: number.isRequired
  }).isRequired,
  fetchMessagesListDispatch: func.isRequired,
  readMessagesDispatch: func.isRequired,
  subscribeToMessageWasCreatedDispatch: func.isRequired,
  subscribeToMessagesWasReadedDispatch: func.isRequired,
  processMessageDispatch: func.isRequired,
  markMessagesAsReadedDispatch: func.isRequired
};

class Body extends Component {
  state = {
    isTabOpen: document.hasFocus(),
    isScrollOnBottom: true
  };

  componentDidMount() {
    const {
      onWindowFocus, onWindowBlur, scrollContainer, scrollBottom, subscribeToChannels,
      onScrollScrollContainer, readMessagesWorker
    } = this;

    this._ismounted = true;

    window.addEventListener('focus', onWindowFocus);
    window.addEventListener('blur', onWindowBlur);
    scrollContainer.addEventListener('scroll', onScrollScrollContainer);

    scrollBottom();
    subscribeToChannels();
    readMessagesWorker();
  };

  componentDidUpdate({messages}) {
    const {
      scrollBottom,
      state: {isScrollOnBottom},
      props: {messages: newMessages}
    } = this;
    if (messages.length < newMessages.length) { // if at least one element was added and scroll was on bottom
      if (isScrollOnBottom) {
        scrollBottom();
      } else if (!newMessages[newMessages.length - 1].id) { // new message sended from the screen
        scrollBottom();
      }
    };
  };

  componentWillUnmount() {
    const {
      onWindowFocus, onWindowBlur, unsubscribeFromChannels, scrollContainer,
      onScrollScrollContainer, readMessagesWorkerId
    } = this;

    this._ismounted = false;
    window.removeEventListener('focus', onWindowFocus);
    window.removeEventListener('blur', onWindowBlur);
    scrollContainer.removeEventListener('scroll', onScrollScrollContainer);

    unsubscribeFromChannels();
    clearTimeout(readMessagesWorkerId);
  };

  visibleMessageIds = new Set();
  onWindowFocus = () => this._ismounted && this.setState({isTabOpen: true});
  onWindowBlur = () => this._ismounted && this.setState({isTabOpen: false});

  subscribeToChannels = () => {
    const {
      props: {
        subscribeToMessageWasCreatedDispatch,
        subscribeToMessagesWasReadedDispatch,
        processMessageDispatch,
        markMessagesAsReadedDispatch
      }
    } = this;

    subscribeToMessageWasCreatedDispatch({
      onReceive: message => processMessageDispatch({message, action: 'create'})
    });

    subscribeToMessagesWasReadedDispatch({
      onReceive: ids => markMessagesAsReadedDispatch({ids})
    });
  };

  scrollBottom = () => {
    const {scrollContainer} = this;

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  };

  unsubscribeFromChannels = () => {
    deleteSubscription(subscriptionIds.MESSAGE_WAS_CREATED);
    deleteSubscription(subscriptionIds.MESSAGES_WAS_READED);
  };

  loadMore = (page) => {
    const {
      props: {chat: {id: chatId}, fetchMessagesListDispatch}
    } = this;

    fetchMessagesListDispatch({chatId, page});
  };

  onChangeMessageVisibility = (message, isVisible) => {
    const {visibleMessageIds} = this;

    if (isVisible) visibleMessageIds.add(message.id);
  };

  onScrollScrollContainer = () => {
    const {
      scrollContainer,
      state: {isScrollOnBottom}
    } = this;

    const scrollFromBottom = scrollContainer.scrollHeight -
      (scrollContainer.scrollTop + scrollContainer.offsetHeight);

    if (scrollFromBottom <= MIN_SCROLL_FROM_BOTTOM) {
      if (!isScrollOnBottom) this.setState({isScrollOnBottom: true});
    } else {
      if (isScrollOnBottom) this.setState({isScrollOnBottom: false});
    };
  };

  // Works in background and reads batch of messages
  readMessagesWorker = () => {
    const {
      visibleMessageIds,
      readMessagesWorker,
      props: {readMessagesDispatch}
    } = this;

    const ids = Array.from(visibleMessageIds);

    if (ids.length) {
      const callback = () => ids.forEach(id => visibleMessageIds.delete(id));
      readMessagesDispatch({ids, callback});
    };

    this.readMessagesWorkerId = setTimeout(readMessagesWorker, 500);
  };

  render() {
    const {
      loadMore,
      onChangeMessageVisibility,
      scrollBottom,
      state: {isTabOpen, isScrollOnBottom},
      props: {messages, hasMorePages, chat: {unreadMessagesCount}}
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
        {
          !isScrollOnBottom &&
            <div className='scroll-down-arrow' onClick={ scrollBottom } >
              Scroll down
              { !!unreadMessagesCount && <span>({ unreadMessagesCount })</span> }
            </div>
        }
      </div>
    );
  };
};
Body.propTypes = propTypes;

export default Body;
