import React from 'react';
import {Row, Col} from 'reactstrap';
import {string, shape, bool, number, func} from 'prop-types';

const propTypes = {
  chat: shape({
    companion: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
      thumbnailAvatar: shape({
        url: string.isRequired
      }).isRequired
    }).isRequired,
    lastMessage: shape({
      text: string
    }),
    unreadMessagesCount: number.isRequired
  }).isRequired,
  isActive: bool.isRequired,
  changeChat: func.isRequired
};

const ChatItem = ({chat, isActive, changeChat}) => {
  return (
    <Row
      className={ `chat-item ${isActive ? 'active' : ''}` }
      onClick={ () => isActive || changeChat(chat) }
    >
      <Col sm={ 2 } >
        <img src={ chat.companion.thumbnailAvatar.url } width={ 40 } height={ 40 } />
      </Col>
      <Col sm={ 10 } >
        <div>
          <strong>{ chat.companion.firstName } { chat.companion.lastName }</strong>
          { !!chat.unreadMessagesCount && <span>({chat.unreadMessagesCount})</span> }
        </div>
        <div>{ chat.lastMessage && chat.lastMessage.text }</div>
      </Col>
    </Row>
  );
};
ChatItem.propTypes = propTypes;

export default ChatItem;
