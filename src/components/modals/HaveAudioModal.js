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
              If you do not have audio files the project cannot be submitted for full protection until audio files have been provided.
              In the meantime you can submit track information for initial protection in the next step, which will immedietly provide inital protection.
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(HaveAudioModal);