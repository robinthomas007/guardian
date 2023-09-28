import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { showNotySucess } from 'components/Utils';

class ReleasingLabelsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      value: this.props.value,
      onChange: this.props.onChange,
    };

    this.getReleasingLabelOptions = this.getReleasingLabelOptions.bind(this);
  }

  getReleasingLabelOptions() {
    let labelOptions = '';
    if (this.props.user && this.props.user.ReleasingLabels) {
      labelOptions = this.props.user.ReleasingLabels.map((label, i) => (
        <option key={i} value={label.id}>
          {label.name}
        </option>
      ));
    }
    return labelOptions;
  }

  showNotification() {
    showNotySucess(
      'Your track information has been successfully saved and submitted for intial protection.',
    );
  }

  render() {
    return (
      <Form.Control
        id="projectReleasingLabelID"
        as="select"
        className={'col-form-label dropdown col-4 ' + this.props.className}
        value={this.props.value}
        onChange={this.state.onChange}
      >
        {this.getReleasingLabelOptions()}
      </Form.Control>
    );
  }
}

export default ReleasingLabelsInput;
