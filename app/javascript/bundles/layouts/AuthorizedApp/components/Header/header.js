import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { object, shape, string, number, func } from 'prop-types';

import { defaultMessages } from 'locales/default';
import SharedHeader from 'components/Header';
import Loader from 'components/Loader';
import { paths } from 'layouts/constants';

const propTypes = {
  currentUser: shape({
    id: number.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired
  }).isRequired,
  intl: object.isRequired,
  history: object.isRequired,
  logOutDispatch: func.isRequired
};

class Header extends Component {
  state = {
    inProcess: false
  };

  logOutHandler = () => {
    const { logOutDispatch, history, intl: { formatMessage } } = this.props;

    const callback = () => {
      toastr.success(formatMessage(defaultMessages.deviseSessionsSignedOut));
      history.push(paths.ROOT);
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    logOutDispatch({ callback, errorCallback });
  };

  render() {
    const {
      logOutHandler,
      state: { inProcess },
      props: { currentUser }
    } = this;

    return (
      <SharedHeader>
        { inProcess && <Loader /> }
        <NavItem>
          <a style={ { cursor: 'pointer' } } onClick={ logOutHandler } >
            <FormattedMessage id='actions.log_out' />
          </a>
        </NavItem>
      </SharedHeader>
    );
  }
};

Header.propTypes = propTypes;

export default Header;
