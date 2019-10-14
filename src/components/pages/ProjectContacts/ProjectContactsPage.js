import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 
import ToolTip from '../../ui/Tooltip';
import BootStrapDropDownInput from '../ProjectContacts/pageComponents/BootStrapDropDownInput';
import { withRouter } from "react-router";
import './ProjectContacts.css';
import LoadingImg from '../../ui/LoadingImg';
import Noty from 'noty';
import { isFormValid } from '../../Utils.js';

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
            projectAdditionalContactsValid : '',
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
        this.isAdditionalContactsValid = this.isAdditionalContactsValid.bind(this);
    }
    
    handlePageDataLoad() {

        this.setState({ showloader : true})

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
                this.setState({ 
                    formInputs: modifiedFormInputs,
                    project: responseJSON
                });

                this.setState({ showloader : false})

            }
        )
        .catch(
            error => {
                console.error(error)
                this.setState({ showloader : false})
            }
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
        let securityOptions = '';
        if(this.props.user && this.props.user.ProjectSecurities) {
            securityOptions = this.props.user.ProjectSecurities.map( (security, i) =>
                <option key={i} value={security.id}>{(security.id === 1) ? 'lock' : '' + 1111 + security.name}</option>
            )
        }
        return(securityOptions)
    }

    isAdditionalContactsValid() {
        const user = JSON.parse(sessionStorage.getItem('user'));
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
            "emails": this.state.formInputs.projectAdditionalContacts
        })
        fetch ('https://api-dev.umusic.net/guardian/project/validate/emails', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 
            {
                if(responseJSON.IsValid) {
                    this.handleSubmit(true)
                    this.setState({projectAdditionalContactsValid : ''})
                } else {
                    this.handleSubmit(false)
                    this.setState({projectAdditionalContactsValid : ' is-invalid'})
                }
            }
        ).catch(
            error => console.error(error)
        );
    }

    handleSubmit(preValidationError) {

        const isValidForm = isFormValid();

        if(isValidForm) {

            this.setState({ showloader : true})

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
                    if(responseJSON.errorMessage) {
                        this.showNotSavedNotification()
                    } else {

                        this.setState({ showloader : false})

                        this.showNotification('', responseJSON.Project.projectID)
                        
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

    componentDidUpdate = () => {
        if(this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    }

    componentDidMount = () => {
        if(this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    }

    render() {
        return(
            <div className="col-10">
            <LoadingImg show={this.state.showloader} />
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
                                <div className="col-5"> 
                                <Form.Control 
                                    className='form-control requiredInput'
                                    tabIndex='2+'
                                    id='projectPrimaryContact' 
                                    value={this.state.formInputs.projectPrimaryContact}
                                    onChange={this.handleChange} 
                                />
                                <div className="invalid-tooltip">
                                    Primary Contact is Required
                                </div>
                                </div>
                                <div className="col-5"></div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-2">
                                <Form.Label className='col-form-label'>Primary Contact Email
                                    <span className='required-ind'>*</span>
                                </Form.Label>
                                <ToolTip tabIndex='-1' message='The email address belonging to the primary contact. This may not belong to any user aside from the primary contact.' />
                                </div>
                                <div className="col-5">
                                <Form.Control 
                                    className='form-control requiredInput'
                                    tabIndex='3+'
                                    id='projectPrimaryContactEmail' 
                                    value={this.state.formInputs.projectPrimaryContactEmail}
                                    onChange={this.handleChange} 
                                />
                                <div className="invalid-tooltip">
                                    Primary Contact Email is Required
                                </div>
                                </div>
                                <div className="col-5"></div>
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
                                    className={'form-control additionalContactsInput' + this.state.projectAdditionalContactsValid} 
                                    tabIndex='4+'
                                    as='textarea' 
                                    rows='5' 
                                    value={this.state.formInputs.projectAdditionalContacts}
                                    onChange={this.handleChange}
                                />
                                    <div className="invalid-tooltip">
                                        Incorrectly formatted email addresse(s)
                                    </div>
                                </div>
                            </Form.Group>


                            </div>
                        </div>
               
                    <div className="row save-buttons">
                        <div className="col-12">
                            <button tabIndex='5+' id="contactsSaveButton" type="button" className="btn btn-secondary">Save</button>
                            <button tabIndex='6+' id="contactsSaveContButton" type="button" className="btn btn-primary" onClick={this.isAdditionalContactsValid}>Save &amp; Continue</button>
                        </div>
                    </div>
                </Form>
                </div>
        )
    }
};

export default withRouter(ProjectContactsPage);
