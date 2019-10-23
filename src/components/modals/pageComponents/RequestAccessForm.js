import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Button, Spinner } from 'react-bootstrap';
import LabelsDropDown from 'components/modals/pageComponents/LabelsDropDown';
import { fetchLabels } from 'redux/labels/actions';
import { requestAccess } from 'redux/user/actions';
import { isFormValid } from 'components/Utils';

let RequestAccessForm = props => {
    const handleSubmit = event => {
        event.preventDefault();
        if (isFormValid()) props.requestAccess(props.userValues);
    };

    if (props.success) {
        return (
            <h5>
                <i className="material-icons">done</i>
                &nbsp; Your request has been submitted.
            </h5>
        );
    }

    if (props.submitting) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <ul>
                <li>Fill in the fields below for review by our administrative team.</li>
                <li>
                    <Form.Label>First Name</Form.Label>
                    <Field component="input" type="text" placeholder="John" name="firstName" className="form-control requiredInput" />
                </li>
                <li>
                    <Form.Label>Last Name</Form.Label>
                    <Field component="input" type="text" placeholder="Doe" name="lastName" className="form-control requiredInput" />
                </li>
                <li>
                    <LabelsDropDown
                        id="primaryLabelID"
                        data={props.labels}
                        className="col-form-label dropdown col-4 requiredInput"
                        name="primaryLabelID"
                        selected={props.userValues.primaryLabelID}
                        forCreate={true}
                    />
                </li>
                <li>
                    <Form.Label>Email</Form.Label>
                    <Field component="input" type="email" placeholder="my@email.com" name="email" className="form-control requiredInput" />
                </li>
                <li>
                    <Form.Label>Phone</Form.Label>
                    <Field component="input" type="text" placeholder="123-456-7890" name="phoneNumber" className="form-control requiredInput" />
                </li>
                <li className="float-right">
                    <Button variant="secondary" id="cancelButton" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" id="submitButton" type="submit">
                        Submit
                    </Button>
                </li>
            </ul>
        </Form>
    );
};

RequestAccessForm = reduxForm({
    form: 'requestAccessForm',
    enableReinitialize: true,
})(RequestAccessForm);

const selector = formValueSelector('requestAccessForm');
RequestAccessForm = connect(
    state => {
        const labels = state.labels.labels;
        const userValues = selector(state, 'firstName', 'lastName', 'email', 'primaryLabelID', 'phoneNumber');
        const { submitting, success } = state.user;
        return { userValues, labels, submitting, success };
    },
    { fetchLabels, requestAccess } // Dispatch action bindings
)(RequestAccessForm);

export default RequestAccessForm;
