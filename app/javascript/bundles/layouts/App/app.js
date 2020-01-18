import React, { Component } from 'react';
import { any, func, object, string } from 'prop-types';

import Footer from 'components/Footer';

import { Header } from './components';
import { UnauthorizedModalsContext } from './context';
import { paths } from 'layouts/constants';

const propTypes = {
  children: any,
  setCurrentUserDispatch: func.isRequired,
  history: object.isRequired,
  location: object.isRequired
};

class App extends Component {
  state = {
  };

  render() {
    const {
      state: {  },
      props: { children }
    } = this;

    return (
      <UnauthorizedModalsContext.Provider value={ {  } } >
        <Header />
        { children }
        <Footer />
      </UnauthorizedModalsContext.Provider>
    );
  }
};

App.propTypes = propTypes;

export default App;
