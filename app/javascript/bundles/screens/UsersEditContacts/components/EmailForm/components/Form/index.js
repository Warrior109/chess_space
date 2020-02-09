import { reduxForm } from 'redux-form';

import Form from './form';

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!password) errors.password = 'Required';
  return errors;
};

export default reduxForm({ form: 'emailUpdateForm', validate })(Form);
