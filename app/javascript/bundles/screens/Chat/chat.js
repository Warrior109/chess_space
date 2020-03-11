import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { shape, array, object, string, func } from 'prop-types';

import Loader from 'components/Loader';
import { Header, Body, Footer } from './components';

const propTypes = {
  chat: object,
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired,
  fetchChatScreenDataDispatch: func.isRequired,
  subscribeToMessagesChannelDispatch: func.isRequired,
  pushMessageDispatch: func.isRequired
};

class Chat extends Component {
  state = {
    isLoading: !this.props.chat
  };

  componentDidMount() {
    const {
      state: {isLoading},
      props: {
        fetchChatScreenDataDispatch,
        subscribeToMessagesChannelDispatch,
        pushMessageDispatch,
        match: {params: {id}}
      }
    } = this;

    if (isLoading) {
      const callback = () => this.setState({ isLoading: false });
      const errorCallback = () => this.setState({ isLoading: false });

      fetchChatScreenDataDispatch({ id: parseInt(id), callback, errorCallback });
    };

    const onReceive = ({newMessages}) => pushMessageDispatch({message: newMessages});
    subscribeToMessagesChannelDispatch({ onReceive });
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
