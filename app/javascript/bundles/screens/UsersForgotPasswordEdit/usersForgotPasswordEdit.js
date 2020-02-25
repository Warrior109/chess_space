import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { object, func } from 'prop-types';

import Loader from 'components/Loader';
import { paths } from 'layouts/constants';
import { Form } from './components';

const propTypes = {
  location: object.isRequired,
  history: object.isRequired,
  currentUserForgotPasswordUpdateDispatch: func.isRequired
};

class UsersForgotPasswordEdit extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ password, passwordConfirmation }) => {
    const {
      props: { location, history, currentUserForgotPasswordUpdateDispatch }
    } = this;

    const callback = () => {
      this.setState({ inProcess: false });
      history.push(paths.ROOT);
      toastr.success('', { component: <FormattedMessage id='devise.passwords.updated' /> });
    };

    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    const resetPasswordToken = queryString.parse(location.search).reset_password_token || '';
    currentUserForgotPasswordUpdateDispatch({
      password, passwordConfirmation, resetPasswordToken, callback, errorCallback
    });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess }
    } = this;

    return (
      <div>
        { inProcess && <Loader /> }
        <div>
          <h3>
            <FormattedMessage id='pages.users_forgot_password_edit.title' />
          </h3>
          <Form onSubmit={ handleSubmit } />
        </div>
      </div>
    );
  }
};
UsersForgotPasswordEdit.propTypes = propTypes;

export default UsersForgotPasswordEdit;
