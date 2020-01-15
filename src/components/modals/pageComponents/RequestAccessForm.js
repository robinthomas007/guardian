import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import LabelsDropDown from 'components/modals/pageComponents/LabelsDropDown';
import ReleasingLabelsInput from '../../../components/pages/ReleaseInformation/pageComponents/ReleasingLabelsInput.js';
import { isFormValid } from '../../../components/Utils';
import Noty from 'noty';

class RequestAccessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formInputs : {
                firstName : '',
                lastName : '',
                LabelID : null,
                email : '',
                phoneNumber : '',
            }, 
            ReleasingLabels : [],
            submitDisabled : false
        };
    }

    handleChange = (e) => {
        this.setState( {formInputs : { ...this.state.formInputs, [e.target.name] : e.target.value}}, ()=> {console.log(this.state)} )
    }

    handleLabelChange = (e) => {
      this.setState( {formInputs : { ...this.state.formInputs, ['LabelID'] : parseInt(e.target.value)}}, ()=> {console.log(this.state)} )
    }

    getLabels = () => {
        const fetchHeaders = new Headers({
            "Content-Type": "application/json",
        })

        fetch (window.env.api.url + '/labels', {
            method : 'GET',
            headers : fetchHeaders,
        }).then (response => {
            return(response.json());
        }).then (responseJSON => {
            let modifiedReleasingLabels = responseJSON;
                modifiedReleasingLabels.ReleasingLabels.unshift( {id : '', name : 'Select One'});
            this.setState( {ReleasingLabels : modifiedReleasingLabels}, console.log(responseJSON) )
        }).catch(
            error => {
                console.error(error)
            }
        )
    }

    handleAccessSuccess = () => {
        new Noty ({
            type: 'success',
            id:'requestAccessSent',
            text: 'Your request for access to the Guardian has been successfully sent.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()

        //
    }

    sumbitRequestAccess = () => {

        this.setState( {submitDisabled : true} )

        const fetchHeaders = new Headers({
            "Content-Type": "application/json",
        })

        const fetchBody = JSON.stringify(
            this.state.formInputs
        )

        fetch (window.env.api.url + '/access', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => {
            return(response.json());
        }).then (responseJSON => {
            this.setState( {submitDisabled : false}, ()=> { this.handleAccessSuccess(); this.props.handleClose();})
            
        }).catch( 
            error => {
                console.error(error);
                this.setState( {submitDisabled : false} )
            }
        );
    }

    componentDidMount() {
        this.getLabels();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            this.sumbitRequestAccess()
        }
    }

    render() {
        return (
            <Form>
                <ul className="request-form">
                    <li>Fill in the fields below for review by our administrative team.</li>
                    <li>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="firstName" 
                            className="form-control requiredInput"
                            value={this.state.formInputs.firstName}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-tooltip">
                            First Name is required.
                        </div>
                    </li>
                    <li>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control  
                            component="input" 
                            type="text" 
                            name="lastName" 
                            className="form-control requiredInput"
                            value={this.state.formInputs.lastName}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-tooltip">
                            Last Name is required.
                        </div>
                    </li>
                    <li>
                        <Form.Label id="labelName">Label/Company</Form.Label>
                        <ReleasingLabelsInput
                            id='LabelID'
                            name='LabelID'
                            user={this.state.ReleasingLabels} 
                            value={this.state.formInputs.LabelID} 
                            onChange={this.handleLabelChange}
                            className={'requiredInput'}
                        />
                        <div className="invalid-tooltip">
                            A label selection is required.
                        </div>
                    </li>
                    <li>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            component="input" 
                            type="email" 
                            name="email" 
                            className="form-control requiredInput"
                            value={this.state.formInputs.email}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-tooltip">
                            An email address is required.
                        </div>
                    </li>
                    <li>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            component="input" 
                            type="tel" 
                            name="phoneNumber" 
                            className="form-control requiredInput"
                            value={this.state.formInputs.phoneNumber}
                            onChange={this.handleChange}
                        />
                        <div className="invalid-tooltip">
                            A phone number is required.
                        </div>
                    </li>
                    <li className="float-right">
                        <Button variant="secondary" id="cancelButton" onClick={this.props.handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={this.state.submitDisabled} onClick={this.handleSubmit} variant="primary" id="submitButton" type="submit">
                            Submit
                        </Button>
                    </li>
                </ul>
            </Form>
        );
    }
};

export default RequestAccessForm;