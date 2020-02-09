import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmailForm from './emailForm';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    userSecureUpdateDispatch: actions.userSecureUpdate
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
