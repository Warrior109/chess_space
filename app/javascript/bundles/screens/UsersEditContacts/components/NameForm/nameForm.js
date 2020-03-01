import React, { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { shape, string, bool, func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  currentUser: shape({
    firstName: string.isRequired,
    lastName: string.isRequired
  }).isRequired,
  isEditMode: bool.isRequired,
  toggleMode: func.isRequired,
  userSecureUpdateDispatch: func.isRequired
};

class NameForm extends Component {
  state = {
    inProcess: false
  };

  handleSubmit = ({ firstName, lastName, password }) => {
    const { userSecureUpdateDispatch, toggleMode } = this.props;

    const callback = () => {
      toggleMode();
      this.setState({ inProcess: false });
      toastr.success('', { component: <FormattedMessage id='user.success_messages.update' /> });
    };
    const errorCallback = () => this.setState({ inProcess: false });

    this.setState({ inProcess: true });
    userSecureUpdateDispatch({ firstName, lastName, password, callback, errorCallback });
  };

  render() {
    const {
      handleSubmit,
      state: { inProcess },
      props: { currentUser: { firstName, lastName }, toggleMode, isEditMode }
    } = this;

    return (
      <Fragment>
        {
          isEditMode ?
            <Form
              initialValues={ { firstName, lastName } }
              onSubmit={ handleSubmit }
              { ...{ toggleMode } }
            />
            :
            <Fragment>
              <Col sm={ 4 } ><h5><FormattedMessage id='user.fields.name' /></h5></Col>
              <Col sm={ 8 } >
                <span>{ firstName } { lastName }</span>
                <button onClick={ toggleMode } ><FormattedMessage id='actions.edit' /></button>
              </Col>
            </Fragment>
        }
        { inProcess && <Loader /> }
      </Fragment>
    );
  }
};
NameForm.propTypes = propTypes;

export default NameForm;
