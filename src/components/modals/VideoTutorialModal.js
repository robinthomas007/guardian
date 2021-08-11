import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './VideoTutorialModal.css';
import { NavLink } from 'react-router-dom';

class VideoTutorialModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
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
    const { navSteps, activeNav, MoreVideos } = this.props;
    return (
      <Modal id="VideoTutorialModal" show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <h3>{navSteps[activeNav].modalHeader}</h3>
          {MoreVideos && (
            <NavLink to={{ pathname: '/helpGuide/2' }} onClick={this.handleClose} target="_blank">
              More Video's{' '}
            </NavLink>
          )}
        </Modal.Header>
        <Modal.Body>
          <video controls autoPlay>
            {navSteps && activeNav !== null && (
              <source src={navSteps[activeNav].tutorialVideoLink} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>
    );
  }
}

export default VideoTutorialModal;
