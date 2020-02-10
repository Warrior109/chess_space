import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import UsersEditSecurity from './usersEditSecurity';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    userSecureUpdateDispatch: actions.userSecureUpdate,
    resetPasswordUpdateFormDispatch: () => reset('passwordUpdateForm')
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersEditSecurity);
