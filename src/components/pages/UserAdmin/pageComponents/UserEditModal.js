import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import LabelsMultiSelect from './LabelsMultiSelect';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      userData: {
        firstName: '',
        lastName: '',
        labelID: '',
        phoneNumber: '',
      },
    };
  }

  handleOnChange = (e, label) => {
    this.props.handleTargetUserUpdate(e, label);
  };

  handleSubmit = () => {
    this.props.handleUserUpdate();
  };

  handleClose = () => {
    this.props.hideUserEditModal();
  };

  render() {
    const options = this.props.releasingLabels.map(label => ({
      label: label.name,
      value: label.id,
    }));
    const selectedOptions = options.filter(opt => this.props.selectedOptions.includes(opt.value));
    return (
      <Modal id="userEditModal" show={this.props.showModal} onHide={this.handleClose}>
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
                  value={this.props.user.firstName ? this.props.user.firstName : ''}
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
                  value={this.props.user.lastName ? this.props.user.lastName : ''}
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formLabel">
                <Form.Label>Label/Company</Form.Label>
                <br />
                {/* <LabelsMultiSelect
                  options={this.props.releasingLabels}
                  onChange={(e, label) => this.props.handleLabelSelectChange(e, label)}
                  defaultText="Select Option"
                  selectedOptions={this.props.selectedOptions}
                /> */}
                <ReactMultiSelectCheckboxes
                  options={options}
                  value={selectedOptions}
                  onChange={option => this.props.newHandleLabelSelectChange(option)}
                />
                <br />
                <div>
                  {selectedOptions.map(label => (
                    <React.Fragment key={label.value}>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={() => this.props.removeLabelFromEditModal(label.value)}
                      >
                        {label.label}
                        <i className="material-icons">close</i>
                      </button>
                      &nbsp;&nbsp;
                    </React.Fragment>
                  ))}
                </div>
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
                  value={this.props.user.phoneNumber ? this.props.user.phoneNumber : ''}
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
          <Button onClick={this.handleSubmit}>Save</Button>
          <input type="hidden" name="userID" />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UserEditModal;
