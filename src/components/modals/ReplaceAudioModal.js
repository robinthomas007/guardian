import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import './ReplaceAudioModal.css';

class ReplaceAudioModal extends Component {
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


  render() {
    return (
      <>
        <Modal id='ReplaceAudioModal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Replace Audio File</Modal.Title>
          </Modal.Header>
          <Modal.Body>Drag and drop or click to browse in the area below to replace the cirresponding audio file.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default (ReplaceAudioModal);