import React, { Component, Fragment } from 'react';
import { any, func, object, string } from 'prop-types';

import Footer from 'components/Footer';

import { Header } from './components';
import { paths } from 'layouts/constants';

const propTypes = {
  children: any
};

const App = ({ children }) => {
  return (
    <Fragment>
      <Header />
      { children }
      <Footer />
    </Fragment>
  );
};

App.propTypes = propTypes;

export default App;
