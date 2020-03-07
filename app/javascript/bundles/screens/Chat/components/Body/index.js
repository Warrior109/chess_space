import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './body';

import { selectors, actions } from 'core/chat';

const mapStateToProps = state => ({
  messages: selectors.getChatMessages(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
