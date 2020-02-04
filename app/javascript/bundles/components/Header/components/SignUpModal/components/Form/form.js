import React from 'react';
import { Field } from 'redux-form';
import { func } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { defaultMessages } from 'locales/default';
import FieldWithErrors from 'components/FieldWithErrors';

const propTypes = {
  handleSubmit: func.isRequired
};

const Form = ({ intl: { formatMessage }, handleSubmit }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        component={ FieldWithErrors }
        type='text'
        name='firstName'
        placeholder={ formatMessage(defaultMessages.firstName) }
      />
      <Field
        component={ FieldWithErrors }
        type='text'
        name='lastName'
        placeholder={ formatMessage(defaultMessages.lastName) }
      />
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
      <Field
        component={ FieldWithErrors }
        type='password'
        name='passwordConfirmation'
        placeholder={ formatMessage(defaultMessages.passwordConfirmation) }
      />
      <button type='submit' className='signup-modal-btn' >
        <FormattedMessage id='registrate' />
      </button>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
