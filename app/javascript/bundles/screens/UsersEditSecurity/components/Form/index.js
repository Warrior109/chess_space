import { reduxForm } from 'redux-form';

import Form from './form';
import { MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH } from 'core/currentUser/constants';

const validate = ({ password, newPassword, newPasswordConfirmation }) => {
  const errors = {};
  if (!password) errors.password = 'Required';

  if (!newPassword) {
    errors.newPassword = 'Required';
  } else if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
    errors.newPassword = `Password too short. Minimum ${MINIMUM_PASSWORD_LENGTH} characters.`;
  } else if (newPassword.length > MAXIMUM_PASSWORD_LENGTH) {
    errors.newPassword = `Password too long. Maximum ${MAXIMUM_PASSWORD_LENGTH} characters.`;
  }

  if (newPasswordConfirmation !== newPassword) {
    errors.newPasswordConfirmation = 'Passwords doesn\'t mismatch';
  }
  return errors;
};

export default reduxForm({ form: 'passwordUpdateForm', validate })(Form);
