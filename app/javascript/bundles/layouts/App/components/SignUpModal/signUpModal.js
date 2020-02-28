import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { bool, func } from 'prop-types';

import { paths } from 'layouts/constants';
import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  checkUserEmailUniquenessDispatch: func.isRequired,
  signUpUserDispatch: func.isRequired
};

class SignUpModal extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ firstName, lastName, email, password, passwordConfirmation }) => {
    const { checkUserEmailUniquenessDispatch, signUpUserDispatch } = this.props;

    const errorCallback = () => this.setState({ inProcess: false });
    const callback = () => {
      signUpUserDispatch({
        firstName, lastName, email, password, passwordConfirmation, callback: errorCallback, errorCallback
      });
    };

    this.setState({ inProcess: true });
    checkUserEmailUniquenessDispatch({ email, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { isOpen, toggle }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } } >
        <ModalHeader { ...{ toggle } } charCode='x'>
          <FormattedMessage id='modals.registration.title' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <Form onSubmit={ handleSubmit } />
        </ModalBody>
        <ModalFooter>
          <FormattedMessage id='modals.registration.social' />
          <div>
            <a href={ paths.USERS_OAUTH_GOOGLE_SIGN_UP } >
              GOOGLE
            </a>
          </div>
          <div>
            <a href={ paths.USERS_OAUTH_FACEBOOK_SIGN_UP } >
              Facebook
            </a>
          </div>
        </ModalFooter>
      </Modal>
    );
  };
};
SignUpModal.propTypes = propTypes;

export default SignUpModal;
