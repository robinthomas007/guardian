import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Button, Spinner } from 'react-bootstrap';
import LabelsDropDown from 'components/modals/pageComponents/LabelsDropDown';
import { fetchLabels } from 'redux/labels/actions';
import { requestAccess } from 'redux/user/actions';
import { isFormValid } from 'components/Utils';
import Noty from 'noty';

let RequestAccessForm = props => {
    const handleSubmit = event => {
        event.preventDefault();
        if (isFormValid()) props.requestAccess(props.userValues);
    };

    if (props.success) {
        new Noty ({
            type: 'success',
            id:'requestAccessSent',
            text: 'Your request for access to the Guardian has been successfully sent.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
        props.handleClose()
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
            <ul className="request-form">
                <li>Fill in the fields below for review by our administrative team.</li>
                <li>
                    <Form.Label>First Name</Form.Label>
                    <Field component="input" type="text" name="firstName" className="form-control requiredInput" />
                    <div className="invalid-tooltip">
                        First Name is required.
                    </div>
                </li>
                <li>
                    <Form.Label>Last Name</Form.Label>
                    <Field component="input" type="text" name="lastName" className="form-control requiredInput" />
                    <div className="invalid-tooltip">
                        Last Name is required.
                    </div>
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
                     <div className="invalid-tooltip">
                        A label selection is required.
                    </div>
                </li>
                <li>
                    <Form.Label>Email</Form.Label>
                    <Field component="input" type="email" name="email" className="form-control requiredInput" />
                    <div className="invalid-tooltip">
                        An email address is required.
                    </div>
                </li>
                <li>
                    <Form.Label>Phone</Form.Label>
                    <Field component="input" type="text" name="phoneNumber" className="form-control requiredInput" />
                    <div className="invalid-tooltip">
                        A phone number is required.
                    </div>
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
