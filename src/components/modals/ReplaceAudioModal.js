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

  handleChange = (e, ) => {
    this.props.onChange(e)
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
              <div className="audio-drop-area d-flex justify-content-center">
              <span className="align-self-center">Drag and Drop Audio Files or Click Here To Browse</span>
              <input 
                  type="file" 
                  id="audioFiles" 
                  multiple={false} 
                  onChange={this.handleChange} 
                  accept=".wav, .mp3"
              />
              </div>
            </li>
          </ul>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="doneButton" onClick={this.handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default (ReplaceAudioModal);