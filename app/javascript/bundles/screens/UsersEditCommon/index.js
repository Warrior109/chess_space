import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersEditCommon from './usersEditCommon';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
  userUpdateFormInitialValues: selectors.getUserUpdateFormInitialValues(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    userUpdateDispatch: actions.userUpdate
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersEditCommon);
