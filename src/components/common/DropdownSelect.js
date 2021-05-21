import React, { Component } from 'react';
import Select from 'react-select';
import ToolTip from '../ui/Tooltip';

class SelectInput extends Component {
  onChange(data) {
    this.props.input.onChange(data);
  }

  render() {
    const {
      id,
      input,
      options,
      label,
      placeholder,
      strong,
      meta: { touched, error },
      showLoading,
      readOnly,
      clearable,
      required,
      tooltip,
      classes,
    } = this.props;

    let labelStrong;

    if (strong && label) {
      labelStrong = <strong>{label}</strong>;
    } else {
      labelStrong = label;
    }

    return (
      <div className="input_field">
        <div className="labels">
          {label && (
            <label>
              {labelStrong} {required && <em>*</em>}
            </label>
          )}
          {tooltip && <ToolTip tabIndex="-1" message={tooltip} />}
        </div>
        <div className={`${classes} input_holder`}>
          <Select
            {...this.props}
            value={input.value || ''}
            onBlur={() => {
              input.onBlur();
            }}
            onFocus={() => {
              input.onFocus();
            }}
            openOnFocus={true}
            onChange={this.onChange.bind(this)}
            isClearable={clearable}
            options={options}
            tabSelectsValue={false}
            placeholder={placeholder}
            isSearchable={!readOnly}
            isDisabled={readOnly}
            isLoading={showLoading}
            id={id}
          />
          {touched && error && <p className="error_message">{error}</p>}
        </div>
      </div>
    );
  }
}

export default SelectInput;
