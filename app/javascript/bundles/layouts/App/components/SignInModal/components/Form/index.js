import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import Form from './form';
import { MAXIMUM_PASSWORD_LENGTH, MINIMUM_PASSWORD_LENGTH } from 'core/currentUser/constants';

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!password) {
    errors.password = 'Required';
  } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too short. Minimum ${MINIMUM_PASSWORD_LENGTH} characters.`;
  } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
    errors.password = `Password too long. Maximum ${MAXIMUM_PASSWORD_LENGTH} characters.`;
  }
  return errors;
};

export default reduxForm({ form: 'signInForm', validate })(injectIntl(Form));
