import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CustomRouteSwitch from 'lib/CustomRouteSwitch';
import { object, string } from 'prop-types';

import App from './App';
import AuthorizedApp from './AuthorizedApp';
import { Landing, Root } from 'screens';
import { paths } from './constants';

const propTypes = {
};

const Layouts = () => {
  return (
    <CustomRouteSwitch>
      <CustomRouteSwitch component={ App } auth={ false } >
        <Route path={ paths.ROOT } component={ Landing } exact />
      </CustomRouteSwitch>

      <CustomRouteSwitch component={ AuthorizedApp } auth >
        <Route path={ paths.ROOT } component={ Root } exact />
      </CustomRouteSwitch>
    </CustomRouteSwitch>
  );
};

Layouts.propTypes = propTypes;

export default Layouts;
