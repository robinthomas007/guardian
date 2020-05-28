import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './VideoTutorialModal.css';

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
        return (
            <Modal id="VideoTutorialModal" show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                <video controls autoPlay>
                  <source src={this.props.navSteps[this.props.activeNav].tutorialVideoLink} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
                </Modal.Body>
            </Modal>
        );
    }
}

export default VideoTutorialModal;
