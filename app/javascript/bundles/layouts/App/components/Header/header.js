import React, { Component } from 'react';
import { NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {} from 'prop-types';

import SharedHeader from 'components/Header';
import { SignUpModal, SignInModal } from './components';

const propTypes = {
};

class Header extends Component {
  state = {
    isSignUpModalOpen: false,
    isSignInModalOpen: false
  };

  toggleSignUpModal = () => {
    this.setState(state => ({ isSignUpModalOpen: !state.isSignUpModalOpen }));
  }

  toggleSignInModal = () => {
    this.setState(state => ({ isSignInModalOpen: !state.isSignInModalOpen }));
  }

  render() {
    const {
      toggleSignUpModal,
      toggleSignInModal,
      state: { isSignInModalOpen, isSignUpModalOpen }
    } = this;

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

        <SignUpModal isOpen={ isSignUpModalOpen } toggle={ toggleSignUpModal } />
        <SignInModal isOpen={ isSignInModalOpen } toggle={ toggleSignInModal } />
      </SharedHeader>
    );
  }
};
Header.propTypes = propTypes;

export default Header;
