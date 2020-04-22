import {reduxForm, submit} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { validations } from 'core/message';
import Form from './form';

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    submitForm: () => submit('createMessageForm')
  }, dispatsh)
);

const validate = ({ text }) => {
  const errors = {};
  errors.text = validations.text(text);
  return errors;
};

export default reduxForm({form: 'createMessageForm', validate})(
  connect(null, mapDispatchToProps)(Form)
);
