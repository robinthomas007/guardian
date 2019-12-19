import React, { Component } from 'react';
import LabelsInput from '../../../../components/pages/FindProject/pageComponents/LabelsInput'
import {Button, Modal, Form} from 'react-bootstrap';
 import LabelsMultiSelect from './LabelsMultiSelect';

class UserEditModal extends Component {
    constructor(props) {
		super(props);
		this.state = {
            data : {},
            userData : {
                firstName : '',
                lastName : '',
                labelID : '',
                phoneNumber : '',
            }
        }
    }

    handleOnChange = (e, label) => {
        this.props.handleTargetUserUpdate(e, label);
    };

    handleSubmit = () => {
        this.props.handleUserUpdate()
    };

    handleClose = () => {
        this.props.hideUserEditModal()
    };

    render() {

        return(

            <Modal id='userEditModal' show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing: {this.props.user.email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <input
                                    id={'firstName'}
                                    type="text" 
                                    placeholder="John" 
                                    name="firstName" 
                                    className="form-control" 
                                    value={(this.props.user.firstName) ? this.props.user.firstName : ''}
                                    onChange={this.handleOnChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <input 
                                    id={'lastName'}
                                    type="text" 
                                    placeholder="Doe" 
                                    name="lastName" 
                                    className="form-control"
                                    value={(this.props.user.lastName) ? this.props.user.lastName : '' }
                                    onChange={this.handleOnChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formLabel">
                                <Form.Label>Label/Company</Form.Label><br/>
                                <LabelsMultiSelect 
                                    options={this.props.releasingLabels} 
                                    onChange={(e,label) => this.props.handleLabelSelectChange(e,label)}
                                    defaultText="Select Option"
                                    selectedOptions={this.props.selectedOptions}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <input 
                                    id={'phoneNumber'}
                                    type="text" 
                                    placeholder="123-456-7890" 
                                    name="phoneNumber" 
                                    className="form-control"
                                    value={(this.props.user.phoneNumber) ? this.props.user.phoneNumber : ''}
                                    onChange={this.handleOnChange}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit}>
                        Save
                    </Button>
                    <input type="hidden" name="userID" />
                </Modal.Footer>
            </Modal>
        )
    }
};

export default UserEditModal;