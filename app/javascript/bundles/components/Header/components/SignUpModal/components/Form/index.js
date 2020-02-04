import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import Form from './form';
import { MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH } from './constants';

const validate = ({ email, firstName, lastName, password, passwordConfirmation }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!firstName) errors.firstName = 'Required';
  if (!lastName) errors.lastName = 'Required';
  if (!password) {
    errors.password = 'Required';
  } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too short. Minimum ${MINIMUM_PASSWORD_LENGTH} characters.`;
  } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too long. Maximum ${MAXIMUM_PASSWORD_LENGTH} characters.`;
  }

  if (passwordConfirmation !== password) {
    errors.passwordConfirmation = "Passwords doesn't mismatch";
  }
  return errors;
}

export default reduxForm({ form: 'signUp', validate })(injectIntl(Form));
