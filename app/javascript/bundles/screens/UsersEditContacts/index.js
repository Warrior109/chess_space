import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersEditContacts from './usersEditContacts';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    currentUserDisconnectSocialDispatch: actions.currentUserDisconnectSocial
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersEditContacts);
