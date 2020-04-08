import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatList from './chatList';

import { selectors, actions } from 'core/chat';

const mapStateToProps = state => ({
  chats: selectors.getSortedChats(state),
  hasMorePages: selectors.getHasMorePages(state),
  currentChatId: selectors.getChatId(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    fetchChatsDispatch: actions.fetchChats
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
