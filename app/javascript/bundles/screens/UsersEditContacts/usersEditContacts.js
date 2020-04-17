import React, { Component } from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { shape, string, func } from 'prop-types';

import Loader from 'components/Loader';
import { paths, GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from 'layouts/constants';
import { PROVIDER_TO_SOCIAL, EDIT_MODS } from './constants';
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
    inProcess: false,
    editMode: null
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  toggleEditMode = (mode) => {
    this.setState((state) => ({ editMode: state.editMode === mode ? null : mode }));
  }

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

    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    currentUserDisconnectSocialDispatch({ provider, callback, errorCallback });
  };

  render() {
    const {
      toggleEditMode,
      disconnectProvider,
      state: { inProcess, editMode },
      props: { currentUser: { googleUid, facebookUid } }
    } = this;

    return (
      <Container>
        { inProcess && <Loader /> }
        <Row>
          <NameForm
            toggleMode={ () => toggleEditMode(EDIT_MODS.NAME) }
            isEditMode={ editMode === EDIT_MODS.NAME }
          />
          <EmailForm
            toggleMode={ () => toggleEditMode(EDIT_MODS.EMAIL) }
            isEditMode={ editMode === EDIT_MODS.EMAIL }
          />

          <Col sm={ 4 } >
            <FormattedMessage id='user.fields.social' />
          </Col>
          <Col sm={ 8 } >
            <div>
              GOOGLE
              {
                googleUid ?
                  <Button onClick={ () => disconnectProvider(GOOGLE_PROVIDER) } >
                    <FormattedMessage id='actions.disconnect' />
                  </Button>
                  :
                  <a href={ paths.USERS_OAUTH_GOOGLE_CONNECT } >
                    <FormattedMessage id='actions.connect' />
                  </a>
              }
            </div>
            <div>
              Facebook
              {
                facebookUid ?
                  <Button onClick={ () => disconnectProvider(FACEBOOK_PROVIDER) } >
                    <FormattedMessage id='actions.disconnect' />
                  </Button>
                  :
                  <a href={ paths.USERS_OAUTH_FACEBOOK_CONNECT } >
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
