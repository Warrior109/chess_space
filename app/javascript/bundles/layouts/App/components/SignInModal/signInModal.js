import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
          <FormattedMessage id='modals.log_in.title' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <Form onSubmit={ handleSubmit } />
        </ModalBody>
        <ModalFooter>
          <FormattedMessage id='modals.log_in.social' />
          <div>
            <a href={ paths.USERS_OAUTH_GOOGLE_SIGN_IN } >GOOGLE</a>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
};
SignInModal.propTypes = propTypes;

export default SignInModal;
