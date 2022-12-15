import React, { Component } from 'react';

class AdminStatusDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: this.props.selectedID,
      selectedText: this.props.selectedText,
      disabledLabels: ['Ingrooves', 'En Grooves', 'Dans les rainures', 'Imperial', 'Impérial'],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    if (this.props.selectedID !== data.id) {
      this.props.onChange(data, this.props.project);
    }
  }

  getOptions = () => {
    const { project } = this.props;
    const { disabledLabels } = this.state;
    if (this.props.options) {
      const inputOptions = this.props.options.map((option, i) => {
        let disabled = false;
        // 5 -> Published
        if (option.id === '5') {
          disabled =
            project.statusID !== '2' || disabledLabels.includes(project.projectReleasingLabel);
        }
        return (
          <a
            href
            key={i}
            className={`${
              parseInt(this.props.selectedID) === option.id
                ? 'dropdown-item selected'
                : 'dropdown-item'
            } ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && this.handleChange(option)}
          >
            {option.name}
          </a>
        );
      });
      return inputOptions;
    }
  };

  render() {
    const { project, selectedText } = this.props;
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id={`${project.projectID}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedText}
        </button>

        <div className="dropdown-menu dropdown-menu" aria-labelledby={`${project.projectID}`}>
          {this.getOptions()}
        </div>
      </div>
    );
  }
}

export default AdminStatusDropdown;
