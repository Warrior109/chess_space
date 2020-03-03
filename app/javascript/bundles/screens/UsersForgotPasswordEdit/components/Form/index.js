import { reduxForm } from 'redux-form';

import Form from './form';
import { validations } from 'core/currentUser';

const validate = ({ password, passwordConfirmation }) => {
  const errors = {};
  errors.password = validations.password(password);
  errors.passwordConfirmation = validations.passwordConfirmation(passwordConfirmation, password);

  return errors;
};

export default reduxForm({ form: 'forgotPasswordUpdateForm', validate })(Form);
