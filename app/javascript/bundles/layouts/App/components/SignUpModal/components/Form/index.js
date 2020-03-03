import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import Form from './form';
import { validations } from 'core/currentUser';

const validate = ({ email, firstName, lastName, password, passwordConfirmation }) => {
  const errors = {};
  errors.email = validations.email(email);
  errors.firstName = validations.firstName(firstName);
  errors.lastName = validations.lastName(lastName);
  errors.password = validations.password(password);
  errors.passwordConfirmation = validations.passwordConfirmation(passwordConfirmation, password);

  return errors;
};

export default reduxForm({ form: 'signUpForm', validate })(injectIntl(Form));
