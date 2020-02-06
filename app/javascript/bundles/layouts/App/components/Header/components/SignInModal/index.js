import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInModal from './signInModal';

import { selectors, actions } from 'core/currentUser';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    signInDispatch: actions.signIn
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
