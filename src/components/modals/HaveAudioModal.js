import React, { Component } from 'react';
import {Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router";
import './HaveAudioModal.css';

class HaveAudioModal extends Component {
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

  handleNoAudioClick = (event) => {

      event.preventDefault();

      const fetchHeaders = new Headers(
        {
            "Authorization" : sessionStorage.getItem('accessToken'),
            "Project-Id" : this.state.projectID
        }
      )

      const paramData = {ProjectID: this.state.projectID, PagePath: "audioFiles"}
      

      fetch(window.env.api.url + '/project/pageskipped', {
        method: 'POST',
        headers : fetchHeaders,
        body: JSON.stringify(paramData)
      })
      .then (response =>
          {
              return(response.json());
          }
      )
      .then (responseJSON =>
          {
            if(this.state.projectID) {
              this.props.history.push({
                pathname : '/trackInformation/' + this.state.projectID
              })
            } else {
              this.props.history.push({
                pathname : '/trackInformation'
      
              })
            } 
          }
      )
      .catch(
          error => console.error(error)
      );

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
        <Modal id='HaveAudioModal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you have audio files to upload?
          <span>
            <br />
          <Button variant="primary" id="yesButton" onClick={this.handleClose}>
              Yes
            </Button>
            <Button variant="primary" id="noButton" onClick={this.handleNoAudioClick}>
              No
            </Button>
          </span>
          <div className="alert alert-primary clearfix" role="alert">
          In order to submit a project for full anti-piracy services including pre-release filtering, you must submit audio files.  In the meantime, you can submit track titles and metadata for basic leak detection, monitoring and web-crawling in the next step.
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(HaveAudioModal);