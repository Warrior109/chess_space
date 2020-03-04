import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { object, array, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  userUpdateFormInitialValues: object.isRequired,
  skillLevelOptions: array,
  userUpdateDispatch: func.isRequired,
  fetchCurrentUserSkillLevelOptionsDispatch: func.isRequired
};

class UsersEditCommon extends Component {
  state = {
    inProcess: false,
    isLoading: !this.props.skillLevelOptions
  };

  componentDidMount() {
    const { fetchCurrentUserSkillLevelOptionsDispatch } = this.props;

    this._ismounted = true;
    const callback = () => this.setState({ isLoading: false });
    const errorCallback = () => {
      toastr.error('', { component: <FormattedMessage id='error_messages.something_went_wrong' /> });
    };

    // This is lightweight data, and change very rarely, so no need to reset it
    fetchCurrentUserSkillLevelOptionsDispatch({ callback, errorCallback });
  };

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleSubmit = ({
    trainer, skillLevel, birthday, location: { lat, lng, address }, goal, aboutMe
  }) => {
    const { userUpdateDispatch } = this.props;

    const callback = () => {
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> });
      this.setState({ inProcess: false });
    };
    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

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
      state: { inProcess, isLoading },
      props: { userUpdateFormInitialValues, skillLevelOptions }
    } = this;

    if (isLoading) return <Loader />;

    return (
      <Container>
        { inProcess && <Loader /> }
        <Form
          { ...{ skillLevelOptions } }
          initialValues={ userUpdateFormInitialValues }
          onSubmit={ handleSubmit }
        />
      </Container>
    );
  }
};
UsersEditCommon.propTypes = propTypes;

export default UsersEditCommon;
