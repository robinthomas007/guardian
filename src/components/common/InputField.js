import React, { Component } from 'react';
import './inputField.css';
import ToolTip from '../ui/Tooltip';

class InputField extends Component {
  onChange(event) {
    this.props.input.onChange(event);
  }

  render() {
    const {
      input,
      id,
      placeholder,
      type,
      label,
      iconName,
      autoFocus,
      amountField,
      readOnly,
      childName,
      handleClick,
      meta: { touched, error },
      required,
      max,
      min,
      strong,
      addClass,
      maxLength,
      disabled,
      classes,
      tooltip,
    } = this.props;

    return (
      <div className="input_field">
        <div className="labels">
          {label && (
            <label>
              {label}
              {required && <em>*</em>}
            </label>
          )}
          {tooltip && <ToolTip tabIndex="-1" message={tooltip} />}
        </div>
        <div className={`${classes} input_holder`}>
          <input
            id={id}
            {...input}
            disabled={disabled}
            type={type || 'text'}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={this.onChange.bind(this)}
            autoFocus={autoFocus}
            maxLength={maxLength}
          />
        </div>
      </div>
    );
  }
}

export default InputField;
