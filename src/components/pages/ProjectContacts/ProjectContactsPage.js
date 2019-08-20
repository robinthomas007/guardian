import React, { Component } from 'react';
import {Table, Grid, Button, Form, Dropdown, Alert } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ToolTip from '../../ui/Tooltip';
import BootStrapDropDownInput from '../ProjectContacts/pageComponents/BootStrapDropDownInput';
import { withRouter } from "react-router";
import './ProjectContacts.css';
import LoadingImg from '../../ui/LoadingImg';
import Noty from 'noty';
import {isFormValid} from '../../Utils.js';


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
            project : {},
            showloader : false
        }

        if(this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.handleChangeByID = this.handleChangeByID.bind(this);
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
    }

    handleChangeByID(id, value) {
        const {formInputs} = this.state;
        let modifiedFormInput = formInputs;
            modifiedFormInput[id] = value;

        this.setState({formInputs : modifiedFormInput})
    }

    getProjectSecurityOptions() {

        let securityOptions = ''
        let defaultLabelID = ''
        if(this.props.user && this.props.user.ProjectSecurities) {
            securityOptions = this.props.user.ProjectSecurities.map( (security, i) =>
                <option key={i} value={security.id}>{(security.id === 1) ? 'lock' : '' + 1111 + security.name}</option>
            )
        }
        return(securityOptions)
    }

    handleSubmit(event) {

        event.preventDefault();

        alert(isFormValid())

        if(isFormValid()) {
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

            this.setState({ showloader : true})

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

                        this.setState({ showloader : false})

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
    }

    render() {

        const user = JSON.parse(sessionStorage.getItem('user'))

        return(
            <section className="page-container h-100">

                <LoadingImg show={this.state.showloader} />

                <PageHeader />
    
                <div className="row d-flex no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">2</span> Project Contacts</h2>
                        <p>In this step, you can choose which contacts will be associated with the project that has recently been created. You can select the level of project security (i.e., who will be able to see the project) and who should be contacted regarding this project if necessary. Required fields are indicated with an <span className="required-ind">*</span>.</p>
                    </div>
                </div>
    
                <Form>
                    <div className="row d-flex">
                        <div className="col-12">


                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-2">
                                <Form.Label className='col-form-label'>Project Security 
                                    <span className='required-ind'>*</span>
                                </Form.Label>
                                <ToolTip tabIndex='-1' message='Projects are by default, set to private. This means only you may view or make changes to them. If set to public, projects will be made available to everyone within the label group.' />
                                </div>
                                <div className="col-10">
                                <BootStrapDropDownInput 
                                    tabIndex='1+'
                                    id='projectSecurityID'
                                    value={this.state.formInputs.projectSecurityID}
                                    onChange={this.handleChangeByID}
                                    className={'project-security-dropdown'}
                                />
                            
                                </div>
                            </Form.Group>
    
                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-2">
                                <Form.Label className='col-form-label'>Primary Contact 
                                    <span className='required-ind'>*</span>
                                </Form.Label>
                                <ToolTip tabIndex='-1' message='The originator of the project is by default set to be the primary contact. This can be changed here and the project will be created for that users account as long as they have access to the selected label.' />
                                </div>
                                <div className="col-10"> 
                                <Form.Control 
                                    className='form-control col-5 requiredInput'
                                    tabIndex='2+'
                                    id='projectPrimaryContact' 
                                    value={this.state.formInputs.projectPrimaryContact}
                                    onChange={this.handleChange} 
                                />
                                <div className="invalid-tooltip">
                                    Primary Contact is Required
                                </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-2">
                                <Form.Label className='col-form-label'>Primary Contact Email
                                    <span className='required-ind'>*</span>
                                </Form.Label>
                                <ToolTip tabIndex='-1' message='The email address belonging to the primary contact. This may not belong to any user aside from the primary contact.' />
                                </div>
                                <div className="col-10">
                                <Form.Control 
                                    className='form-control col-5 requiredInput'
                                    tabIndex='3+'
                                    id='projectPrimaryContactEmail' 
                                    value={this.state.formInputs.projectPrimaryContactEmail}
                                    onChange={this.handleChange} 
                                />
                                <div className="invalid-tooltip">
                                    Primary Contact Email is Required
                                </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-2">
                                <Form.Label className='col-form-label align-top'>Additional Contacts
                                </Form.Label>
                                <ToolTip tabIndex='-1' message='Additional contacts or users that youd like to share this project with may be added here. You can copy any paste from Outlook,  or separate a list of users to be added by commas, spaces, semi-colons or any combination of these.' />
                                </div>
                                <div className="col-10">
                                <Form.Control 
                                    id='projectAdditionalContacts'
                                    className='form-control'
                                    tabIndex='4+'
                                    as='textarea' 
                                    rows='5' 
                                    value={this.state.formInputs.projectAdditionalContacts}
                                    onChange={this.handleChange}
                                />
                                </div>
                            </Form.Group>


                            </div>
                        </div>
               
                    <div className="row save-buttons">
                        <div className="col-12">
                            <button tabIndex='5+' id="contactsSaveButton" type="button" className="btn btn-secondary">Save</button>
                            <button tabIndex='6+' id="contactsSaveContButton" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save &amp; Continue</button>
                        </div>
                    </div>
                </Form>
            </section>
        )
    }
};

export default withRouter(ProjectContactsPage);
