import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpModal from './signUpModal';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    checkUserEmailUniquenessDispatch: actions.checkUserEmailUniqueness
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
