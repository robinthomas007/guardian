import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Button, Col } from 'react-bootstrap';

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
                    <Field component="input" type="text" placeholder="John" name="firstName" />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Field component="input" type="text" placeholder="Doe" name="lastName" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formLabel">
                    <Form.Label>Label</Form.Label>
                    <Field component="input" type="text" placeholder="Universal Music Group" name="primaryLabelID" />
                </Form.Group>

                <Form.Group as={Col} controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Field component="input" type="text" placeholder="123-456-7890" name="phoneNumber" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
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
    // a unique name for the form
    form: 'userEditForm',
    enableReinitialize: true,
})(UserEditForm);

const selector = formValueSelector('userEditForm');
UserEditForm = connect(
    state => {
        const userValues = selector(state, 'userID', 'firstName', 'lastName', 'primaryLabelID', 'phoneNumber');
        return {
            initialValues: state.userAdmin.userToEdit, // pull initial values from account reducer
            userValues,
        };
    },
    {} // bind account loading action creator
)(UserEditForm);

export default UserEditForm;
