import React, { Component } from 'react';
import ToolTip from '../ui/Tooltip';

export default class RenderTextarea extends Component {
  render() {
    let {
      id,
      input,
      label,
      row,
      col,
      readOnly,
      tooltip,
      meta: { touched, error },
    } = this.props;
    return (
      <div className="input_field">
        {label && (
          <div className="labels">
            {label && <label>{label}</label>}
            {tooltip && <ToolTip tabIndex="-1" message={tooltip} />}
          </div>
        )}
        <div className={`input_holder ${label ? '' : 'no-label'}`}>
          <textarea {...input} id={id} rows={row} cols={col} readOnly={readOnly} />
          {touched && error && <p className="error_message">{error}</p>}
        </div>
      </div>
    );
  }
}
