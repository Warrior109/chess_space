import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Header from './header';

import { selectors, actions } from 'core/currentUser';
import { selectors as routerSelectors } from 'core/router';

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state),
  isOnChatPage: routerSelectors.isOnChatPage(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    logOutDispatch: actions.logOut
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(Header)));
