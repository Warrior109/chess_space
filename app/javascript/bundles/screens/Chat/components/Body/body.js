import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from '@k.sh/react-visibility-sensor';
import { array, number, bool, func } from 'prop-types';

const propTypes = {
  messages: array.isRequired,
  hasMorePages: bool.isRequired,
  chatId: number.isRequired,
  clearMessagesDispatch: func.isRequired,
  fetchMessagesListDispatch: func.isRequired,
  readMessageDispatch: func.isRequired
};

class Body extends Component {
  loadMore = (page) => {
    const { chatId, fetchMessagesListDispatch } = this.props;

    fetchMessagesListDispatch({chatId, page});
  };

  comopnentWillUnmount() {
    const { clearMessagesDispatch } = this.props;

    clearMessagesDispatch();
  };

  onChangeMessageVisibility = (message, isVisible) => {
    const { readMessageDispatch } = this.props;

    if (isVisible) readMessageDispatch({id: message.id});
  };

  render() {
    const {
      loadMore,
      onChangeMessageVisibility,
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
                      <div style={ {position: 'absolute', ...(message.isMine ? {right: 0} : {left: 0})} } >
                        <div style={ {backgroundColor: 'gray'} } >{message.text}</div>
                        <span>{message.status}</span>
                      </div>
                      :
                      <VisibilitySensor onChange={ (isVisible) => onChangeMessageVisibility(message, isVisible) } >
                        <div style={ {position: 'absolute', ...(message.isMine ? {right: 0} : {left: 0})} } >
                          <div style={ {backgroundColor: 'gray'} } >{message.text}</div>
                          <span>{message.status}</span>
                        </div>
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
