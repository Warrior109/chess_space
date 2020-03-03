import { reduxForm } from 'redux-form';

import Form from './form';
import { validations } from 'core/currentUser';

const validate = ({ password, newPassword, newPasswordConfirmation }) => {
  const errors = {};
  errors.password = validations.password(password);
  errors.newPassword = validations.password(newPassword);
  errors.newPasswordConfirmation = validations.passwordConfirmation(
    newPasswordConfirmation, newPassword
  );

  return errors;
};

export default reduxForm({ form: 'passwordUpdateForm', validate })(Form);
