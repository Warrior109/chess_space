import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthorizedApp from './authorizedApp';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    subscribeToCurrentUserWasUpdatedDispatch: actions.subscribeToCurrentUserWasUpdated,
    setCurrentUserDispatch: actions.setCurrentUser
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedApp);
