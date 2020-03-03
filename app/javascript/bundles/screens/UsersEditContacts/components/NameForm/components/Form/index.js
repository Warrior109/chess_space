import { reduxForm } from 'redux-form';

import { validations } from 'core/currentUser';
import Form from './form';

const validate = ({ firstName, lastName, password }) => {
  const errors = {};
  errors.firstName = validations.firstName(firstName);
  errors.lastName = validations.lastName(lastName);
  errors.password = validations.password(password);

  return errors;
};

export default reduxForm({ form: 'nameUpdateForm', validate })(Form);
