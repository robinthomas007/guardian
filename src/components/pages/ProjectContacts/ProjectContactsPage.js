import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ToolTip from '../../ui/Tooltip';
import { withRouter } from "react-router";
import './ProjectContacts.css';
import Noty from 'noty'

class ProjectSecurityInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : this.props.user,
            value : this.props.value,
            onChange : this.props.onChange,
        }
        
        this.getProjectSecurityOptions = this.getProjectSecurityOptions.bind(this);
    }

    getProjectSecurityOptions() {
        let projectSecurityOptions = ''
        if(this.props.user && this.props.user.ProjectSecurities) {
            projectSecurityOptions = this.props.user.ProjectSecurities.map( (projectSecurity, i) =>
                <option key={i} value={projectSecurity.id}>{projectSecurity.name}</option>
            )
        }

        return(projectSecurityOptions)
    }

    render() {
        return(
            <Form.Control 
                id='projectSecurityID' 
                as='select' 
                className='col-form-label dropdown col-2' 
                value = {this.props.value}
                onChange={this.state.onChange}
            >
                {this.getProjectSecurityOptions()}
            </Form.Control>
        )
    }
}

class ProjectContactsPage extends Component {
    constructor(props) {

        const user = JSON.parse(sessionStorage.getItem('user'))

        super(props);
        this.state = {
            formInputs : {
                "projectPrimaryContact" : user.name, 
                "projectPrimaryContactEmail" : user.email,
                "projectSecurityID" : '1', 
                "projectAdditionalContacts" : '',
                "projectStatusID" : '1',

            },
            project : {}
        }

        if(this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }
    
    handlePageDataLoad() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const projectID = this.props.match.params.projectID
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
            "ProjectID" : projectID
        })


        fetch ('https://api-dev.umusic.net/guardian/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 

            {
                const { formInputs } = this.state;
                let modifiedFormInputs = responseJSON.Project;
                this.setState({ formInputs: modifiedFormInputs });
            }
        )
        .catch(
            error => console.error(error)
        );
    }


    showNotification(e, projectID){

        new Noty ({
            type: 'success',
            id:'projectSaved',
            text: 'Your project has been successfully saved',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).on('afterClose', ()  =>
            this.props.history.push({
                pathname : '/audioFiles/' + projectID
            })
        ).show()
    };

    showNotSavedNotification(e){
        new Noty ({
            type: 'error',
            id:'projectSaved',
            text: 'Your project has NOT been successfully saved',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

    handleChange(event) {
        this.setState( {formInputs : { ...this.state.formInputs, [event.target.id] : event.target.value}} )
        console.log(this.state.formInputs)
    }

    getProjectSecurityOptions() {

        let securityOptions = ''
        let defaultLabelID = ''
        if(this.props.user && this.props.user.ProjectSecurities) {
            securityOptions = this.props.user.ProjectSecurities.map( (security, i) =>
                <option key={i} value={security.id}>{security.name}</option>
            )
        }
        return(securityOptions)
    }

    handleSubmit(event) {
        const releaseInformationInputs = JSON.parse(localStorage.getItem('projectData'));
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = this.props.match.params.projectID;

        const projectFields = (projectID) ? this.state.formInputs : {...releaseInformationInputs, ...this.state.formInputs}

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
            "Project" : projectFields
        })


        fetch ('https://api-dev.umusic.net/guardian/project', {
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

                if(responseJSON.errorMessage) {
                    this.showNotSavedNotification(event)
                } else {

                    this.showNotification(event, responseJSON.Project.projectID)
                    
                    //clear the local storage
                    localStorage.removeItem('projectData')
                }
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    componentDidMount() {
        this.getProjectSecurityOptions()
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
                                <Form.Label className='col-form-label col-2'>Project Security 
                                <span className='required-ind'>*</span>
                                <ToolTip message='Projects are by default, set to private. This means only you may view or make changes to them. If set to public, projects will be made available to everyone within the label group.' />
                                </Form.Label>
                                <ProjectSecurityInput 
                                    user={this.props.user} 
                                    value={this.state.formInputs.projectSecurityID} 
                                    onChange={this.handleChange}                                
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-2'>Primary Contact 
                                <span className='required-ind'>*</span>
                                <ToolTip message='The originator of the project is by default set to be the primary contact. This can be changed here and the project will be created for that users account as long as they have access to the selected label.' />
                                </Form.Label>
                                <Form.Control 
                                    className='form-control col-5' 
                                    id='projectPrimaryContact' 
                                    value={this.state.formInputs.projectPrimaryContact}
                                    onChange={this.handleChange} 
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-2'>Primary Contact Email
                                <span className='required-ind'>*</span>
                                <ToolTip message='The email address belonging to the primary contact. This may not belong to any user aside from the primary contact.' />
                                </Form.Label>
                                <Form.Control 
                                    className='form-control col-5' 
                                    id='projectPrimaryContactEmail' 
                                    value={this.state.formInputs.projectPrimaryContactEmail}
                                    onChange={this.handleChange} 
                                />
                            </Form.Group>

                            <div className='row additional-contacts'>
                                <Form.Group className="form-group col-2">
                                    <Form.Label>Addtional Contacts
                                    <ToolTip message='Additional contacts or users that youd like to share this project with may be added here. You can copy any paste from Outlook,  or separate a list of users to be added by commas, spaces, semi-colons or any combination of these.' />
                                    </Form.Label>
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

export default withRouter(ProjectContactsPage);
