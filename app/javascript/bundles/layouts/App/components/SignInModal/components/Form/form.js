import React, { Component } from 'react';
import {Form as BForm, Button} from 'reactstrap';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { shape, func } from 'prop-types';

import { defaultMessages } from 'locales/default';
import FieldWithErrors from 'components/FieldWithErrors';
import { UnauthorizedModalsContext } from 'layouts/App/context';

const propTypes = {
  intl: shape({
    formatMessage: func.isRequired
  }).isRequired,
  handleSubmit: func.isRequired
};

class Form extends Component {
  state = {
    isPasswordVisible: false
  };

  togglePasswordVisibilityHandler = (e) => {
    e.preventDefault();
    this.setState((state) => ({ isPasswordVisible: !state.isPasswordVisible }));
  };

  toggleForgotPasswordModal = (e) => {
    const { toggleForgotPasswordModal } = this.context;

    e.preventDefault();
    toggleForgotPasswordModal();
  };

  render() {
    const {
      togglePasswordVisibilityHandler,
      toggleForgotPasswordModal,
      state: { isPasswordVisible },
      props: { intl: { formatMessage }, handleSubmit }
    } = this;

    return (
      <BForm onSubmit={ handleSubmit } >
        <div>
          <Field
            component={ FieldWithErrors }
            type='email'
            name='email'
            placeholder={ formatMessage(defaultMessages.userFieldsEmail) }
          />
        </div>
        <div>
          <Field
            component={ FieldWithErrors }
            type={ isPasswordVisible ? 'text' : 'password' }
            name='password'
            placeholder={ formatMessage(defaultMessages.userFieldsPassword) }
          />
          <Button onClick={ togglePasswordVisibilityHandler }>
            {/* FIXME: remvove from yml file, if will be replaced with icon */}
            {
              isPasswordVisible ?
                <FormattedMessage id='actions.hide_password' />
                :
                <FormattedMessage id='actions.show_password' />
            }
          </Button>
        </div>
        <div>
          <Button onClick={ toggleForgotPasswordModal } >
            <FormattedMessage id='modals.forgot_password.title' />
          </Button>
        </div>
        <div>
          <Button type='submit' >
            <FormattedMessage id='actions.sign_in' />
          </Button>
        </div>
      </BForm>
    );
  }
};
Form.propTypes = propTypes;
Form.contextType = UnauthorizedModalsContext;

export default Form;
