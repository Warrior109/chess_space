import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import DeleteConfirmationModal from './deleteConfirmationModal';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    currentUserDeleteDispatch: actions.currentUserDelete
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteConfirmationModal));
