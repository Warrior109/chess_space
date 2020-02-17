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
      <div>
        <FormattedMessage id='modals.delete_account.explanation_message' />:
      </div>
      <div>
        <Field
          component={ FieldWithErrors }
          type='password'
          name='password'
          placeholder={ formatMessage(defaultMessages.actionsTypePassword) }
        />
      </div>
      <div>
        <button type='submit' >
          <FormattedMessage id='actions.delete' />
        </button>
      </div>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
