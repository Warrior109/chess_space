import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import CustomRouteSwitch from './customRouteSwitch';
import { selectors as currentUserSelectors } from 'core/currentUser';

const mapStateToProps = (state) => ({
  currentUser: currentUserSelectors.getCurrentUser(state),
  Route
});

export default connect(mapStateToProps, {})(withRouter(CustomRouteSwitch));
