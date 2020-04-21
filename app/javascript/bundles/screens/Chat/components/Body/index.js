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
    subscribeToMessageWasReadedDispatch: messageActions.subscribeToMessageWasReaded,
    processMessageDispatch: messageActions.processMessage,
    readMessageDispatch: messageActions.readMessage
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
