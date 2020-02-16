import React from 'react';
import { Container, Row, Col, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { shape, string } from 'prop-types';

import { paths } from 'layouts/constants';

const propTypes = {
  currentUser: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    birthday: string,
    city: string,
    skillLevel: string,
    email: string.isRequired,
    goal: string,
    aboutMe: string,
    originalAvatar: shape({
      url: string.isRequired
    }).isRequired
  }).isRequired
};

const UsersMyProfile = ({
  currentUser: {
    firstName, lastName, birthday, city, skillLevel, email, goal, aboutMe,
    originalAvatar
  }
}) => {
  return (
    <Container>
      <Row>
        <Col sm={ 4 } >
          <div><img src={ originalAvatar.url } width={ 300 } /></div>
          <Link to={ paths.USERS_EDIT_COMMON } >
            <FormattedMessage id='pages.profile_edit.title' />
          </Link>
        </Col>

        <Col sm={ 8 } >
          <h2>{ firstName } { lastName }</h2>

          <Toast style={ { maxWidth: 800 } } >
            <ToastHeader>
              <FormattedMessage id='pages.profile_edit.common' />
            </ToastHeader>
            <ToastBody>
              <Row>
                <Col sm={ 4 } >
                  <FormattedMessage id='user.fields.birthday' />
                </Col>
                <Col sm={ 8 } >
                  {/* FIXME: move moment and formatting to the selectors */}
                  { birthday && moment(birthday).format('LLLL') }
                </Col>

                <Col sm={ 4 } >
                  <FormattedMessage id='user.fields.city_of_residence' />
                </Col>
                <Col sm={ 8 } >{ city }</Col>

                <Col sm={ 4 } >
                  <FormattedMessage id='user.fields.skill_level' />
                </Col>
                <Col sm={ 8 } >{ skillLevel }</Col>
              </Row>
            </ToastBody>
          </Toast>

          <Toast style={ { maxWidth: 800 } } >
            <ToastHeader>
              <FormattedMessage id='pages.profile_edit.contacts' />
            </ToastHeader>
            <ToastBody>
              <Row>
                <Col sm={ 4 } >
                  <FormattedMessage id='user.fields.email' />
                </Col>
                <Col sm={ 8 } >{ email }</Col>
              </Row>
            </ToastBody>
          </Toast>

          <Toast style={ { maxWidth: 800 } } >
            <ToastHeader>
              <FormattedMessage id='user.fields.goal' />
            </ToastHeader>
            <ToastBody>
              { goal }
            </ToastBody>
          </Toast>

          <Toast style={ { maxWidth: 800 } } >
            <ToastHeader>
              <FormattedMessage id='user.fields.about_me' />
            </ToastHeader>
            <ToastBody>
              { aboutMe }
            </ToastBody>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};
UsersMyProfile.propTypes = propTypes;

export default UsersMyProfile;
