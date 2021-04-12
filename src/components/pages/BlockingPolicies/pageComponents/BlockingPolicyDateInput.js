import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { formatDateToYYYYMMDD } from '../../../Utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class BlockingPolicyDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      disabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date, id, setIndex, siteIndex) {
    this.setState({ value: date });
    this.props.handleDateChange(date, id, setIndex, siteIndex);
  }

  render() {
    const { setIndex, siteIndex } = this.props;

    return (
      // <input
      //     id="expirationDate"
      //     className={'form-control blockingPolicyDateInput'}
      //     type='date'
      //     value={this.props.data}
      //     disabled={this.props.disabled}
      //     onChange={this.handleChange}
      //     siteName={this.props.siteName}
      //     siteIndex={this.props.siteIndex}
      //     setIndex={this.props.setIndex}
      //     inputTarget={this.props.inputTarget}
      // />
      <DatePicker
        className={'form-control blockingPolicyDateInput'}
        selected={
          this.props.data != null && this.props.data != '' ? new Date(this.props.data) : null
        } // yyyy-mm-dd
        disabled={this.state.projectReleaseDateDisabled}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        disabled={this.props.disabled}
        onChange={date => this.handleChange(date, 'expirationDate', setIndex, siteIndex)}
      />
    );
  }
}

export default BlockingPolicyDateInput;
