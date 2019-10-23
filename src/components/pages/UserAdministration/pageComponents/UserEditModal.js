import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserEditForm from './UserEditForm';

class UserEditModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal size="lg" {...this.props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserEditForm onHide={this.props.onHide} editUser={this.props.editUser}></UserEditForm>
                </Modal.Body>
            </Modal>
        );
    }
}

export default UserEditModal;
