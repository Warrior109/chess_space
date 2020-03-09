import React from 'react';
import { FormattedMessage } from 'react-intl';

export const validations = {
  text: text => {
    if (!text) {
      return <FormattedMessage id='validations.required' />;
    }
  }
};
