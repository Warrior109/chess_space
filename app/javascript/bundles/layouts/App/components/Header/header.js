import React, { Component, useContext } from 'react';
import { NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {} from 'prop-types';

import SharedHeader from 'components/Header';
import { UnauthorizedModalsContext } from 'layouts/App/context';

const propTypes = {
};

const Header = (props) => {
  const { toggleSignInModal, toggleSignUpModal } = useContext(UnauthorizedModalsContext);

  return (
    <SharedHeader>
      <NavItem>
        <a style={ { cursor: 'pointer' } } onClick={ toggleSignUpModal } >
          <FormattedMessage id='modals.registration' />
        </a>
      </NavItem>
      <NavItem>
        <a style={ { cursor: 'pointer' } } onClick={ toggleSignInModal } >
          <FormattedMessage id='modals.log_in' />
        </a>
      </NavItem>
    </SharedHeader>
  );
};
Header.propTypes = propTypes;

export default Header;
