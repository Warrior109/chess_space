import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { shape, func } from 'prop-types';

import { defaultMessages } from 'locales/default';
import FieldWithErrors from 'components/FieldWithErrors';

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

  render() {
    const {
      togglePasswordVisibilityHandler,
      state: { isPasswordVisible },
      props: { intl: { formatMessage }, handleSubmit }
    } = this;

    return (
      <form onSubmit={ handleSubmit } >
        <Field
          component={ FieldWithErrors }
          type='email'
          name='email'
          placeholder={ formatMessage(defaultMessages.userFieldsEmail) }
        />
        <Field
          component={ FieldWithErrors }
          type={ isPasswordVisible ? 'text' : 'password' }
          name='password'
          placeholder={ formatMessage(defaultMessages.userFieldsPassword) }
        />
        <button onClick={ togglePasswordVisibilityHandler }>
          {/* FIXME: remvove from yml file, if will be replaced with icon */}
          {
            isPasswordVisible ?
              <FormattedMessage id='actions.hide_password' />
              :
              <FormattedMessage id='actions.show_password' />
          }
        </button>
        <button type='submit' >
          <FormattedMessage id='actions.sign_in' />
        </button>
      </form>
    );
  }
};
Form.propTypes = propTypes;

export default Form;
