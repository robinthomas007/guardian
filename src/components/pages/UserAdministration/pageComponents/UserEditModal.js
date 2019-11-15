import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import UserEditForm from './UserEditForm';

class UserEditModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal {...this.props} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editing: {this.props.user.email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserEditForm onHide={this.props.onHide} editUser={this.props.editUser} labels={this.props.labels}></UserEditForm>
                </Modal.Body>
            </Modal>
        );
    }
}

export default UserEditModal;
