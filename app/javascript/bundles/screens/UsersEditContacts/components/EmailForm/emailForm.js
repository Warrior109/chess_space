import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { shape, string, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  currentUser: shape({
    email: string.isRequired,
  }).isRequired,
  userSecureUpdateDispatch: func.isRequired
};

class EmailForm extends Component {
  state = {
    isEditMode: false,
    inProcess: false
  };

  toggleMode = () => this.setState((state) => ({ isEditMode: !state.isEditMode }));

  handleSubmit = ({ email, password }) => {
    const {
      toggleMode,
      props: { userSecureUpdateDispatch }
    } = this;

    const callback = () => {
      toggleMode();
      this.setState({ inProcess: false });
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> });
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    userSecureUpdateDispatch({ email, password, callback, errorCallback });
  };

  render() {
    const {
      toggleMode,
      handleSubmit,
      state: { isEditMode, inProcess },
      props: { currentUser: { email } }
    } = this;

    return (
      <Fragment>
        {
          isEditMode ?
            <Form
              initialValues={ { email } }
              onSubmit={ handleSubmit }
              { ...{ toggleMode } }
            />
            :
            <Fragment>
              <Col sm={ 4 } ><h5><FormattedMessage id='user.fields.email' /></h5></Col>
              <Col sm={ 8 } >
                <span>{ email }</span>
                <button onClick={ toggleMode } ><FormattedMessage id='actions.edit' /></button>
              </Col>
            </Fragment>
        }
        { inProcess && <Loader /> }
      </Fragment>
    );
  }
};
EmailForm.propTypes = propTypes;

export default EmailForm;
