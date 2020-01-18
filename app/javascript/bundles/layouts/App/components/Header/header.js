import React from 'react';
import { Link } from 'react-router-dom';
import { defaultMessages } from 'locales/default';
// import { intlShape } from 'react-intl';
import {} from 'prop-types';

import SharedHeader from 'components/Header';
import SignInModalLink from 'components/SignInModalLink';

const propTypes = {
  // intl: intlShape.isRequired
};

const Header = ({ intl: { formatMessage } }) => {
  return (
    <SharedHeader>
      <li className='nav-item auth-btn'>
        <SignInModalLink className='nav-link' >
          LOGIN
          {/* { formatMessage(defaultMessages.login) } */}
        </SignInModalLink>
      </li>
    </SharedHeader>
  );
};
Header.propTypes = propTypes;

export default Header;
