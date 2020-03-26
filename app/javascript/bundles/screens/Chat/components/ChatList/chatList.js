import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Container} from 'reactstrap';
import {array, bool, number, func} from 'prop-types';

import { ChatItem } from './components';

const propTypes = {
  chats: array.isRequired,
  hasMorePages: bool.isRequired,
  fetchChatsDispatch: func.isRequired,
  changeChat: func.isRequired
};

const ChatList = ({chats, hasMorePages, fetchChatsDispatch, changeChat}) => {
  const loadMore = page => fetchChatsDispatch({page});

  return (
    <div style={ {height: '700px', overflow: 'auto'} }>
      <InfiniteScroll
        pageStart={ 1 }
        loadMore={ loadMore }
        initialLoad={ !chats.length }
        loader={ <center key='loader'>Loading...</center> }
        hasMore={ hasMorePages }
        useWindow={ false }
      >
        <Container>
          { chats.map((chat) => <ChatItem key={ chat.id } { ...{chat, changeChat} } />) }
        </Container>
      </InfiniteScroll>
    </div>
  );
};
ChatList.propTypes = propTypes;

export default ChatList;
