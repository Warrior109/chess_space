import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { shape, string, bool, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  currentUser: shape({
    email: string.isRequired,
  }).isRequired,
  isEditMode: bool.isRequired,
  toggleMode: func.isRequired,
  userSecureUpdateDispatch: func.isRequired
};

class EmailForm extends Component {
  state = {
    inProcess: false
  };

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleSubmit = ({ email, password }) => {
    const { userSecureUpdateDispatch, toggleMode } = this.props;

    const callback = () => {
      toggleMode();
      this.setState({ inProcess: false });
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> });
    };
    const errorCallback = () => this._ismounted && this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    userSecureUpdateDispatch({ email, password, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { currentUser: { email }, toggleMode, isEditMode }
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
