import { reduxForm } from 'redux-form';

import Form from './form';

const validate = ({ firstName, lastName, password }) => {
  const errors = {};
  if (!firstName) errors.firstName = 'Required';
  if (!lastName) errors.lastName = 'Required';
  if (!password) errors.password = 'Required';
  return errors;
};

export default reduxForm({ form: 'nameUpdateForm', validate })(Form);
