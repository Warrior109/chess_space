import React, { Component } from 'react';
import { UnauthorizedModalsContext } from 'layouts/App/context';
import { string, any } from 'prop-types';

const propTypes = {
  className: string,
  children: any
};

class SignInModalLink extends Component {
  render() {
    const { className, children } = this.props;
    const { toggleSignInModal } = this.context;

    return (
      <a { ...{ className } } onClick={ toggleSignInModal } >
        { children }
      </a>
    );
  }
};
SignInModalLink.propTypes = propTypes;
SignInModalLink.contextType = UnauthorizedModalsContext;

export default SignInModalLink;
