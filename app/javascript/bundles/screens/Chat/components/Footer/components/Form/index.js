import { reduxForm } from 'redux-form';

import Form from './form';
import { validations } from 'core/message';

const validate = ({ text }) => {
  const errors = {};
  errors.text = validations.text(text);
  return errors;
};

export default reduxForm({ form: 'createMessageForm', validate })(Form);
