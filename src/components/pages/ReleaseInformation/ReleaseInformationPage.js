import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import ToolTip from '../../ui/Tooltip';
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import Noty from 'noty';
import LoadingImg from '../../ui/LoadingImg';
import {resetDatePicker, isFormValid, formatDateToYYYYMMDD} from '../../Utils.js';


import ReleasingLabelsInput from '../ReleaseInformation/pageComponents/ReleasingLabelsInput';
import ProjectTypesInput from '../ReleaseInformation/pageComponents/ProjectTypesInput';

class ReleaseinformationPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formInputs : {
                "projectID" : '',
                "projectTitle" : '',
                "projectCoverArt" : '',
                "projectArtistName" : '',
                "projectTypeID" : '1',
                "projectReleasingLabelID" : '',
                "projectReleaseDate" : '',
                "projectReleaseDateTBD" : false,
                "projectNotes" : '',
                "projectCoverArtFileName": '',
                "projectCoverArtBase64Data": ''
            },
            project : {
                Project : {
                    projectID : '',
                    projectTitle : '',
                    projectTypeID : '',
                    projectType : '',
                    projectArtistName : '',
                    projectReleasingLabelID : '',
                    projectReleasingLabel : '',
                    projectReleaseDate : '',
                    projectReleaseDateTBD : false,
                    projectPrimaryContact : '',
                    projectPrimaryContactEmail : '',
                    projectAdditionalContacts : '',
                    projectNotes : '',
                    projectSecurityID : '',
                    projectSecurity : '',
                    projectStatusID : '',
                    projectStatus : '',
                    projectCoverArtFileName : '',
                    projectCoverArtBase64Data : ''
                }
            },
            releaseDateRequired : true,
            showloader : false,
            projectReleaseDateDisabled : false,
            projectReleaseDateReset : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReleaseTBDChange = this.handleReleaseTBDChange.bind(this);
        this.setParentState = this.setParentState.bind(this);
        this.albumArt = this.albumArt.bind(this);
        this.handleCoverChange = this.handleCoverChange.bind(this);
        this.clearCoverArt = this.clearCoverArt.bind(this);
    };

    handleReleaseTBDChange = (e) => {
        let {formInputs} = this.state;
        this.state.formInputs.projectReleaseDate = null;

        if(e.target.checked) {
            this.setState({
                projectReleaseDateDisabled : true,
                releaseDateRequired : false
            });
            resetDatePicker('projectReleaseDate');
        } else {
            this.setState({
                projectReleaseDateDisabled : false, 
                releaseDateRequired : true
            });
        }
        this.handleChange(e)
    }

    handleChange(e) {
        let inputValue = '';
        if(e.target.type === 'checkbox') {
            inputValue = (e.target.checked) ? true : false;
        } else {
            inputValue = e.target.value
        }

        //this gets the inputs into the state.formInputs obj on change
        this.setState( {formInputs : { ...this.state.formInputs, [e.target.id] : inputValue}} )
    };

    handleCoverChange(file) {
        const {formInputs} = this.state;
        const updatedFormInputs = formInputs;
        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                updatedFormInputs['projectCoverArtBase64Data'] = reader.result;
                updatedFormInputs['projectCoverArtFileName'] = file.name;
            }
            reader.onerror = function() {
                updatedFormInputs['projectCoverArtBase64Data'] = '';
                updatedFormInputs['projectCoverArtFileName'] = '';
            }

        this.setState({formInputs : updatedFormInputs})
    };

    setCoverArt() {
        const coverImg = document.getElementById('projectCoverArtIMG');

        if(coverImg) {
            coverImg.src = this.state.formInputs.projectCoverArtBase64Data
        } else {
            const img = document.createElement("img");
                img.src = this.state.formInputs.projectCoverArtBase64Data;
                img.height = 188;
                img.width = 188;
                img.classList.add("obj");
                img.id = 'projectCoverArtIMG';
                //img.file = file;

        const preview = document.getElementById('preview')
            preview.appendChild(img);
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        if(isFormValid()) {
            this.setState({ showloader : true})
            const projectID = this.state.projectID;
            const fetchHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            })

            const fetchBody = JSON.stringify( {
                "Project" : this.state.formInputs
            })

            //if this is an existing project we need to skip validation and save
            if(this.state.formInputs.projectID !== '') {

                fetch (window.env.api.url + '/project', {
                    method : 'POST',
                    headers : fetchHeaders,
                    body : fetchBody
                }).then (response => {
                    return(response.json());
                }).then (responseJSON => {
                    this.setState({ showloader : false})

                    if(responseJSON.errorMessage) {

                    } else {
                        this.props.setHeaderProjectData(responseJSON)
                        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
                        this.props.history.push('/projectContacts/' + responseJSON.Project.projectID)
                    }
                }).catch(
                    error => console.error(error)
                );
            } else {
                //if this is a new project we need to go the validator path

                fetch (window.env.api.url + '/project/validate', {
                    method : 'POST',
                    headers : fetchHeaders,
                    body : fetchBody
                }).then (response => {
                    return(response.json());
                }).then (responseJSON => {
                    if(responseJSON.IsValid) {
                        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
                        this.props.history.push('/projectContacts')
                    } else {

                        this.setState({ showloader : false})

                        new Noty ({
                            type: 'error',
                            id:'duplicateTitle',
                            text: 'The project title ' + responseJSON.projectTitle + ' by ' + responseJSON.projectArtist +' already exists. Please enter a new title. Click to close.',
                            theme: 'bootstrap-v4',
                            layout: 'top',
                            timeout: false,
                            onClick: 'Noty.close();'
                        }).show() 
                    }
                }).catch(
                    error => console.log(error)
                );
            }
        }

    };

    albumArt(e) {
        const files = e.target.files

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (!file.type.startsWith('image/')){ continue }
            const img = document.createElement("img");
                  img.src = window.URL.createObjectURL(files[i]);
                  img.height = 190;
                  img.width = 190;
                  img.classList.add("obj");
                  img.file = file;
                  img.id = 'projectCoverArtIMG';

            const preview = document.getElementById('preview')
                  preview.appendChild(img);
            
            const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = (function(aImg) { 
                      return function(e) { 
                          aImg.src = e.target.result; 
                      }; 
                  })(img);

            this.handleCoverChange(file);  
        }
    }

    clearCoverArt(e) {
        const {formInputs} = this.state;
        let modifiedFormInputs = formInputs;
            modifiedFormInputs['projectCoverArtFileName'] = '';
            modifiedFormInputs['projectCoverArtBase64Data'] = '';

        this.setState({formInputs : modifiedFormInputs});

        const projectCoverArtImg = document.getElementById('projectCoverArtIMG');
        if(projectCoverArtImg) {
            projectCoverArtImg.remove();
        }
    }

    setParentState(e) {
        this.handleChange(e)
    }

    componentDidMount() {

        const localData = JSON.parse(localStorage.getItem('projectData'))

        if(this.state.formInputs.projectReleaseDateTBD === true) {
            this.setState({projectReleaseDateDisabled : true})
        }

        if(this.state.formInputs.projectCoverArtBase64Data !== '') {
            this.setCoverArt()
        }

        if(this.props.match.params && this.props.match.params.projectID) {
            this.handleDataLoad()
        }

        if(localData && this.state.formInputs !== localData) {
            this.setState( {formInputs : localData} )
        }
        this.props.setProjectID((this.props.match.params.projectID) ? this.props.match.params.projectID : '', this.props.match.url)
    }

    getBlankFormInputs = () => {
        return(
            {
                "projectID" : '',
                "projectTitle" : '',
                "projectCoverArt" : '',
                "projectArtistName" : '',
                "projectTypeID" : '1',
                "projectReleasingLabelID" : this.props.user.ReleasingLabels[0].id,
                "projectReleaseDate" : '',
                "projectReleaseDateTBD" : false,
                "projectNotes" : '',
                "projectCoverArtFileName": '',
                "projectCoverArtBase64Data": ''
            }
        )
    }

    componentDidUpdate() {

        if(this.props.clearProject) {
            const blankInputs = this.getBlankFormInputs();
            if(this.state.formInputs !== blankInputs) {
                this.setState( {formInputs : blankInputs},  ()=> this.setCoverArt())
            }
        } else {

            if(this.props.user.ReleasingLabels && (this.state.formInputs.projectReleasingLabelID === '')) {
                this.setState( {formInputs : { ...this.state.formInputs, projectReleasingLabelID : this.props.user.ReleasingLabels[0].id}} )
            }

            if(this.state.formInputs.projectCoverArtBase64Data !== '') {
                this.setCoverArt()
            }

            if(this.props.match.params.projectID) {
                this.props.setProjectID(this.props.match.params.projectID, this.props.match.url)
            } 
        }
    }

    handleDataLoad() {

        this.setState({ showloader : true})

        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers({
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem('accessToken')
        })

        const fetchBody = JSON.stringify({
            "PagePath" : (this.props.match.url) ? this.props.match.url : '',
            "ProjectID" : this.props.match.params.projectID
        })

        fetch (window.env.api.url + '/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => {
                return(response.json());
        }).then (responseJSON => {
            this.setState({
                project : responseJSON,
                formInputs : responseJSON.Project,
                showloader : false
            })
        }).catch(
            error => {
                console.error(error)
                this.setState( {showloader : false} )
            }
        );
    }

    render() {
        return (
            <div className="col-10">
                <LoadingImg show={this.state.showloader} />

                <div className="row d-flex no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">1</span> Release Information</h2>
                        <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an <span className='required-ind'>*</span>. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>

                <Form>
                    <div className="row d-flex">
                        <div className="col-9">
                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-3">
                                    <Form.Control 
                                        type = 'hidden'
                                        id='projectID'
                                        value={this.state.formInputs.projectID}
                                    />

                                    <Form.Label className='col-form-label'>Project Title
                                        <span className="required-ind">*</span>
                                    </Form.Label>
                                    <ToolTip 
                                        tabIndex='-1' 
                                        message='Enter a title for your project here. It may consist of any letter, number or symbol from 0-255 characters in length.'
                                    />
                                </div>
                                <div className="col-9">
                                    <Form.Control 
                                        tabIndex='1+'
                                        id='projectTitle' 
                                        className='form-control requiredInput' 
                                        type='text' 
                                        placeholder='Enter a project title' 
                                        value={this.state.formInputs.projectTitle}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-tooltip">
                                        Project Title is Required
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-3">
                                    <Form.Label className='col-form-label'>Artist
                                        <span className="required-ind">*</span>
                                    </Form.Label>
                                    <ToolTip 
                                        tabIndex='-1' 
                                        message='Enter the artist for your project here. It may consist of any letter, number or symbol from 0-255 characters in length.'
                                    />
                                </div>
                               <div className="col-9">
                                <Form.Control
                                        tabIndex='2+'
                                        id='projectArtistName' 
                                        className='form-control requiredInput' 
                                        type='text' 
                                        placeholder='Enter an artist name' 
                                        value={this.state.formInputs.projectArtistName}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-tooltip">
                                        Artist Name is Required
                                    </div>
                               </div>  
                            </Form.Group>
                            
                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-3">
                                    <Form.Label className='col-form-label'>Project Type
                                        <span className="required-ind">*</span>
                                    </Form.Label>
                                    <ToolTip 
                                        tabIndex='-1' 
                                        message='Select a project type for your project. This can help you differentiate and identify projects with similar titles.'
                                    />
                                </div>
                                <div className="col-9">       
                                    <ProjectTypesInput
                                        tabIndex='3+'
                                        id='projectType'
                                        user={this.props.user}
                                        value={this.state.formInputs.projectTypeID} 
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-3">
                                    <Form.Label className='col-form-label'>Releasing Label
                                        <span className="required-ind">*</span>
                                    </Form.Label>
                                    <ToolTip 
                                        tabIndex='-1' 
                                        message='Please select the releasing label for your project. If you only have access to a single label, your label will be pre-loaded and not require a selection.'
                                    />
                                </div>
                                <div className="col-9">
                                    <ReleasingLabelsInput
                                        tabIndex='4+'
                                        id='projectReleasingLabelID'
                                        user={this.props.user} 
                                        value={this.state.formInputs.projectReleasingLabelID} 
                                        onChange={this.setParentState}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="row d-flex no-gutters">
                                <div className="col-3">
                                    <Form.Label className="col-form-label">Release Date
                                        <span className="required-ind">*</span>
                                    </Form.Label>
                                    <ToolTip 
                                        tabIndex='-1' 
                                        message='Projects with a release date prior to today&#39;s date will be considered post-release. If the project&#39;s release date is to be determined, select TBD.'
                                    />
                                </div>
                               <div className="col-3 release-date">
                                    <input
                                        tabIndex='5+'
                                        id="projectReleaseDate" 
                                        className={this.state.releaseDateRequired ? 'form-control requiredInput' : 'form-control'} 
                                        type='date'
                                        value={formatDateToYYYYMMDD(this.state.formInputs.projectReleaseDate)}
                                        disabled={this.state.projectReleaseDateDisabled}
                                        onChange={
                                            (e) => {
                                                this.handleChange(e)
                                            }
                                        }
                                    />
                                    <div className="invalid-tooltip">
                                        Release Date is Required if not TBD
                                    </div>
                               </div>
                                <div className="col-3">
                                    <Form.Label className="col-form-label tbd text-nowrap">Release TBD</Form.Label>
                                    <label className="custom-checkbox"> 		
                                        <input
                                            tabIndex='6+'
                                            id='projectReleaseDateTBD' 
                                            className='form-control' 
                                            type='checkbox' 
                                            value={this.state.formInputs.projectReleaseDateTBD}
                                            onChange={this.handleReleaseTBDChange}
                                            checked={this.state.formInputs.projectReleaseDateTBD}
                                        />
                                        <span className="checkmark "></span>
                                    </label>
                                </div>
                              <div className="col-auto"></div>
                                </Form.Group>

                            <Form.Group className='row d-flex no-gutters'>
                                <div className="col-3">
                                <Form.Label className="notes">Notes</Form.Label>
                                <ToolTip 
                                        tabIndex='-1' 
                                        message='Anything notable about this release?'
                                    />
                                </div>
                               <div className="col-9">
                               <Form.Control
                                    tabIndex='7+'
                                    id="projectNotes"  
                                    as='textarea' 
                                    rows='3' 
                                    value={this.state.formInputs.projectNotes}
                                    onChange={this.handleChange}
                                />
                               </div>
                                
                            </Form.Group>
                        </div>
                            
                        <div className="col-3 row d-flex no-gutters">
                         
                                <Form.Label className="col-form-label col-3 text-nowrap">Cover Art</Form.Label>
                                <div className="col-9 d-flex flex-fill justify-content-end">
                                <div id="preview" dropppable="true" className="form-control album-art-drop">
                                    <Button 
                                        id="removeAlbumArt"
                                        className="btn btn-secondary action remove-art" 
                                        onClick={this.clearCoverArt}
                                    ><i className="material-icons">delete</i>
                                    </Button>
                                    <span>
                                        Click to Browse<br />
                                        or Drag &amp; Drop
                                    </span>  
                                    <input 
                                        id="projectCoverArt" 
                                        type="file" 
                                        onChange={this.albumArt} 
                                    />
                                    <div className="browse-btn">
                                        <span>Browse Files</span>
                                        <input 
                                            id="projectCoverArtData" 
                                            type="file" 
                                            title="Browse Files" 
                                            onChange={this.albumArt}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                
                    <section className="row d-flex no-gutters save-buttons">
                        <div className="col-12">
                            <button
                                tabIndex='8+'
                                type="submit" 
                                className="btn btn-primary" 
                                onClick={this.handleSubmit}
                                id="releaseInfoSaveAndContinue"
                            >Save &amp; Continue</button>
                        </div>
                    </section>
                </Form> 
            </div>

        )
    }
};

export default withRouter(ReleaseinformationPage);
