import React, { Component } from 'react';

class TracksRightsRule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRights: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { hasRights } = this.state;
    let modifiedHasRights = e.currentTarget.value === 'true' ? true : false;
    this.setState({ hasRights: modifiedHasRights });
    this.props.onChange(modifiedHasRights);
  }

  componentDidMount() {
    this.setState({ hasRights: this.props.data });
  }

  render() {
    return (
      <div>
        <input
          id={'hasRightsTrue_' + this.props.setIndex}
          name={'hasRights_' + this.props.setIndex}
          type="radio"
          value="true"
          checked={this.props.data}
          onChange={this.handleChange}
        />{' '}
        <label htmlFor={'hasRightsTrue_' + this.props.setIndex}>Only Has Rights In</label>
        <br />
        <input
          id={'hasRightsFalse_' + this.props.setIndex}
          name={'hasRights_' + this.props.setIndex}
          type="radio"
          value="false"
          checked={!this.props.data}
          onChange={this.handleChange}
        />{' '}
        <label htmlFor={'hasRightsFalse_' + this.props.setIndex}>
          Has Rights Everywhere Except
        </label>
      </div>
    );
  }
}

export default TracksRightsRule;
