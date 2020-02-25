import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersMyProfile from './usersMyProfile';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state),
  birthday: selectors.getBirthday(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersMyProfile);
