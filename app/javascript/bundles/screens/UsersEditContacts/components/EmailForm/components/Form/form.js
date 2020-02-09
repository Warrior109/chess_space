import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';

import FieldWithErrors from 'components/FieldWithErrors';

const propTypes = {
  handleSubmit: func.isRequired,
  toggleMode: func.isRequired
};

const Form = ({ handleSubmit, toggleMode }) => {
  const cancelHandler = (e) => {
    e.preventDefault();
    toggleMode();
  };

  return (
    <form onSubmit={ handleSubmit } >
      <Row>
        <Col sm={ 4 } >
          <h5><FormattedMessage id='user.fields.email' /></h5>
        </Col>
        <Col sm={ 8 } >
          <Field
            component={ FieldWithErrors }
            type='email'
            name='email'
          />
        </Col>

        <Col sm={ 4 } >
          <h5><FormattedMessage id='user.fields.password' /></h5>
        </Col>
        <Col sm={ 8 } >
          <Field
            component={ FieldWithErrors }
            type='password'
            name='password'
          />
        </Col>

        <Col sm={ 6 } >
          <button type='submit' >
            <FormattedMessage id='actions.save_changes' />
          </button>
        </Col>
        <Col sm={ 6 } >
          <button onClick={ cancelHandler } >
            <FormattedMessage id='actions.cancel' />
          </button>
        </Col>
      </Row>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
