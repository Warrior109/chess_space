import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { any } from 'prop-types';

import { paths } from 'layouts/constants';

const propTypes = {
  children: any
};

const Header = ({ children }) => {
  return (
    <header>
      <div className='container'>
        <Navbar className='navbar-expand-lg navbar-dark'>
          <NavLink to={ paths.ROOT } className='nav-link navbar-brand'>
            <span>CheSSSpace</span>
          </NavLink>
          { children }
        </Navbar>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;

export default Header;
