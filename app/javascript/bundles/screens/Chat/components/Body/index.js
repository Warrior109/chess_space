import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './body';

import { selectors } from 'core/chat';
import { selectors as messageSelectors, actions as messageActions } from 'core/message';

const mapStateToProps = state => ({
  messages: messageSelectors.getMessages(state),
  hasMorePages: messageSelectors.getHasMorePages(state),
  chat: selectors.getChat(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    fetchMessagesListDispatch: messageActions.fetchMessagesList,
    subscribeToMessageWasCreatedDispatch: messageActions.subscribeToMessageWasCreated,
    subscribeToMessagesWasReadedDispatch: messageActions.subscribeToMessagesWasReaded,
    processMessageDispatch: messageActions.processMessage,
    readMessagesDispatch: messageActions.readMessages,
    markMessagesAsReadedDispatch: messageActions.markMessagesAsReaded
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
