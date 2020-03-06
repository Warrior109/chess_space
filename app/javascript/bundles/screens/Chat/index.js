import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';

import { selectors, actions } from 'core/chat';

const mapStateToProps = state => ({
  chat: selectors.getChat(state)
});

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
    fetchChatDispatch: actions.fetchChat
  }, dispatsh)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));
