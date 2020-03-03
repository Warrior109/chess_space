import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import Form from './form';
import { validations } from 'core/currentUser';

const validate = ({ email, password }) => {
  const errors = {};
  errors.email = validations.email(email);
  errors.password = validations.password(password);
  return errors;
};

export default reduxForm({ form: 'signInForm', validate })(injectIntl(Form));
