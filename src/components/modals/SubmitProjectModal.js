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
          <Modal.Header  closeButton >
              <Modal.Title>
                  Submit Project
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="alert alert-danger" role="alert">
                Once submitted this project will be locked and no longer editable. Please make sure your project is complete before submitting it. Any changes required after submission may only be made by requesting assistance from the guardian team.
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