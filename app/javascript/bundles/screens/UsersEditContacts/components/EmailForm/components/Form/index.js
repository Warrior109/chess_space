import { reduxForm } from 'redux-form';

import { validations } from 'core/currentUser';
import Form from './form';

const validate = ({ email, password }) => {
  const errors = {};
  errors.email = validations.email(email);
  errors.password = validations.password(password);

  return errors;
};

export default reduxForm({ form: 'emailUpdateForm', validate })(Form);
