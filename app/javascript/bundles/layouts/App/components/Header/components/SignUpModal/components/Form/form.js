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
    <form onSubmit={ handleSubmit }>
      <Field
        component={ FieldWithErrors }
        type='text'
        name='firstName'
        placeholder={ formatMessage(defaultMessages.userFieldsFirstName) }
      />
      <Field
        component={ FieldWithErrors }
        type='text'
        name='lastName'
        placeholder={ formatMessage(defaultMessages.userFieldsLastName) }
      />
      <Field
        component={ FieldWithErrors }
        type='email'
        name='email'
        placeholder={ formatMessage(defaultMessages.userFieldsEmail) }
      />
      <Field
        component={ FieldWithErrors }
        type='password'
        name='password'
        placeholder={ formatMessage(defaultMessages.userFieldsPassword) }
      />
      <Field
        component={ FieldWithErrors }
        type='password'
        name='passwordConfirmation'
        placeholder={ formatMessage(defaultMessages.userFieldsPasswordConfirmation) }
      />
      <button type='submit' >
        <FormattedMessage id='actions.registrate' />
      </button>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
