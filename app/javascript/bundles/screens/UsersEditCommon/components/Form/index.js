import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Form from './form';

import { actions, selectors } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

const validate = ({}) => {
  const errors = {};
  return errors;
};

export default reduxForm({
  form: 'userUpdateForm',
  validate
})(
  connect(mapStateToProps, mapDispatchToProps)(Form)
);
