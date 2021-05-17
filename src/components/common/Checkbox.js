import React from 'react';

const renderCheckbox = ({
  htmlFor,
  input,
  label,
  type,
  disabled,
  error_messages,
  meta: { touched, error, warning },
}) => {
  return (
    <div className="input_field">
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <div className="input_holder_checkbox">
        <input id={htmlFor} {...input} disabled={disabled} type="checkbox" />
      </div>
    </div>
  );
};

export default renderCheckbox;
