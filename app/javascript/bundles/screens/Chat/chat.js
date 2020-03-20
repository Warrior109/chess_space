import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage } from 'react-intl';
import { shape, array, object, string, func } from 'prop-types';

import { deleteSubscription } from 'lib/utils';
import { subscriptionIds } from 'core/message/constants';
import Loader from 'components/Loader';
import { paths } from 'layouts/constants';
import { Header, Body, Footer } from './components';

const propTypes = {
  chat: object,
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired, history: object.isRequired,
  fetchChatDispatch: func.isRequired,
  subscribeToMessageChannelDispatch: func.isRequired,
  processMessageDispatch: func.isRequired,
  setChatDispatch: func.isRequired
};

class Chat extends Component {
  state = {
    isLoading: !this.props.chat
  };

  componentDidMount() {
    const {
      state: {isLoading},
      props: {
        fetchChatDispatch,
        subscribeToMessageChannelDispatch,
        processMessageDispatch,
        match: {params: {id}},
        history
      }
    } = this;

    const onReceive = ({messageChannel: {message, action}}) => processMessageDispatch({message, action});

    if (isLoading) {
      const callback = () => {
        subscribeToMessageChannelDispatch({onReceive});
        this.setState({ isLoading: false });
      };
      const errorCallback = () => {
        history.push(paths.ROOT);
        toastr.error('', {component: <FormattedMessage id='error_messages.access_restricted' />});
      };

      fetchChatDispatch({ id: parseInt(id), callback, errorCallback });
    } else {
      subscribeToMessageChannelDispatch({onReceive});
    };

  };

  componentWillUnmount() {
    const { setChatDispatch } = this.props;

    deleteSubscription(subscriptionIds.MESSAGE_CHANNEL);
    setChatDispatch({chat: null});
  };

  render() {
    const {
      state: { isLoading }
    } = this;

    if (isLoading) return <Loader />;

    return (
      <Container>
        <Row>
          <Col sm={ 3 } >
            CHATS LIST
          </Col>
          <Col sm={ 9 } >
            <Row>
              <Col sm={ 12 } ><Header /></Col>
              <Col sm={ 12 } ><Body /></Col>
              <Col sm={ 12 } ><Footer /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
};
Chat.propTypes = propTypes;

export default Chat;
