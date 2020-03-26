import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from '@k.sh/react-visibility-sensor';
import { array, number, bool, func } from 'prop-types';

import { MessageItem } from './components';

const propTypes = {
  messages: array.isRequired,
  hasMorePages: bool.isRequired,
  chatId: number.isRequired,
  clearMessagesDispatch: func.isRequired,
  fetchMessagesListDispatch: func.isRequired,
  readMessageDispatch: func.isRequired
};

class Body extends Component {
  state = {
    isTabOpen: document.hasFocus()
  };

  componentDidMount() {
    const { onWindowFocus, onWindowBlur } = this;

    window.addEventListener('focus', onWindowFocus);
    window.addEventListener('blur', onWindowBlur);
  };

  comopnentWillUnmount() {
    const {
      onWindowFocus,
      onWindowBlur,
      props: {clearMessagesDispatch}
    } = this;

    window.removeEventListener('focus', onWindowFocus);
    window.removeEventListener('blur', onWindowBlur);
    clearMessagesDispatch();
  };

  onWindowFocus = () => this.setState({isTabOpen: true});
  onWindowBlur = () => this.setState({isTabOpen: false});

  loadMore = (page) => {
    const { chatId, fetchMessagesListDispatch } = this.props;

    fetchMessagesListDispatch({chatId, page});
  };

  onChangeMessageVisibility = (message, isVisible) => {
    const { readMessageDispatch } = this.props;

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
      <div style={ {height: '700px', overflow: 'auto'} } >
        <InfiniteScroll
          loadMore={ loadMore }
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
