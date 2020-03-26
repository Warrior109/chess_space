import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatItem from './chatItem';

import {selectors, actions} from 'core/chat';

const makeMapStateToProps = () => {
  const isActiveChat = selectors.makeIsActiveChat();
  const mapStateToProps = (state, props) => ({
    isActive: isActiveChat(state, props)
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatsh => (
  bindActionCreators({
  }, dispatsh)
);

export default connect(makeMapStateToProps, mapDispatchToProps)(ChatItem);
