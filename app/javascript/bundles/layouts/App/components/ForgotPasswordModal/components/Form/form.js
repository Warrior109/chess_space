import React from 'react';
import { Field } from 'redux-form';
import {Form as BForm, Button} from 'reactstrap';
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
    <BForm onSubmit={ handleSubmit } >
      <div>
        <Field
          type='email'
          name='email'
          component={ FieldWithErrors }
          autoComplete='email'
          placeholder={ formatMessage(defaultMessages.userFieldsEmail) }
          autoFocus
        />
      </div>
      <Button type='submit' >
        <FormattedMessage id='actions.send' />
      </Button>
    </BForm>
  );
};
Form.propTypes = propTypes;

export default Form;
