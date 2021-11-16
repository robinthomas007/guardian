import React, { Component } from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ToolTip from 'component_library/Tooltip';

class inputDateField extends Component {
  onChange(date) {
    if (date) {
      let showTimeSelect = this.props.showTimeSelect;
      if (showTimeSelect !== true) {
        this.props.input.onChange(
          moment(date).format(
            this.props.dateFormat ? this.props.dateFormat.toUpperCase() : 'YYYY-MM-DD',
          ),
        );
      } else {
        this.props.input.onChange(
          moment(date).format(
            this.props.dateFormat ? this.props.dateFormat.toUpperCase() : 'YYYY-MM-DD h:mm',
          ),
        );
      }
    } else {
      this.props.input.onChange(null);
    }
    if (this.props.handleOnSelect) {
      this.props.handleOnSelect(date, this.props.input.name);
    }
  }

  render() {
    const {
      input,
      dateFormat,
      label,
      disabled,
      htmlFor,
      readOnly,
      placeholder,
      min,
      max,
      meta: { touched, error },
      tooltip,
      required,
      showTimeSelect,
      timeIntervals,
      minTime,
      maxTime,
    } = this.props;
    let className = classNames('form-control', {
      error: touched && error,
    });
    let selected = input.value && input.value !== 'Invalid date' ? new Date(input.value) : null;
    let options = {};
    if (minTime && maxTime) {
      options['minTime'] = minTime;
      options['maxTime'] = maxTime;
    }

    return (
      <div className="input_field">
        <div className="labels">
          {label && (
            <label htmlFor={htmlFor}>
              {label}
              {required && <em>*</em>}
            </label>
          )}
          {tooltip && <ToolTip tabIndex="-1" message={tooltip} />}
        </div>
        <div className="input_holder">
          <DatePicker
            className={className}
            dateFormat={showTimeSelect ? 'yyyy-MM-dd h:mm' : dateFormat ? dateFormat : 'yyyy-MM-dd'}
            onChange={this.onChange.bind(this)}
            minDate={new Date(min)}
            maxDate={max}
            customInput={
              <CustomInput placeholder={placeholder} isreadOnly={readOnly} {...this.props} />
            }
            disabled={disabled}
            placeholderText={placeholder}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            onBlur={input.onBlur}
            showYearDropdown
            isClearable={input.value && !disabled}
            selected={selected}
            {...options}
          />
          {touched && error && <p className="error_message">{error}</p>}
        </div>
      </div>
    );
  }
}

export default inputDateField;

const CustomInput = props => {
  return (
    <div className="custom-date-picker">
      <input onClick={props.onClick} value={props.value} type="text" readOnly={props.isreadOnly} />
      {!props.value && (
        <i onClick={props.onClick} aria-hidden="true" class="material-icons calendar">
          date_range
        </i>
      )}
    </div>
  );
};
