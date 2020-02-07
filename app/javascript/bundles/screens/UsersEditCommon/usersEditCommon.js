import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { object, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  userUpdateFormInitialValues: object.isRequired,
  userUpdateDispatch: func.isRequired
};

class UsersEditCommon extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({
    trainer, skillLevel, birthday, location: { lat, lng, address }, goal, aboutMe
  }) => {
    const { userUpdateDispatch } = this.props;

    const callback = () => {
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> })
      this.setState({ inProcess: false });
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    userUpdateDispatch({
      trainer,
      skillLevel,
      birthday: moment(birthday).format('DD/MM/YYYY'),
      lat,
      lng,
      address,
      goal,
      aboutMe,
      callback, errorCallback
    });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { userUpdateFormInitialValues }
    } = this;

    return (
      <Container>
        { inProcess && <Loader /> }
        <Form initialValues={ userUpdateFormInitialValues } onSubmit={ handleSubmit } />
      </Container>
    );
  }
};
UsersEditCommon.propTypes = propTypes;

export default UsersEditCommon;
