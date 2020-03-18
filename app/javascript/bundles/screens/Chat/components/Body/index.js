import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './body';

import { selectors } from 'core/chat';
import { selectors as messageSelectors, actions as messageActions } from 'core/message';

const mapStateToProps = state => ({
  messages: messageSelectors.getMessages(state),
  hasMorePages: messageSelectors.getHasMorePages(state),
  chatId: selectors.getChatId(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    clearMessagesDispatch: messageActions.clearMessages,
    fetchMessagesListDispatch: messageActions.fetchMessagesList
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
