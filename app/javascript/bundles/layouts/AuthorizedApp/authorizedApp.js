import React, {Fragment, Component} from 'react';
import {any, func} from 'prop-types';

import Footer from 'components/Footer';
import { deleteSubscription } from 'lib/utils';
import { subscriptionIds } from 'core/currentUser/constants';
import { Header } from './components';

const propTypes = {
  children: any,
  subscribeToCurrentUserWasUpdatedDispatch: func.isRequired,
  setCurrentUserDispatch: func.isRequired
};

class AuthorizedApp extends Component {
  componentDidMount() {
    const {subscribeToCurrentUserWasUpdatedDispatch, setCurrentUserDispatch} = this.props;

    subscribeToCurrentUserWasUpdatedDispatch({
      onReceive: user => setCurrentUserDispatch({currentUser: user})
    });
  };

  componentWillUnmount() {
    deleteSubscription(subscriptionIds.CURRENT_USER_WAS_UPDATED);
  };

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Header />
        { children }
        <Footer />
      </Fragment>
    );
  }
};
AuthorizedApp.propTypes = propTypes;

export default AuthorizedApp;
