import React from 'react';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { object, string } from 'prop-types';

const propTypes = {
  input: object.isRequired,
  className: string
};

const DateField = ({ input, className }) => {
  return (
    <DatePicker
      value={ input.value || null }
      onChange={ input.onChange }
    />
  );
};
DateField.propTypes = propTypes;

export default DateField;
