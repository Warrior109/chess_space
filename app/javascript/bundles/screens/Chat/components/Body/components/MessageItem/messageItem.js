import React from 'react';
import { shape, bool, string } from 'prop-types';

const propTypes = {
  message: shape({
    isMine: bool.isRequired,
    text: string.isRequired,
    status: string.isRequired
  }).isRequired
};

const MessageItem = ({message: {isMine, text, status}}) => {
  return (
    <div style={ {position: 'absolute', ...(isMine ? {right: 0} : {left: 0})} } >
      <div style={ {backgroundColor: 'gray'} } >{text}</div>
      <span>{status}</span>
    </div>
  );
};
MessageItem.propTypes = propTypes;

export default MessageItem;
