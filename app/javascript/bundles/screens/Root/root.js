import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { string, shape, func } from 'prop-types';

import { paths } from 'layouts/constants';

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
      <div>Root</div>
    );
  }
};

Root.propTypes = propTypes;

export default Root;
