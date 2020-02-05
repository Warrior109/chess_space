import React, { Component } from 'react';
import { NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {} from 'prop-types';

import SharedHeader from 'components/Header';
import { SignUpModal } from './components';

const propTypes = {
};

class Header extends Component {
  state = {
    isSignUpModalOpen: false
  };

  toggleSignUpModal = () => {
    this.setState(state => ({ isSignUpModalOpen: !state.isSignUpModalOpen }));
  }

  render() {
    const {
      toggleSignUpModal,
      state: { isSignUpModalOpen }
    } = this;

    return (
      <SharedHeader>
        <NavItem>
          <a onClick={ toggleSignUpModal } >
            <FormattedMessage id='registration' />
          </a>
        </NavItem>

        <SignUpModal isOpen={ isSignUpModalOpen } toggle={ toggleSignUpModal } />
      </SharedHeader>
    );
  }
};
Header.propTypes = propTypes;

export default Header;
