import React, { Component } from 'react';
import { shape, array, string, func } from 'prop-types';

import Loader from 'components/Loader';

const propTypes = {
  chat: shape({
    messages: array.isRequired
  }),
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired,
  fetchChatDispatch: func.isRequired
};

class Chat extends Component {
  state = {
    isLoading: !this.props.chat
  };

  componentDidMount() {
    const {
      state: { isLoading },
      props: { fetchChatDispatch, match: { params: { id } } }
    } = this;

    if (isLoading) {
      const callback = () => this.setState({ isLoading: false });
      const errorCallback = () => this.setState({ isLoading: false });

      fetchChatDispatch({ id: parseInt(id), callback, errorCallback });
    };
  };

  render() {
    const {
      state: { isLoading },
      props: { chat }
    } = this;

    if (isLoading) return <Loader />;

    return (
      <div>
        {
          chat.messages.map(({id, text, sender}) => (
            <div key={ id } >
              <div>SenderId: { sender.id }</div>
              <div>Id: { id }</div>
              <div>Text: { text }</div>
            </div>
          ))
        }
      </div>
    );
  }
};
Chat.propTypes = propTypes;

export default Chat;
