import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router";
import './HaveAudioModal.css';

class HaveAudioModal extends Component {
  constructor(props, context) {
    super(props, context);

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

  handleNoAudioClick = (event) => {
      event.preventDefault();

      this.props.history.push('/trackInformation')

  }

  componentDidMount() {
    this.handleShow()
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you have audio files to upload?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Yes
            </Button>
            <Button variant="primary" onClick={this.handleNoAudioClick}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(HaveAudioModal);