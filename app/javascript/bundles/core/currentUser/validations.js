import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH, EMAIL_REGEXP } from './constants';

export const validations = {
  email: email => {
    if (!email) {
      return <FormattedMessage id='validations.required' />;
    } else if (!EMAIL_REGEXP.test(email)) {
      return <FormattedMessage id='validations.email.invalid' />;
    }
  },
  firstName: firstName => {
    if (!firstName) {
      return <FormattedMessage id='validations.required' />;
    }
  },
  lastName: lastName => {
    if (!lastName) {
      return <FormattedMessage id='validations.required' />;
    }
  },
  password: password => {
    if (!password) {
      return <FormattedMessage id='validations.required' />;
    } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
      return (
        <FormattedMessage
          id='validations.password.too_short'
          values={ {min_chars: MINIMUM_PASSWORD_LENGTH} }
        />
      );
    } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
      return (
        <FormattedMessage
          id='validations.password.too_long'
          values={ {max_chars: MAXIMUM_PASSWORD_LENGTH} }
        />
      );
    }
  },
  passwordConfirmation: (passwordConfirmation, password) => {
    if (passwordConfirmation !== password) {
      return <FormattedMessage id='validations.password_confirmation.not_match' />;
    }
  }
};
