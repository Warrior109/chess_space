import React, { Component } from 'react';
import { func } from 'prop-types';

import Loader from 'components/Loader';
import { Form } from './components';

const propTypes = {
  createMessageDispatch: func.isRequired,
  resetCreateMessageFormDispatch: func.isRequired
};

const Footer = ({createMessageDispatch, resetCreateMessageFormDispatch}) => {
  const handleSubmit = ({text}) => {
    createMessageDispatch({text});
    resetCreateMessageFormDispatch();
  };

  return (
    <div>
      <Form onSubmit={ handleSubmit } />
    </div>
  );
};
Footer.propTypes = propTypes;

export default Footer;
