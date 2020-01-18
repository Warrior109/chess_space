import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Header from './header';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state),
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    logOutDispatch: actions.logOut
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(Header)));
