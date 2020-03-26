import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage } from 'react-intl';
import { shape, array, object, string, func } from 'prop-types';

import { deleteSubscription } from 'lib/utils';
import { subscriptionIds } from 'core/message/constants';
import Loader from 'components/Loader';
import { paths } from 'layouts/constants';
import { Header, Body, Footer, ChatList } from './components';

const propTypes = {
  chat: object,
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired, history: object.isRequired,
  fetchChatScreenDataDispatch: func.isRequired,
  subscribeToMessageWasCreatedDispatch: func.isRequired,
  subscribeToMessageWasReadedDispatch: func.isRequired,
  processMessageDispatch: func.isRequired,
  clearChatScreenDataDispatch: func.isRequired,
  clearMessagesDispatch: func.isRequired,
  setChatDispatch: func.isRequired,
  fetchMessagesListDispatch: func.isRequired
};

class Chat extends Component {
  state = {
    isLoading: !this.props.chat,
    isChangingChat: false
  };

  componentDidMount() {
    const {
      subscribeToMessagesChannels,
      state: {isLoading},
      props: {
        fetchChatScreenDataDispatch,
        processMessageDispatch,
        match: {params: {id}},
        history
      }
    } = this;

    if (isLoading) {
      const callback = () => {
        subscribeToMessagesChannels();
        this.setState({ isLoading: false });
      };
      const errorCallback = () => {
        history.push(paths.ROOT);
        toastr.error('', {component: <FormattedMessage id='error_messages.access_restricted' />});
      };

      fetchChatScreenDataDispatch({id: parseInt(id), callback, errorCallback});
    } else {
      subscribeToMessagesChannels();
    };

  };

  componentWillUnmount() {
    const {
      unsubscribeFromMessagesChannels,
      props: {clearChatScreenDataDispatch}
    } = this;

    unsubscribeFromMessagesChannels();
    clearChatScreenDataDispatch();
  };

  subscribeToMessagesChannels = () => {
    const {
      subscribeToMessageWasCreatedDispatch,
      subscribeToMessageWasReadedDispatch,
      processMessageDispatch
    } = this.props;

    const onReceiveCreatedMessage = message => processMessageDispatch({message, action: 'create'});
    subscribeToMessageWasCreatedDispatch({onReceive: onReceiveCreatedMessage});

    const onReceiveReadedMessage = message => processMessageDispatch({message, action: 'update'});
    subscribeToMessageWasReadedDispatch({onReceive: onReceiveReadedMessage});
  };

  unsubscribeFromMessagesChannels = () => {
    deleteSubscription(subscriptionIds.MESSAGE_WAS_CREATED);
    deleteSubscription(subscriptionIds.MESSAGE_WAS_READED);
  };

  changeChat = chat => {
    const {history, clearMessagesDispatch, setChatDispatch, fetchMessagesListDispatch} = this.props;

    this.setState({isChangingChat: true});
    history.push(paths.CHAT.replace(':id', chat.id));
    clearMessagesDispatch();
    setChatDispatch({chat});

    const callback = () => this.setState({isChangingChat: false});
    fetchMessagesListDispatch({chatId: chat.id, page: 0, callback});
  };

  render() {
    const {
      changeChat,
      state: { isLoading, isChangingChat }
    } = this;

    if (isLoading) return <Loader />;

    return (
      <Container>
        <Row>
          <Col sm={ 3 } >
            <ChatList { ...{changeChat} } />
          </Col>
          <Col sm={ 9 } >
            {
              isChangingChat ?
                <Loader />
                :
                <Row>
                  <Col sm={ 12 } ><Header /></Col>
                  <Col sm={ 12 } ><Body /></Col>
                  <Col sm={ 12 } ><Footer /></Col>
                </Row>
            }
          </Col>
        </Row>
      </Container>
    );
  }
};
Chat.propTypes = propTypes;

export default Chat;
