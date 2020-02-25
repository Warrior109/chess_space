import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { object, bool, func } from 'prop-types';

import Loader from 'components/Loader';
import { paths } from 'layouts/constants';
import { Form } from './components';

const propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  signInDispatch: func.isRequired
};

class SignInModal extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ email, password }) => {
    const { signInDispatch } = this.props;

    const callback = () => {
      toastr.success('', { component: <FormattedMessage id='devise.sessions.signed_in' /> });
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    signInDispatch({ email, password, callback, errorCallback });
  }

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { isOpen, toggle }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } } >
        <ModalHeader { ...{ toggle } } charCode='x' >
          <FormattedMessage id='modals.log_in' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <Form onSubmit={ handleSubmit } />
        </ModalBody>
      </Modal>
    );
  }
};
SignInModal.propTypes = propTypes;

export default SignInModal;
