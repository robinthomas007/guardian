import React, { Component } from 'react';
import {Table, Grid, Button, Form, Alert } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ToolTip from '../../ui/Tooltip';
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UUID from 'uuid';
import Noty from 'noty';

import ReleasingLabelsInput from '../ReleaseInformation/pageComponents/ReleasingLabelsInput';
import ProjectTypesInput from '../ReleaseInformation/pageComponents/ProjectTypesInput';
import { AST_SymbolExportForeign } from 'terser';

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
            project : {},
            projectReleaseDateDisabled : false,
            projectReleaseDateReset : false
        }

        if(localStorage.getItem("projectData")) {
            this.state.formInputs = JSON.parse(localStorage.getItem("projectData"));
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
        let {projectReleaseDate} = formInputs;
        let modifiedProjectReleaseDate = '';
        let newDate = null;

        this.state.formInputs.projectReleaseDate = null;

        if(e.target.checked) {
            this.setState({projectReleaseDateDisabled : true})

            //because datepickers don't have a simple way to reset
            const projectReleaseDatePicker = document.getElementById('projectReleaseDate');
            if(projectReleaseDatePicker) {
                projectReleaseDatePicker.value = '';
            }
        } else {
            this.setState({projectReleaseDateDisabled : false})
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
        //console.log('-----', this.state.formInputs)

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

    setCoverArt(imgSrc) {
        const img = document.createElement("img");
              img.src = imgSrc;
              img.height = 188;
              img.width = 188;
              img.classList.add("obj");
              img.id = 'projectCoverArt';
              //img.file = file;

        const preview = document.getElementById('preview')
              preview.appendChild(img);
              
    }

    handleSubmit(event) {

        event.preventDefault();

        const releaseInformationInputs = JSON.parse(localStorage.getItem('projectData'));
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = this.state.projectID;
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

        //if this is an existing project we need to skip validation and save
        if(this.state.formInputs.projectID !== '') {

            fetch ('https://api-dev.umusic.net/guardian/project', {
                method : 'POST',
                headers : fetchHeaders,
                body : fetchBody
            }).then (response => 
                {
                    return(response.json());
                }
            ).then (responseJSON => 
                {
                    if(responseJSON.errorMessage) {

                    } else {
                        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
                        this.props.history.push('/projectContacts/' + responseJSON.Project.projectID)
                    }
                }
            ).catch(
                error => console.error(error)
            );
        } else {
            //if this is a new project we need to go the validator path

            fetch ('https://api-dev.umusic.net/guardian/project/validate', {
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
                    if(responseJSON.IsValid) {
                        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
                        this.props.history.push('/projectContacts')
                    } else {
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
                }
            )
            .catch(
                error => console.log(error)
            );
        }

       };

    albumArt(e) {

        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (!file.type.startsWith('image/')){ continue }
            const img = document.createElement("img");
                  img.src = window.URL.createObjectURL(files[i]);
                  img.height = 188;
                  img.width = 188;
                  img.classList.add("obj");
                  img.file = file;
                  img.id = 'projectCoverArt';

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

        const projectCoverArtImg = document.getElementById('projectCoverArt');
        if(projectCoverArtImg) {
            projectCoverArtImg.remove();
        }
    }

    setParentState(e) {

        this.handleChange(e)
    }

    componentDidMount() {

        if(this.state.formInputs.projectReleaseDateTBD === true) {
            this.setState({projectReleaseDateDisabled : true})
        }

        if(this.props.match.params && this.props.match.params.projectID) {
            this.handleDataLoad()
        }
    }

    componentDidUpdate() {
        if(this.props.user.ReleasingLabels && (this.state.formInputs.projectReleasingLabelID === '')) {
            this.setState( {formInputs : { ...this.state.formInputs, projectReleasingLabelID : this.props.user.ReleasingLabels[0].id}} )
        }

        if(this.state.formInputs.projectCoverArtBase64Data !== '') {
            this.setCoverArt(this.state.formInputs.projectCoverArtBase64Data)
        }
    }

    handleDataLoad() {
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
            "ProjectID" : this.props.match.params.projectID
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
                this.setState({formInputs : responseJSON.Project})
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    formatDateToYYYYMMDD(unFormattedDate) {
        let formattedDate = '';

        if(unFormattedDate) {
            var d = new Date(unFormattedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
    
            formattedDate = [year, month, day].join('-');
        }
        return(formattedDate)
    }

    render() {
        return (
            <section className="page-container h-100">

                <PageHeader />

                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">1</span> Release Information</h2>
                        <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an <span className='required-ind'>*</span>. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>

                <Form>
                    <div className="row">
                        <div className="col-3"></div>
                    </div>
        
                    <div className="row col-12">
                        <div className="col-8">
                            <Form.Control 
                                type = 'hidden'
                                id='projectID'
                                value={this.state.formInputs.projectID}
                            />

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Project Title
                                    <span className="required-ind">*</span>
                                    <ToolTip tabIndex='-1' message='Enter a title for your project here. It ay consist of any letter, number or symbol from 0-255 characters in length.' />
                                </Form.Label>
                                <Form.Control 
                                    tabIndex='1+'
                                    id='projectTitle' 
                                    className='form-control col-8' 
                                    type='text' 
                                    placeholder='Enter a project title' 
                                    value={this.state.formInputs.projectTitle}
                                    onChange={this.handleChange}
                                  />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Artist
                                    <span className="required-ind">*</span>
                                    <ToolTip tabIndex='-1' message='Enter the artist for your project here. It ay consist of any letter, number or symbol from 0-255 characters in length.' />
                                </Form.Label>
                                <Form.Control
                                    tabIndex='2+'
                                    id='projectArtistName' 
                                    className='form-control col-8' 
                                    type='text' 
                                    placeholder='Enter an artist name' 
                                    value={this.state.formInputs.projectArtistName}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Project Type
                                    <span className="required-ind">*</span>
                                    <ToolTip tabIndex='-1' message='Select a project type for your project. This can help you differentiate and identify projects with similar titles.' />
                                </Form.Label>
                                <ProjectTypesInput
                                    tabIndex='3+'
                                    id='projectType'
                                    user={this.props.user}
                                    value={this.state.formInputs.projectTypeID} 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Releasing Label
                                    <span className="required-ind">*</span>
                                    <ToolTip tabIndex='-1' message='Please select the releasing labe for your project. If you only have access to a single label, your label will be pre-loaded and not require a selection.' />
                                </Form.Label>
                                <ReleasingLabelsInput
                                    tabIndex='4+'
                                    id='projectReleasingLabelID'
                                    user={this.props.user} 
                                    value={this.state.formInputs.projectReleasingLabelID} 
                                    onChange={this.setParentState}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release Date
                                    <span className="required-ind">*</span>
                                    <ToolTip tabIndex='-1' message='Projects with a release date prior to todays date will be considered post-release entries. If the projects release date is to be determined, select the TBD option.' />
                                </Form.Label>
                                    <input
                                        tabIndex='5+'
                                        id="projectReleaseDate" 
                                        className='form-control col-3' 
                                        type='date'
                                        value={this.formatDateToYYYYMMDD(this.state.formInputs.projectReleaseDate)}
                                        disabled={this.state.projectReleaseDateDisabled}
                                        onChange={
                                            (e) => {
                                                this.handleChange(e)
                                            }
                                        }

                                    />



                                <Form.Label className="col-form-label col-2 tbd">Release TBD</Form.Label>
                                <label className="custom-checkbox"> 		
                                    <input
                                        tabIndex='6+'
                                        id='projectReleaseDateTBD' 
                                        className='form-control col-3' 
                                        type='checkbox' 
                                        value={this.state.formInputs.projectReleaseDateTBD}
                                        onChange={this.handleReleaseTBDChange}
                                        checked={this.state.formInputs.projectReleaseDateTBD}
                                    />
                                    <span className="checkmark "></span>
                                </label>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label className="col-3 notes">Notes</Form.Label>
                                <Form.Control
                                    tabIndex='7+'
                                    id="projectNotes" 
                                    className='col-8' 
                                    as='textarea' 
                                    rows='3' 
                                    value={this.state.formInputs.projectNotes}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </div>
                            
                        <div className="col-4">
                            <Form.Group className="form-group cover-art">
                                <Form.Label className="col-form-label col-3">Cover Art</Form.Label>
                                <div id="preview" dropppable="true" className="form-control album-art-drop col-8">
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
                            </Form.Group>
                        </div> 
                    </div>
                    
                    <div className="row notes-row no-gutters">
                        <div className="col-12"></div>
                    </div>     
                
                    <section className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
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
            </section>
        )
    }
};

export default withRouter(ReleaseinformationPage);
