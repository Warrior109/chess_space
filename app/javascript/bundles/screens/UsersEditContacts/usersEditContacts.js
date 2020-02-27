import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { shape, string, func } from 'prop-types';

import Loader from 'components/Loader';
import { paths, GOOGLE_PROVIDER } from 'layouts/constants';
import { PROVIDER_TO_SOCIAL } from './constants';
import { NameForm, EmailForm } from './components';

const propTypes = {
  currentUser: shape({
    googleUid: string,
    facebookUid: string
  }).isRequired,
  currentUserDisconnectSocialDispatch: func.isRequired
};

class UsersEditContacts extends Component {
  state = {
    inProcess: false
  };

  disconnectProvider = (provider) => {
    const { currentUserDisconnectSocialDispatch } = this.props;

    const callback = () => {
      toastr.success('',
        {
          component: (
            <FormattedMessage
              id='user.success_messages.social_disconected'
              values={ { social: PROVIDER_TO_SOCIAL[provider] } }
            />
          )
        }
      );
      this.setState({ inProcess: false });
    };

    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    currentUserDisconnectSocialDispatch({ provider, callback, errorCallback });
  };

  render() {
    const {
      disconnectProvider,
      state: { inProcess },
      props: { currentUser: { googleUid, facebookUid } }
    } = this;

    return (
      <Container>
        { inProcess && <Loader /> }
        <Row>
          <NameForm />
          <EmailForm />

          <Col sm={ 4 } >
            <FormattedMessage id='user.fields.social' />
          </Col>
          <Col sm={ 8 } >
            <div>
              GOOGLE
              {
                googleUid ?
                  <button onClick={ () => disconnectProvider(GOOGLE_PROVIDER) } >
                    <FormattedMessage id='actions.disconnect' />
                  </button>
                  :
                  <a href={ paths.USERS_OAUTH_GOOGLE_CONNECT } >
                    <FormattedMessage id='actions.connect' />
                  </a>
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
};
UsersEditContacts.propTypes = propTypes;

export default UsersEditContacts;
