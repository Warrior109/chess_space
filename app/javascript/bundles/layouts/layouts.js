import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CustomRouteSwitch from 'lib/CustomRouteSwitch';
import { object, string } from 'prop-types';

import App from './App';
import AuthorizedApp from './AuthorizedApp';
import UsersEdit from './UsersEdit';
import {
  Landing, Root,
  UsersEditCommon, UsersEditContacts, UsersEditSecurity,
  UsersMyProfile,
  UsersForgotPasswordEdit,
  Chat
} from 'screens';
import { paths } from './constants';

const propTypes = {
};

const Layouts = () => {
  return (
    <CustomRouteSwitch>
      <CustomRouteSwitch component={ App } auth={ false } >
        <Route path={ paths.ROOT } component={ Landing } exact />
        <Route path={ paths.USERS_FORGOT_PASSWORD_EDIT } component={ UsersForgotPasswordEdit } exact />

        <Redirect to={ paths.ROOT } />
      </CustomRouteSwitch>

      <CustomRouteSwitch component={ AuthorizedApp } auth >
        <Route path={ paths.ROOT } component={ Root } exact />

        <Route path={ paths.USERS_MY_PROFILE } component={ UsersMyProfile } exact />
        <CustomRouteSwitch component={ UsersEdit } path={ paths.USERS_EDIT } >
          <Route path={ paths.USERS_EDIT_COMMON } component={ UsersEditCommon } exact />
          <Route path={ paths.USERS_EDIT_CONTACTS } component={ UsersEditContacts } exact />
          <Route path={ paths.USERS_EDIT_SECURITY } component={ UsersEditSecurity } exact />
        </CustomRouteSwitch>

        <Route path={ paths.CHAT } component={ Chat } exact />

        <Redirect to={ paths.ROOT } />
      </CustomRouteSwitch>
    </CustomRouteSwitch>
  );
};

Layouts.propTypes = propTypes;

export default Layouts;
