import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { object, bool, func } from 'prop-types';

import { paths } from 'layouts/constants';
import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  isOpen: bool.isRequired,
  history: object.isRequired,
  toggle: func.isRequired,
  currentUserDeleteDispatch: func.isRequired
};

class DeleteConfirmationModal extends Component {
  state = {
    inProcess: false
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleSubmit = ({ password }) => {
    const { currentUserDeleteDispatch, history } = this.props;

    const callback = () => {
      history.push(paths.ROOT);
      toastr.success(
        '', { component: <FormattedMessage id='user.success_messages.account_deleted' /> }
      );
    };
    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    currentUserDeleteDispatch({ password, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { isOpen, toggle, currentUserDeleteDispatch }
    } = this;

    return (
      <Modal { ...{ isOpen, toggle } } >
        <ModalHeader { ...{ toggle } } charCode='x' >
          <FormattedMessage id='modals.delete_account.title' />
        </ModalHeader>
        <ModalBody>
          { inProcess && <Loader /> }
          <Form onSubmit={ handleSubmit } />
        </ModalBody>
      </Modal>
    );
  }
};
DeleteConfirmationModal.propTypes = propTypes;

export default DeleteConfirmationModal;
