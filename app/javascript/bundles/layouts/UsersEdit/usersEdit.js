import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { any } from 'prop-types';

const propTypes = {
  children: any.isRequired
};

const UsersEdit = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col sm={ 3 } >
          NAVBAR
        </Col>
        <Col sm={ 9 } >
          { children }
        </Col>
      </Row>
    </Container>
  );
};
UsersEdit.propTypes = propTypes;

export default UsersEdit;
