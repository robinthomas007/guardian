import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';

class IncompleteProjectModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <>
        <Modal id="IncompleteProjectModal" show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <div className="alert alert-danger" role="alert">
              This project has Steps that are incomplete and connot be submitted. Please review the
              progress bar to see which step is incomplete.
            </div>

            <div className="submit-buttons float-right">
              <Button variant="secondary" onClick={this.props.handleClose}>
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(IncompleteProjectModal);
