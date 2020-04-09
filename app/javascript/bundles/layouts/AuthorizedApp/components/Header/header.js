import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { object, shape, string, bool, number, func } from 'prop-types';

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
  isOnChatPage: bool.isRequired,
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
      toastr.success(
        formatMessage(defaultMessages.toastrTitlesSuccess),
        {component: <FormattedMessage id='devise.sessions.signed_out' />}
      );
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
      props: { currentUser, isOnChatPage }
    } = this;

    const messagesLinkClass = classNames({
      disabled: isOnChatPage
    });
    return (
      <SharedHeader>
        { inProcess && <Loader /> }
        {
          !!currentUser.recentChat &&
            <Link
              className={ messagesLinkClass }
              to={ paths.CHAT.replace(':id', currentUser.recentChat.id) }
            >
              Chats
              {!!currentUser.unreadChatsCount && <span>({currentUser.unreadChatsCount})</span>}
            </Link>
        }
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
