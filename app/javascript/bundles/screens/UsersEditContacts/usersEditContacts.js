import React from 'react';
import { Container, Row } from 'reactstrap';
import {} from 'prop-types';

import { NameForm, EmailForm } from './components';

const propTypes = {};

const UsersEditContacts = (props) => {
  return (
    <Container>
      <Row>
        <NameForm />
        <EmailForm />
      </Row>
    </Container>
  );
};
UsersEditContacts.propTypes = propTypes;

export default UsersEditContacts;
