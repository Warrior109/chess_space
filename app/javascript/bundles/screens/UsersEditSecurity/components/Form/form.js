import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';

import FieldWithErrors from 'components/FieldWithErrors';

const propTypes = {
  handleSubmit: func.isRequired
};

class Form extends Component {
  state = {
    isPasswordVisible: false
  };

  togglePasswordVisibilityHandler = (e) => {
    e.preventDefault();
    this.setState((state) => ({ isPasswordVisible: !state.isPasswordVisible }));
  };

  render() {
    const {
      togglePasswordVisibilityHandler,
      state: { isPasswordVisible },
      props: { handleSubmit }
    } = this;

    return (
      <form onSubmit={ handleSubmit } >
        <Row>
          <Col sm={ 4 }>
            <FormattedMessage id='user.fields.old_password' />
          </Col>
          <Col sm={ 8 } >
            <Field
              component={ FieldWithErrors }
              type={ isPasswordVisible ? 'text' : 'password' }
              name='password'
            />
            <button onClick={ togglePasswordVisibilityHandler }>
              {/* FIXME: remvove from yml file, if will be replaced with icon */}
              {
                isPasswordVisible ?
                  <FormattedMessage id='actions.hide_password' />
                  :
                  <FormattedMessage id='actions.show_password' />
              }
            </button>
          </Col>

          <Col sm={ 4 }>
            <FormattedMessage id='user.fields.new_password' />
          </Col>
          <Col sm={ 8 } >
            <Field
              component={ FieldWithErrors }
              type={ isPasswordVisible ? 'text' : 'password' }
              name='newPassword'
            />
          </Col>

          <Col sm={ 4 }>
            <FormattedMessage id='user.fields.new_password_confirmation' />
          </Col>
          <Col sm={ 8 } >
            <Field
              component={ FieldWithErrors }
              type={ isPasswordVisible ? 'text' : 'password' }
              name='newPasswordConfirmation'
            />
          </Col>
          <Col sm={ 12 } >
            <button type='submit' >
              <FormattedMessage id='actions.save_changes' />
            </button>
          </Col>
        </Row>
      </form>
    );
  }
};
Form.propTypes = propTypes;

export default Form;
