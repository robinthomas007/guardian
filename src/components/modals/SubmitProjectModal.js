import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router";

class SubmitProjectModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
        show: false,
        };
  }

  render() {
    return (
      <>
        <Modal id='SubmitProjectModal' show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
          <div className="alert alert-danger" role="alert">
          Are you sure?  Once submitted, this project will be locked and no longer editable <i>except by a Guardian support administrator.</i>
            </div>
          <div className="submit-buttons float-right">
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.handleSubmitProjectClick}>
              Submit Project
            </Button>
          </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(SubmitProjectModal);