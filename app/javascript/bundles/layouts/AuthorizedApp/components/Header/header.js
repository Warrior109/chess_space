import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { object, shape, string, number, func } from 'prop-types';

import { defaultMessages } from 'locales/default';
import SharedHeader from 'components/Header';
import Loader from 'components/Loader';
import { paths } from 'layouts/constants';

const propTypes = {
  currentUser: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    thumbnailAvatar: shape({
      url: string.isRequired
    }).isRequired
  }).isRequired,
  intl: object.isRequired,
  history: object.isRequired,
  logOutDispatch: func.isRequired
};

class Header extends Component {
  state = {
    inProcess: false,
    isDropdownOpen: false
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  logOutHandler = () => {
    const { logOutDispatch, history, intl: { formatMessage } } = this.props;

    const callback = () => {
      toastr.success(formatMessage(defaultMessages.deviseSessionsSignedOut));
      history.push(paths.ROOT);
    };
    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    logOutDispatch({ callback, errorCallback });
  };

  toggleDropdown = () => this.setState((state) => ({ isDropdownOpen: !state.isDropdownOpen }));

  render() {
    const {
      logOutHandler,
      toggleDropdown,
      state: { inProcess, isDropdownOpen },
      props: { currentUser }
    } = this;

    return (
      <SharedHeader>
        { inProcess && <Loader /> }
        <Dropdown isOpen={ isDropdownOpen } toggle={ toggleDropdown } >
          <DropdownToggle caret >
            <img src={ currentUser.thumbnailAvatar.url } width={ 50 } height={ 50 } />
            <span>{ currentUser.firstName } { currentUser.lastName }</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={ Link } to={ paths.USERS_MY_PROFILE } >
              <FormattedMessage id='pages.my_profile' />
            </DropdownItem>

            <DropdownItem divider />

            <DropdownItem onClick={ logOutHandler }>
              <FormattedMessage id='actions.log_out' />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SharedHeader>
    );
  }
};

Header.propTypes = propTypes;

export default Header;
