import React, { Fragment } from 'react';
import { any } from 'prop-types';

import Footer from 'components/Footer';

import { Header } from './components';

const propTypes = {
  children: any,
};

const AuthorizedApp = ({ children }) => {
  return (
    <Fragment>
      <Header />
      { children }
      <Footer />
    </Fragment>
  );
};
AuthorizedApp.propTypes = propTypes;

export default AuthorizedApp;
