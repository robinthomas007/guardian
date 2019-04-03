import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader';
import config from '../../config';


class ProjectContactsPage extends Component {
    
    

    constructor() {

        super();

        //this need to be done in a better way
        if(localStorage.getItem('projectData')) {
            this.state = {
                formInputs : JSON.parse(localStorage.getItem('projectData'))
            }
        } else {
            this.state = {
                formInputs : {}
            }
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(this.state.formInputs)
    }

    handleChange(event) {
        this.setState( {formInputs : { ...this.state.formInputs, [event.target.id] : event.target.value}} )
        console.log(this.state.formInputs)
    }

    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user'))

        this.setState( {formInputs : { ...this.state.formInputs, 'projectPrimaryContact' : user.name}} )
        this.setState( {formInputs : { ...this.state.formInputs, 'projectPrimaryEmail' : user.email}} )
        this.setState( {formInputs : { ...this.state.formInputs, 'projectSecurity' : '' }} )
        this.setState( {formInputs : { ...this.state.formInputs, 'projectAdditionalContacts' : '' }} )
        
    }

    handleSubmit(event) {
        
        event.preventDefault();
        
        const user = JSON.parse(sessionStorage.getItem('user'))

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "Project" : this.state.formInputs
        })


        console.log('--------------------------')
        console.log('HEADERS:')
        console.log(fetchHeaders)

        console.log('BODY:')
        console.log(fetchBody)
        console.log('--------------------------')

        fetch ('https://api-qa.umusic.net/guardian/project', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        )
        .then (responseJSON => 
            {
                console.log(responseJSON)

                //clear the local storage
                localStorage.removeItem('projectData')
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    render() {

        const user = JSON.parse(sessionStorage.getItem('user'))

        return(
            <section className="page-container h-100">
    
                <PageHeader />
    
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">2</span> Project Contacts</h2>
                        <p>In this step, you can choose which contacts will be associated with the project that has recently been created. You can select the level of project security (i.e., who will be able to see the project) and who should be contacted regarding this project if necessary. Required fields are indicated with an <span className="required-ind">*</span>.</p>
                    </div>
                </div>
    
                <Form>
                    <div className="row">
                        <div className="col-12">

                            <Form.Group>
                                <Form.Label className='col-form-label col-2'>Project Security <span className='required-ind'>*</span></Form.Label>
                                <Form.Control 
                                    id='projectSecurity' 
                                    as='select' 
                                    className='col-form-label dropdown col-2' 
                                    value={this.state.formInputs.projectSecurity}
                                    onChange={this.handleChange}>
                                        <option value="0" selected>Private (Viewable By You)</option>
                                        <option value="1">Public (Viewable By All Label Users)</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-2'>Primary Contact <span className='required-ind'>*</span></Form.Label>
                                <Form.Control 
                                    className='form-control col-5' 
                                    id='projectPrimaryContact' 
                                    value={user.name}
                                    onChange={this.handleChange} 
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-2'>Primary Contact Email<span className='required-ind'>*</span></Form.Label>
                                <Form.Control 
                                    className='form-control col-5' 
                                    id='projectPrimaryEmail' 
                                    value={user.email}
                                    onChange={this.handleChange} 
                                />
                            </Form.Group>

                            <div className='row additional-contacts'>
                                <Form.Group className="form-group col-2">
                                    <Form.Label>Addtional Contacts</Form.Label>
                                </Form.Group>
                                
                                <Form.Group className="form-group col-10">
                                    <Form.Control 
                                        id='projectAdditionalContacts'
                                        className='' 
                                        as='textarea' 
                                        rows='5' 
                                        value={this.state.formInputs.projectAdditionalContacts}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="button" className="btn btn-secondary">Save</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save &amp; Continue</button>
                        </div>
                    </div>
                </Form>
            </section>
        )
    }
};

export default ProjectContactsPage;