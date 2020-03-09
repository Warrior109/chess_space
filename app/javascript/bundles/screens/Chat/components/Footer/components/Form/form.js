import React from 'react';
import { Row, Col } from 'reactstrap';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';

const propTypes = {
  handleSubmit: func.isRequired
};

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={ handleSubmit } >
      <Row>
        <Col sm={ 10 } >
          <Field component='textarea' name='text' />
        </Col>
        <Col sm={ 2 } >
          <button type='submit'>
            <FormattedMessage id='actions.send' />
          </button>
        </Col>
      </Row>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
