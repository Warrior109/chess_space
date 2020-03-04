import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  userSecureUpdateDispatch: func.isRequired,
  resetPasswordUpdateFormDispatch: func.isRequired
};

class UsersEditSecurity extends Component {
  state = {
    inProcess: false
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleSubmit = ({ password, newPassword, newPasswordConfirmation }) => {
    const { userSecureUpdateDispatch, resetPasswordUpdateFormDispatch } = this.props;

    const callback = () => {
      resetPasswordUpdateFormDispatch();
      this.setState({ inProcess: false });
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> });
    };

    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    userSecureUpdateDispatch({
      password, newPassword, newPasswordConfirmation, callback, errorCallback
    });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess }
    } = this;

    return (
      <Container>
        <Form onSubmit={ handleSubmit } />
        { inProcess && <Loader /> }
      </Container>
    );
  }
};
UsersEditSecurity.propTypes = propTypes;

export default UsersEditSecurity;
