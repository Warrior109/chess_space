import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';

import { selectors, actions } from 'core/chat';
import { actions as messageActions } from 'core/message';

const mapStateToProps = state => ({
  chat: selectors.getChat(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    fetchChatScreenDataDispatch: actions.fetchChatScreenData,
    subscribeToMessageWasCreatedDispatch: messageActions.subscribeToMessageWasCreated,
    subscribeToMessageWasReadedDispatch: messageActions.subscribeToMessageWasReaded,
    processMessageDispatch: messageActions.processMessage,
    clearChatScreenDataDispatch: actions.clearChatScreenData,
    clearMessagesDispatch: messageActions.clearMessages,
    setChatDispatch: actions.setChat,
    fetchMessagesListDispatch: messageActions.fetchMessagesList,
    subscribeToChatWasUpdatedDispatch: actions.subscribeToChatWasUpdated
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));
