import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { object, array, string, shape, func, any, bool } from 'prop-types';

const propTypes = {
  input: shape({
    onChange: func.isRequired
  }).isRequired,
  className: string,
  classNamePrefix: string,
  meta: object.isRequired,
  options: array.isRequired,
  placeholder: string,
  optionsType: string,
  disabled: bool,
  isClearable: bool,
  fieldValue: any
};
const defaultProps = {
  disabled: false,
  isClearable: false,
  optionsType: 'default'
};

const SelectField = ({
  input: { onChange, value },
  meta: { touched, error },
  options, disabled, isClearable, className, classNamePrefix, placeholder, optionsType
}) => {
  const onChangeHandler = fieldValue => {
    onChange(fieldValue && fieldValue.value);
  };
  let selectedValue;

  if (optionsType === 'nested') {
    options.find(rootOption => selectedValue = rootOption.options.find(option => option.value === value));
  } else {
    selectedValue = options.find(option => option.value === value);
  }

  return (
    <Fragment>
      <Select
        value={ selectedValue }
        { ...{ className, classNamePrefix, options, placeholder, isClearable } }
        isDisabled={ disabled }
        onChange={ onChangeHandler }
      />
      { touched && (error && <span>{ error }</span>) }
    </Fragment>
  );
};
SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
