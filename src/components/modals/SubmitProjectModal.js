import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router";

class SubmitProjectModal extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      projectID : ''
    }
        
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  submitProjectClick = (event) => {

      event.preventDefault();

  }

  componentDidMount() {
    if(this.props.match && this.props.match.params && this.state.projectID !== this.props.match.params.projectID) {
      this.setState({projectID : this.props.match.params.projectID})
    }
    this.handleShow()
  }

  render() {
    return (
      <>
        <Modal id='SubmitProjectModal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body> 
          <span>
            <br />
          <Button variant="primary" id="yesButton" onClick={this.submitProjectClick}>
              Submit Project
            </Button>
            <Button variant="primary" id="noButton" onClick={this.handleClose}>
              Don't Submit Yet
            </Button>
          </span>
          <div className="alert alert-primary clearfix" role="alert">
                Once submitted this project will be locked and no longer editable. Please make sure your project is complete before submitting it. Any changes required after submission may only be made by requesting assistance from the guardian team.
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(SubmitProjectModal);