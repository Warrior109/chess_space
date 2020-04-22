import React from 'react';
import {Row, Col, Input, Form as BForm, Button} from 'reactstrap';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';

const propTypes = {
  handleSubmit: func.isRequired,
  submitForm: func.isRequired
};

const Form = ({handleSubmit, submitForm}) => {
  const onKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <BForm onSubmit={ handleSubmit } >
      <Row className='form-group'>
        <Col sm={ 10 } >
          <Field
            component='textarea'
            name='text'
            className='form-control'
            onKeyDown={ onKeyDown }
          />
        </Col>
        <Col sm={ 2 } >
          <Button type='submit'>
            <FormattedMessage id='actions.send' />
          </Button>
        </Col>
      </Row>
    </BForm>
  );
};
Form.propTypes = propTypes;

export default Form;
