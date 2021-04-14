import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { fetchLabels } from 'redux/labels/actions';
import { Field } from 'redux-form';

const LabelSelect = props => {
  const getLabelOptions = () => {
    let { labels } = props;
    if (props.forCreate) labels = [{ id: '', name: '' }].concat(labels);
    return labels.map((option, i) => {
      return (
        <a className="dropdown-item" key={i}>
          <label className="custom-checkbox">
            <input
              onChange={e => onChange(e, option)}
              type="checkbox"
              id={'check_' + option.id}
              value={option.id}
            />
            <span className="checkmark "></span>
          </label>

          <label style={{ height: '100%', width: '100%' }} htmlFor={'check_' + option.id}>
            {option.name}
          </label>
        </a>
      );
    });
  };

  const onChange = (e, option) => {
    alert(JSON.stringify(props.onChange));
  };

  const { input } = props;

  return (
    <div className="multi-select dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></button>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {getLabelOptions()}
      </div>

      <input type="text" id={props.id} value="123" />
    </div>
  );
};

class LabelsMultiSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchLabels();
  }

  render() {
    return <LabelSelect {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { labels } = state.labels;
  return { labels };
}

const actionCreators = { fetchLabels };

export default connect(
  mapStateToProps,
  actionCreators,
)(LabelsMultiSelect);
