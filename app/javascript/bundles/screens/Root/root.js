import React, { Component } from 'react';
import { string, shape, func } from 'prop-types';

const propTypes = {
};

// Do it with separatly component because we should load list of categories at first and only after this make Redirect
class Root extends Component {
  state = {
    isLoading: true
  };

  render () {
    const {
      state: { isLoading },
    } = this;

    return (
      <div>
        ROOT PAGE
      </div>
    );
  }
};

Root.propTypes = propTypes;

export default Root;
