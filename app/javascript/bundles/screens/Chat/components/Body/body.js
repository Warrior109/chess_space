import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { array, number, bool, func } from 'prop-types';

const propTypes = {
  messages: array.isRequired,
  hasMorePages: bool.isRequired,
  chatId: number.isRequired,
  clearMessagesDispatch: func.isRequired,
  fetchMessagesListDispatch: func.isRequired
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

  render() {
    const {
      loadMore,
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
              messages.map(({uuid, text, isMine, status}) => (
                <div key={ uuid } style={ {width: '100%', minHeight: '40px', position: 'relative'} } >
                  <div style={ {position: 'absolute', ...(isMine ? {right: 0} : {left: 0})} } >
                    <div style={ {backgroundColor: 'gray'} } >{text}</div>
                    <span>{status}</span>
                  </div>
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
