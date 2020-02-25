import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import Form from './form';

const validate = ({ email }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  return errors;
};

export default reduxForm({ form: 'forgotPasswordForm', validate })(injectIntl(Form));
