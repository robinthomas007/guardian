import React, { Component } from 'react';
import './inputField.css';
import ToolTip from 'component_library/Tooltip';

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
      autoFocus,
      readOnly,
      meta: { touched, error },
      required,
      strong,
      maxLength,
      disabled,
      classes,
      tooltip,
    } = this.props;

    let labelStrong;

    if (strong && label) {
      labelStrong = <strong>{label}</strong>;
    } else {
      labelStrong = label;
    }

    return (
      <div className="input_field">
        {label && (
          <div className="labels">
            <label>
              {labelStrong}
              {required && <em>*</em>}
            </label>

            {tooltip && <ToolTip tabIndex="-1" message={tooltip} />}
          </div>
        )}
        <div className={`${classes ? classes : ''} input_holder`}>
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
          {touched && error && <p className="error_message">{error}</p>}
        </div>
      </div>
    );
  }
}

export default InputField;
