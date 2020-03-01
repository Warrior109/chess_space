import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { shape, array, string, func } from 'prop-types';

import FieldWithErrors from 'components/FieldWithErrors';
import SelectField from 'components/SelectField';
import DateField from 'components/DateField';
import LocationField from 'components/LocationField';
import { AvatarBlock } from './components';

const propTypes = {
  currentUser: shape({
    firstName: string.isRequired,
    lastName: string.isRequired
  }).isRequired,
  skillLevelOptions: array.isRequired,
  handleSubmit: func.isRequired
};

const Form = ({ handleSubmit, currentUser: { firstName, lastName }, skillLevelOptions }) => {
  return (
    <form onSubmit={ handleSubmit } >
      <Row>
        <Col sm={ 9 } >
          <div>
            <h3>{ firstName } { lastName }</h3>
          </div>
          <Row>
            <Col sm={ 4 } >
              <label><FormattedMessage id='user.fields.trainer' /></label>
            </Col>
            <Col sm={ 8 } >
              <Field component='input' type='checkbox' name='trainer' />
            </Col>
          </Row>

          <Row>
            <Col sm={ 4 } >
              <FormattedMessage id='user.fields.skill_level' />
            </Col>
            <Col sm={ 8 } >
              <Field
                name='skillLevel'
                options={ skillLevelOptions }
                component={ SelectField }
              />
            </Col>

            <Col sm={ 4 } >
              <FormattedMessage id='user.fields.birthday' />
            </Col>
            <Col sm={ 8 } >
              <Field component={ DateField } name='birthday' />
            </Col>

            <Col sm={ 4 } >
              <FormattedMessage id='user.fields.city_of_residence' />
            </Col>
            <Col sm={ 8 } >
              <Field
                component={ LocationField }
                type='text'
                name='location'
                autoComplete='off'
              />
            </Col>
          </Row>
        </Col>
        <Col sm={ 3 } ><AvatarBlock /></Col>

        <Col sm={ 12 } >
          <h5><FormattedMessage id='user.fields.goal' /></h5>
          <Field
            component={ FieldWithErrors }
            componentType='textarea'
            name='goal'
          />
        </Col>

        <Col sm={ 12 } >
          <h5><FormattedMessage id='user.fields.about_me' /></h5>
          <Field
            component={ FieldWithErrors }
            componentType='textarea'
            name='aboutMe'
          />
        </Col>
        <button type='submit' >
          <FormattedMessage id='actions.save_changes' />
        </button>
      </Row>
    </form>
  );
};
Form.propTypes = propTypes;

export default Form;
