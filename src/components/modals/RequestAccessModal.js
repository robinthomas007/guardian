import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import './RequestAccessModal.css';
import {isFormValid, setInputValidStatu, isValidEmail} from '../Utils';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import LabelsDropDown from '../modals/pageComponents/LabelsDropDown';

class RequestAccessModal extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
        formInputs : {
          FirstName : '',
          LastName : '',
          LabelID : 1,
          Email : '',
          PhoneNumber : ''
        },
        ReleasingLabels : {}
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

  handleChange = (e) => {
    const { formInputs  } = this.state;
    let modifiedFormInputs = formInputs;
        modifiedFormInputs[e.target.id] = e.target.value;
    this.setState( {formInputs : modifiedFormInputs} );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(isFormValid()) {
      const fetchHeaders = new Headers(
          {
              "Content-Type": "application/json",
          }
      )

      fetch ('https://api-dev.umusic.net/guardian/access', {
          method : 'POST',
          headers : fetchHeaders,
          body : JSON.stringify(this.state.formInputs)
      }).then (response => 
          {
              return(response.json());
          }
      )
      .then (responseJSON => 
          {
              alert('request sent')
          }
      )
      .catch(
          error => console.error(error)
     );
    }
  }




  handlePageDataLoad = () => {
    const fetchHeaders = new Headers(
      {
        "Content-Type": "application/json",
      }
    )
    
    fetch ('https://api-dev.umusic.net/guardian/labels', {
        method : 'GET',
        headers : fetchHeaders,
    }).then (response => {
        return(response.json());
    }).then (responseJSON => {
        this.setState( {ReleasingLabels : responseJSON.ReleasingLabels} )
    }).catch (
        error => console.error(error)
    );
  }

  componentDidMount() {
    this.handlePageDataLoad();
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
                        <Form.Label>First Name</Form.Label> 
                        <Form.Control 
                          type="text" 
                          id="FirstName"
                          onChange={this.handleChange}
                          className="requiredInput"
                        ></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Last Name</Form.Label> 
                        <Form.Control 
                          type="text" 
                          id="LastName" 
                          onChange={this.handleChange}
                          className="requiredInput"
                        ></Form.Control>
                    </li>
                    <li>
                        <LabelsDropDown
                          id={"LabelID"}
                          data={this.state.ReleasingLabels}
                          onChange={this.handleChange}
                        />
                    </li>
                    <li>
                        <Form.Label>Email</Form.Label> 
                        <Form.Control 
                          type="email" 
                          id="Email" 
                          onChange={this.handleChange}
                          className="requiredInput"
                        ></Form.Control>
                    </li>
                    <li>
                        <Form.Label>Phone</Form.Label> 
                        <Form.Control 
                          type="text" 
                          id="PhoneNumber" 
                          onChange={this.handleChange}
                          className="requiredInput"
                        ></Form.Control>
                    </li>
                </ul>
              </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" id="cancelButton" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" id="submitButton" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default (RequestAccessModal);