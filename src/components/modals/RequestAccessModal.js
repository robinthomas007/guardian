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

  handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'))
    const fetchHeaders = new Headers(
        {
            "Content-Type": "application/json",
        }
    )

    const fetchBody = JSON.stringify( {
    })

    fetch ('https://api-dev.umusic.net/guardian/project/territorialrights', {
        method : 'POST',
        headers : fetchHeaders,
        body : fetchBody
    }).then (response => 
        {
            return(response.json());
        }
    )
    .then (responseJSON => 
        {
            alert('saved')
            //this.setState( {project : responseJSON} )
        }
    )
    .catch(
        error => console.error(error)
  );
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
                        <Form.Label>First Name</Form.Label> <Form.Control type="text" id="firstName"></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Last Name</Form.Label> <Form.Control type="text" id="lastName"></Form.Control>
                    </li>
                    <li>
                        <Form.Label id="labelName">Label/Company</Form.Label> 
                   
                    </li>
                    <li>
                        <Form.Label>Email</Form.Label> <Form.Control type="email" id="email"></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Phone</Form.Label> <Form.Control type="text" id="phoneNumber"></Form.Control>
                    </li>
                </ul>
                </Form>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" id="cancelButton" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" id="submitButton" onClick={this.handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default (RequestAccessModal);