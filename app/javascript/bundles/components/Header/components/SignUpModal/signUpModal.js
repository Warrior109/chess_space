import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { bool, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  checkUserEmailUniquenessDispatch: func.isRequired
};

class SignUpModal extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ firstName, lastName, email, password, passwordConfirmation }) => {
    const {
      setCurrentUserDispatch, currentUser, checkUserEmailUniquenessDispatch
    } = this.props;

    const callback = () => {
      // setCurrentUserDispatch({ currentUser: { ...currentUser, email, password, displayName, ...location } });
      this.setState({ inProcess: false });
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    checkUserEmailUniquenessDispatch({ email, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { isOpen, toggle, checkUserEmailUniquenessDispatch }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } } >
        <ModalHeader { ...{ toggle } } charCode='x'>
          <FormattedMessage id='registration' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <Form onSubmit={ handleSubmit } />
        </ModalBody>
      </Modal>
    );
  };
};
SignUpModal.propTypes = propTypes;

export default SignUpModal;
