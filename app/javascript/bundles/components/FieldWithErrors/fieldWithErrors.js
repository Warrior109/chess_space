import React from 'react';
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
  componentType: string
};

const defaultProps = {
  componentType: 'input',
  disabled: false
};

const FieldWithErrors = ({
  input, placeholder, disabled, type, className, meta: { touched, error }, componentType
}) => {
  const inputProps = { ...input, placeholder, disabled, type, className };
  return (
    <div>
      {
        componentType === 'textarea' ?
          <textarea { ...inputProps } />
          :
          <input { ...inputProps } />
      }
      { touched && (error && <span>{ error }</span>) }
    </div>
  );
};
FieldWithErrors.propTypes = propTypes;
FieldWithErrors.defaultProps = defaultProps;

export default FieldWithErrors;
