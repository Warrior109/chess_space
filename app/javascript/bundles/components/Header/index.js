import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Header from './header';

import { selectors as currentUserSelectors } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: currentUserSelectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
