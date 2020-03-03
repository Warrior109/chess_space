import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import Form from './form';
import { validations } from 'core/currentUser';

const validate = ({ password }) => {
  const errors = {};
  errors.password = validations.password(password);

  return errors;
};

export default reduxForm({ form: 'currentUserDeleteForm', validate })(injectIntl(Form));
