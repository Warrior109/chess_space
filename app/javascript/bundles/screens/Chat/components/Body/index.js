import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './body';

import { selectors as messageSelectors } from 'core/message';

const mapStateToProps = state => ({
  messages: messageSelectors.getMessages(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
