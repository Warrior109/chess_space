import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import App from './app';

import { actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    setCurrentUserDispatch: actions.setCurrentUser
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
