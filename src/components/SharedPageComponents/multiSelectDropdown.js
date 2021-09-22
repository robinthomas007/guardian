import React, { Component } from 'react';

class MultiSelectDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      show: false,
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.hide = this.hide.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show, search: '' });
  }

  hide(e) {
    if (e && e.relatedTarget) {
      e.relatedTarget.click();
    }
    this.setState({ show: false });
  }

  handleChange(e) {
    e.stopPropagation();

    const { value } = this.state;
    let modifiedValue = value;
    let inputValue = e.target.value;

    if (e.target.checked) {
      modifiedValue.push(inputValue);
    } else {
      let index = modifiedValue.indexOf(inputValue);
      if (index !== -1) {
        modifiedValue.splice(index, 1);
      }
    }
    this.setState({ value: modifiedValue }, () => this.props.onChange(modifiedValue));
  }

  getInputOptions = () => {
    let labelOptions = '';
    if (this.props.optionList) {
      labelOptions = this.props.optionList.map((option, i) => {
        console.log(option.name, this.state.search, 'this.state.search');
        console.log(option.name.includes(this.state.search));
        if (
          this.state.search === '' ||
          (this.state.search !== '' &&
            option.name &&
            option.name.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
        ) {
          return (
            <a className="dropdown-item" key={i} onClick={null}>
              <label className="custom-checkbox">
                <input
                  onChange={e => this.handleChange(e)}
                  type="checkbox"
                  id={this.props.id + '_check_' + i}
                  value={option.id}
                  checked={this.props.value.includes(option.id)}
                />
                <span className="checkmark "></span>
              </label>

              <label htmlFor={this.props.id + '_check_' + i}>{option.name}</label>
            </a>
          );
        }
      });
      return labelOptions;
    } else {
      return null;
    }
  };

  componentDidMount() {
    this.setState({ value: this.props.value, search: '' });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clear !== nextProps.clear) {
      if (!nextProps.clear) {
        this.setState({ value: [] });
      } else {
        this.setState({ value: nextProps.value });
      }
    }
  }

  handleSearchChange(e) {
    const searchValue = e.target.value;
    this.setState({ search: searchValue });
  }

  render() {
    return (
      <div className="multi-select dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.toggleShow}
          onBlur={this.hide}
          disabled={this.props.disabled}
        >
          {this.props.placeHolder}
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <input
            className="multi-select-search-input"
            type="text"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          {this.getInputOptions()}
        </div>
      </div>
    );
  }
}

export default MultiSelectDropDown;
