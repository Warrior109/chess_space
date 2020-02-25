import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import UsersForgotPasswordEdit from './usersForgotPasswordEdit';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    currentUserForgotPasswordUpdateDispatch: actions.currentUserForgotPasswordUpdate
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersForgotPasswordEdit));
