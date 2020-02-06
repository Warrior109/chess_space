import React from 'react';
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

const Form = ({ intl: { formatMessage }, handleSubmit }) => {
  return (
    <form onSubmit={ handleSubmit } >
      <Field
        component={ FieldWithErrors }
        type='email'
        name='email'
        placeholder={ formatMessage(defaultMessages.email) }
      />
      <Field
        component={ FieldWithErrors }
        type='password'
        name='password'
        placeholder={ formatMessage(defaultMessages.password) }
      />
      <button type='submit' >
        <FormattedMessage id='sign_in' />
      </button>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
