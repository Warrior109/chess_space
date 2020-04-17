import React from 'react';
import {Input} from 'reactstrap';
import { object, string, node, shape, bool } from 'prop-types';

const propTypes = {
  input: object.isRequired,
  placeholder: string,
  type: string,
  className: string,
  disabled: bool,
  meta: shape({
    touched: bool,
    error: node
  }).isRequired,
};

const defaultProps = {
  disabled: false
};

const FieldWithErrors = ({
  input, placeholder, disabled, type, className, meta: { touched, error }
}) => {
  const inputProps = { ...input, placeholder, disabled, type, className };
  return (
    <div>
      <Input { ...inputProps } />
      { touched && (error && <span>{ error }</span>) }
    </div>
  );
};
FieldWithErrors.propTypes = propTypes;
FieldWithErrors.defaultProps = defaultProps;

export default FieldWithErrors;
