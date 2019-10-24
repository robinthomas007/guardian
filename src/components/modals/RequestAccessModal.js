import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './RequestAccessModal.css';
import { isFormValid } from '../Utils';
import RequestAccessForm from './pageComponents/RequestAccessForm';

class RequestAccessModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            formInputs: {
                FirstName: '',
                LastName: '',
                LabelID: 1,
                Email: '',
                PhoneNumber: '',
            },
            ReleasingLabels: {},
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
            <Modal id="RequestAccesModal" show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Access</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RequestAccessForm handleClose={this.handleClose} />
                </Modal.Body>
            </Modal>
        );
    }
}

export default RequestAccessModal;
