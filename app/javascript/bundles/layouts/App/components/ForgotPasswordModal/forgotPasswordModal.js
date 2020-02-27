import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { bool, func } from 'prop-types';

import Loader from 'components/Loader';
import { UnauthorizedModalsContext } from 'layouts/App/context';
import { Form } from './components';

const propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  currentUserForgotPasswordDispatch: func.isRequired
};

class ForgotPasswordModal extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ email }) => {
    const { currentUserForgotPasswordDispatch, toggle } = this.props;

    const callback = () => {
      this.setState({ inProcess: false });
      toastr.success(
        '',
        {
          component: <FormattedMessage id='user.success_messages.sended_reset_password_instructions' />
        }
      );
      toggle();
    };

    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    currentUserForgotPasswordDispatch({ email, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      context: { toggleSignInModal },
      props: { isOpen, toggle }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } } >
        <ModalHeader { ...{ toggle } } charCode='x' >
          <FormattedMessage id='modals.forgot_password.title' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <div>
            <p>
              <FormattedMessage id='modals.forgot_password.p1' />
            </p>
            <Form onSubmit={ handleSubmit } />
          </div>
          <div>
            <FormattedMessage id='modals.forgot_password.remember_password' />
            &nbsp;
            <button onClick={ toggleSignInModal } >
              <FormattedMessage id='modals.log_in.title' />
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
};
ForgotPasswordModal.propTypes = propTypes;
ForgotPasswordModal.contextType = UnauthorizedModalsContext;

export default ForgotPasswordModal;
