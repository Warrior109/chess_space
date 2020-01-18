import React, { Component } from 'react';
import { defaultMessages } from 'locales/default';
// import { intlShape } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { object, shape, string, number, func } from 'prop-types';

import SharedHeader from 'components/Header';
import { paths } from 'layouts/constants';

const propTypes = {
  // intl: intlShape.isRequired,
  currentUser: shape({
    avatar: shape({
      thumbUrl: string.isRequired
    }).isRequired,
    displayName: string.isRequired,
    bonusPoints: number.isRequired,
  }).isRequired,
  history: object.isRequired,
  logOutDispatch: func.isRequired
};

class Header extends Component {
  state = {
    isDropdownOpen: false,
    isOpenSettingsModal: false
  };

  logOutHandler = () => {
    const { logOutDispatch, history, intl: { formatMessage } } = this.props;

    const callback = () => {
      toastr.success(formatMessage(defaultMessages.deviseSessionsSignedOut));
      history.push(paths.ROOT);
    };
    logOutDispatch({ callback });
  };

  toggle = key => this.setState({ [key]: !this.state[key] });

  render() {
    const {
      logOutHandler,
      toggle,
      state: {},
      props: { currentUser, intl: { formatMessage } }
    } = this;

    return (
      <SharedHeader>
        Signed in
      </SharedHeader>
    );
  }
};

Header.propTypes = propTypes;

export default Header;
