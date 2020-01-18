import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import { defaultMessages } from 'locales/default';
import { FormattedMessage } from 'react-intl';
import { paths } from 'layouts/constants';
import { any, string, object } from 'prop-types';

import { SignUpModal } from './components';

const propTypes = {
  children: any,
  currentUser: object,
  history: object.isRequired
};

class Header extends Component {
  state = {
    isSignUpModalOpen: false
  };

  toggleSignUpModal = () => {
    this.setState(state => ({ isSignUpModalOpen: !state.isSignUpModalOpen }));
  }

  render() {
    const {
      toggleSignUpModal,
      state: { isSignUpModalOpen },
      props: { children, currentUser, history }
    } = this;

    return (
      <header>
        <div className='container'>
          <Navbar className='navbar-expand-lg navbar-dark'>
            <NavLink to={ paths.ROOT } className='nav-link navbar-brand'>
              <span>CheSSSpace</span>
            </NavLink>
            {
              !currentUser.id &&
                <Fragment>
                  <a onClick={ toggleSignUpModal } >
                    <FormattedMessage id='registration' />
                  </a>
                </Fragment>
            }
          </Navbar>
        </div>
        {
          !currentUser.id &&
            <SignUpModal isOpen={ isSignUpModalOpen } toggle={ toggleSignUpModal } />
        }
      </header>
    );
  }
};

Header.propTypes = propTypes;

export default Header;
