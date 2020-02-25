import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ForgotPasswordModal from './forgotPasswordModal';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    currentUserForgotPasswordDispatch: actions.currentUserForgotPassword
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal);

