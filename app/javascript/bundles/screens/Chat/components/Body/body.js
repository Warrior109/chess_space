import React from 'react';
import { array } from 'prop-types';

const propTypes = {
  messages: array.isRequired
};

const Body = ({ messages }) => {
  return (
    <div>
      {
        messages.map(({ id, text, isMine }) => (
          <div key={ id } style={ {width: '100%', minHeight: '40px', position: 'relative'} } >
            <div style={ {position: 'absolute', backgroundColor: 'gray', ...(isMine ? {right: 0} : {left: 0})} } >
              { text }
            </div>
          </div>
        ))
      }
    </div>
  );
};
Body.propTypes = propTypes;

export default Body;
