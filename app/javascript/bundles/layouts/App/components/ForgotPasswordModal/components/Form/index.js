import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import { validations } from 'core/currentUser';
import Form from './form';

const validate = ({ email }) => {
  const errors = {};
  errors.email = validations.email(email);

  return errors;
};

export default reduxForm({ form: 'forgotPasswordForm', validate })(injectIntl(Form));
