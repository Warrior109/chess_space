import React from 'react';
import { array } from 'prop-types';

const propTypes = {
  messages: array.isRequired
};

const Body = ({ messages }) => {
  return (
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
  );
};
Body.propTypes = propTypes;

export default Body;
