import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset } from 'redux-form';
import Footer from './footer';

import { selectors, actions } from 'core/message';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    createMessageDispatch: actions.createMessage,
    resetCreateMessageFormDispatch: () => reset('createMessageForm')
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
