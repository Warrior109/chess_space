import React, { Component } from 'react';
import { func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  createMessageDispatch: func.isRequired,
  resetCreateMessageFormDispatch: func.isRequired
};

class Footer extends Component {
  state = {
    inProcess: false
  };

  componentDidMount() {
    this._ismounted = true;
  };

  componentDidMount() {
    this._ismounted = true;
  };

  handleSubmit = ({ text }) => {
    const {createMessageDispatch, resetCreateMessageFormDispatch} = this.props;

    const callback = () => {
      resetCreateMessageFormDispatch();
      this.setState({inProcess: false});
    };
    const errorCallback = () => this._ismounted && this.setState({inProcess: false});

    this.setState({ inProcess: true });
    createMessageDispatch({ text, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess }
    } = this;

    return (
      <div>
        { inProcess && <Loader /> }
        <Form onSubmit={ handleSubmit } />
      </div>
    );
  };
};
Footer.propTypes = propTypes;

export default Footer;
