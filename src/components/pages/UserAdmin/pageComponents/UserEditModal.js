import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import LabelsMultiSelect from './LabelsMultiSelect';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import MultiSelectHierarchy from '../../../common/multiSelectHierarchy';

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
      isChecked: false,
      labeleIds: [],
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
  //to get formatted array of object values with label,value
  getSelectedList(list) {
    const result = [];
    if (list && list.length > 0) {
      list.forEach((company, i) => {
        if (company.CompanyId)
          result.push({ value: String(company.CompanyId), label: company.CompanyName });
        if (company.DivisionList.length > 0) {
          let divisionList = company.DivisionList;
          divisionList.forEach((division, i) => {
            if (division.DivisionId)
              result.push({ value: String(division.DivisionId), label: division.DivisionName });
            if (division.LabelList.length > 0) {
              let LabelList = division.LabelList;
              LabelList.forEach((label, i) => {
                result.push({ value: String(label.LabelId), label: label.LabelName });
              });
            }
          });
        }
      });
    }
    return result;
  }

  render() {
    // console.log('LabelFacetsLabelFacets', this.props.LabelFacets);
    // const LabelFacets = this.getSelectedList(this.props.LabelFacets);
    // const selectedOptions = LabelFacets.filter(opt =>
    //   this.props.selectedOptions.includes(opt.value),
    // );
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
                <MultiSelectHierarchy
                  handleChangeCheckbox={this.props.handleChangeCheckbox}
                  user={this.props.userData}
                  isMultiSelect={true}
                  type={'userEditModal'}
                  releasingLabels={this.props.LabelFacets}
                  selectedLabelIds={selectedOptions}
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
