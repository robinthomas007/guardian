import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import './RequestAccessModal.css';

class RequestAccessModal extends Component {
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
      <Modal id='RequestAccesModal' show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <ul>
                    <li>Fill in the fields below for review by our administrative team.</li>
                    <li>
                        <Form.Label>First Name</Form.Label> <Form.Control type="text"></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Last Name</Form.Label> <Form.Control type="text"></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Label/Company</Form.Label> 
                   
                    </li>
                    <li>
                        <Form.Label>Email</Form.Label> <Form.Control type="email"></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Phone</Form.Label> <Form.Control type="text"></Form.Control>
                    </li>
                </ul>
                </Form>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default (RequestAccessModal);