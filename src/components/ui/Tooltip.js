import React, { Component } from 'react';
import {Button, Overlay, Tooltip} from 'react-bootstrap';
import './Tooltip.css'


class ToolTip extends React.Component {
    constructor(...args) {
      super(...args);
  
      this.attachRef = target => this.setState({ target });
      this.state = { show: false };
    }
  
    render() {
      const { show, target } = this.state;
      return (
        <>
          <Button
            className='tooltip-btn'
            ref={this.attachRef}
            onMouseOver={() => this.setState({ show: !show })}
            onMouseOut={() => this.setState({ show: false })}
          >
            ?
          </Button>
          <Overlay target={target} show={show} placement="top">
            {props => (
              <Tooltip id="overlay-example" {...props}>
                {this.props.message}
              </Tooltip>
            )}
          </Overlay>
        </>
      );
    }
  }
  
  export default ToolTip;