import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
      <div>
        <Link to={ paths.USERS_EDIT_COMMON } >
          <FormattedMessage id='pages.profile_edit.title' />
        </Link>
      </div>
    );
  }
};

Root.propTypes = propTypes;

export default Root;
