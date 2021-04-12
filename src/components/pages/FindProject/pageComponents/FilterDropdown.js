import React, { Component } from 'react';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      selectedText: this.props.defaultText,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    const currentState = this.state;
    const modifiedState = currentState;
    modifiedState.selectedID = data.id;
    modifiedState.selectedText = data.name;

    this.setState({ currentState: modifiedState });
    this.props.onChange(data);
  }

  getDefaultOption(defaultText) {
    const data = {};
    data.name = defaultText;
    data.id = '';

    if (defaultText && defaultText !== '') {
      return (
        <a className="dropdown-item selected" onClick={() => this.handleChange(data)}>
          {defaultText}
        </a>
      );
    } else {
      return null;
    }
  }

  render() {
    let inputOptions = [];

    if (this.props.data) {
      inputOptions = this.props.data.map((data, i) => (
        <a className="dropdown-item selected" onClick={() => this.handleChange(data)}>
          {data.name}
        </a>
      ));
    }

    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.props.defaultText}
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {this.getDefaultOption(this.props.defaultText)}
          {inputOptions}
        </div>
      </div>
    );
  }
}

export default FilterDropdown;
