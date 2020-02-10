import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {} from 'prop-types';

import { paths } from 'layouts/constants';

const propTypes = {};

const Navbar = (props) => {
  return (
    <div>
      <div>
        <NavLink to={ paths.USERS_EDIT_COMMON } >
          <FormattedMessage id='pages.profile_edit.common' />
        </NavLink>
      </div>
      <div>
        <NavLink to={ paths.USERS_EDIT_CONTACTS } >
          <FormattedMessage id='pages.profile_edit.contacts' />
        </NavLink>
      </div>
      <div>
        <NavLink to={ paths.USERS_EDIT_SECURITY } >
          <FormattedMessage id='pages.profile_edit.security' />
        </NavLink>
      </div>
    </div>
  );
};
Navbar.propTypes = propTypes;

export default Navbar;
