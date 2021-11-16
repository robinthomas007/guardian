import React, { Component } from 'react';
import ToolTip from 'component_library/Tooltip';

export default class RenderTextarea extends Component {
  onKeyUp(event) {
    if (this.props.onKeyUp) this.props.onKeyUp(event);
  }
  onKeyDown(event) {
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  }
  onPaste(event) {
    if (this.props.onPaste) this.props.onPaste(event);
  }

  render() {
    let {
      id,
      input,
      label,
      row,
      col,
      readOnly,
      tooltip,
      className,
      rows,
      cols,
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
          <textarea
            {...input}
            id={id}
            className={className}
            onKeyUp={this.onKeyUp.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            onPaste={this.onPaste.bind(this)}
            rows={row}
            cols={col}
            readOnly={readOnly}
          />
          {touched && error && <p className="error_message">{error}</p>}
        </div>
      </div>
    );
  }
}
