import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Button, Col } from 'react-bootstrap';
import LabelsDropDown from 'components/modals/pageComponents/LabelsDropDown';
import LabelsMultiSelect from 'components/modals/pageComponents/LabelsMultiSelect';
import MultiSelectDropdown from 'components/SharedPageComponents/multiSelectDropdown';

let UserEditForm = props => {
  const handleSubmit = event => {
    event.preventDefault();
    props.editUser(props.userValues);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Field
            component="input"
            type="text"
            placeholder="John"
            name="firstName"
            className="form-control"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Field
            component="input"
            type="text"
            placeholder="Doe"
            name="lastName"
            className="form-control"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formLabel">
          <LabelsDropDown
            id="primaryLabelID"
            className="form-control"
            name="primaryLabelID"
            selected={props.userValues.primaryLabelID}
          />

          <LabelsMultiSelect
            id="primaryLabelID"
            className="form-control"
            name="primaryLabelID"
            selected={props.userValues.primaryLabelID}
          />

          {/* <MultiSelectDropdown id="primaryLabelID" className="form-control" name="primaryLabelID" selected={props.userValues.primaryLabelID} /> */}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Field
            component="input"
            type="text"
            placeholder="123-456-7890"
            name="phoneNumber"
            className="form-control"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className="float-right">
        <Button variant="light" onClick={props.onHide}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Form.Row>
      <Field component="input" type="hidden" name="userID" />
    </Form>
  );
};

UserEditForm = reduxForm({
  form: 'userEditForm',
  enableReinitialize: true,
})(UserEditForm);

const selector = formValueSelector('userEditForm');
UserEditForm = connect(
  state => {
    const initialValues = state.userAdmin.userToEdit;
    const userValues = selector(
      state,
      'userID',
      'firstName',
      'lastName',
      'primaryLabelID',
      'phoneNumber',
    );
    if (!userValues.primaryLabelID) userValues.primaryLabelID = initialValues.primaryLabelID;
    return {
      initialValues,
      userValues,
    };
  },
  {},
)(UserEditForm);

export default UserEditForm;
