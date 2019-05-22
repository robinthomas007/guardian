import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import './ReplaceAudioModal.css';

class ReplaceAudioModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.setState({ show: false });
    this.props.handleClose();
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    
    return (
      <Modal id='ReplaceAudioModal' show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Replace Audio File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Use the area below to replace the corresponding audio file.
            </li>
            <li>
              <div class="audio-drop-area d-flex justify-content-center">
              <span class="align-self-center">Drag and Drop Audio Files or Click Here To Browse</span>
              </div>
            </li>
          </ul>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default (ReplaceAudioModal);