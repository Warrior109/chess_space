import React, { Component } from 'react';
import { any, func, object, string } from 'prop-types';

import Footer from 'components/Footer';
import { paths } from 'layouts/constants';
import { Header, SignInModal, SignUpModal, ForgotPasswordModal } from './components';
import { UnauthorizedModalsContext } from './context';
import { ALL_MODALS_CLOSED } from './constants';

const propTypes = {
  children: any
};

class App extends Component {
  state = {
    ...ALL_MODALS_CLOSED
  };

  toggleSignUpModal = () => {
    this.setState(state => ({ ...ALL_MODALS_CLOSED, isSignUpModalOpen: !state.isSignUpModalOpen }));
  }

  toggleSignInModal = () => {
    this.setState(state => ({ ...ALL_MODALS_CLOSED, isSignInModalOpen: !state.isSignInModalOpen }));
  }

  toggleForgotPasswordModal = () => {
    this.setState(state => ({
      ...ALL_MODALS_CLOSED, isForgotPasswordModalOpen: !state.isForgotPasswordModalOpen
    }));
  }

  render() {
    const {
      toggleSignInModal,
      toggleSignUpModal,
      toggleForgotPasswordModal,
      state: { isSignInModalOpen, isSignUpModalOpen, isForgotPasswordModalOpen },
      props: { children }
    } = this;

    return (
      <UnauthorizedModalsContext.Provider
        value={ { toggleSignInModal, toggleSignUpModal, toggleForgotPasswordModal } }
      >
        <Header />
        { children }
        <Footer />

        <SignUpModal isOpen={ isSignUpModalOpen } toggle={ toggleSignUpModal } />
        <SignInModal isOpen={ isSignInModalOpen } toggle={ toggleSignInModal } />
        <ForgotPasswordModal
          isOpen={ isForgotPasswordModalOpen }
          toggle={ toggleForgotPasswordModal }
        />
      </UnauthorizedModalsContext.Provider>
    );
  }
};

App.propTypes = propTypes;

export default App;
