import React from 'react';
import { shape, string } from 'prop-types';

const propTypes = {
  companion: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    thumbnailAvatar: shape({
      url: string.isRequired
    }).isRequired
  }).isRequired
};

const Header = ({companion: {firstName, lastName, thumbnailAvatar}}) => {
  return (
    <div>
      <center>
        <img height={ 50 } src={ thumbnailAvatar.url } />
        <span>{ firstName } { lastName }</span>
      </center>
    </div>
  );
};
Header.propTypes = propTypes;

export default Header;
