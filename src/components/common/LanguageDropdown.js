import React, { Component } from 'react';
import i18n from '../../i18n';
import { Dropdown } from 'react-bootstrap';

export default class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValue:
        '<img class="lang-img" src="https://img.icons8.com/color/48/000000/usa-circular.png"/> English',
      options: [
        {
          label:
            '<img class="lang-img" src="https://img.icons8.com/color/48/000000/usa-circular.png"/> English',
          value: 'en',
          languageCode: 'en',
        },
        {
          label:
            '<img class="lang-img" src="https://img.icons8.com/color/48/000000/spain-circular.png"/> Spanish',
          value: 'sp',
          languageCode: 'es',
        },
      ],
    };
  }

  componentDidMount = () => {
    let LangIndex = JSON.parse(localStorage.getItem('langIndex'));
    if (LangIndex) {
      const item = this.getTextValue(LangIndex);
      this.setState({ toggleValue: item.label });
    }
  };

  getTextValue(value) {
    return this.state.options[value - 1];
  }

  changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  handleChange(value) {
    const item = this.getTextValue(value);
    this.setState({ toggleValue: item.label });
    this.changeLanguage(item.value);
    localStorage.setItem('languageCode', item.languageCode);
    localStorage.setItem('langIndex', value);
    this.props.getUserData && this.props.getUserData(item.languageCode);
    window.location.reload();
  }

  getLanguageOptions = () => {
    let options = this.state.options.map((option, i) => {
      return (
        <Dropdown.Item
          key={i}
          eventKey={i + 1}
          dangerouslySetInnerHTML={{ __html: option.label }}
        ></Dropdown.Item>
      );
    });
    return options;
  };

  render() {
    return (
      <Dropdown className="dropdown lang-dropdown" onSelect={e => this.handleChange(e)}>
        <Dropdown.Toggle
          id="dropdown-basic"
          dangerouslySetInnerHTML={{ __html: this.state.toggleValue }}
        ></Dropdown.Toggle>
        <Dropdown.Menu>{this.getLanguageOptions()}</Dropdown.Menu>
      </Dropdown>
    );
  }
}
