import { reduxForm } from 'redux-form';

import Form from './form';
import { MAXIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_LENGTH } from 'core/currentUser/constants';

const validate = ({ password, passwordConfirmation }) => {
  const errors = {};
  if (!password) {
    errors.password = 'Required';
  } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too short. Minimum ${MINIMUM_PASSWORD_LENGTH} characters.`;
  } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too long. Maximum ${MAXIMUM_PASSWORD_LENGTH} characters.`;
  }

  if (passwordConfirmation !== password) {
    errors.passwordConfirmation = 'Passwords doesn\'t mismatch';
  }
  return errors;
};

export default reduxForm({ form: 'forgotPasswordUpdateForm', validate })(Form);
