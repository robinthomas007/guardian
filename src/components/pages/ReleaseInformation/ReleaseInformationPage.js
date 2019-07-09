import React, { Component } from 'react';
import {Table, Grid, Button, Form, Alert } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ToolTip from '../../ui/Tooltip';
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UUID from 'uuid';
import Noty from 'noty';

class ReleasingLabelsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.user,
            value : this.props.value,
            onChange : this.props.onChange,
            setParentState : this.props.setParentState
        }

        this.getReleasingLabelOptions = this.getReleasingLabelOptions.bind(this);
    }

    getReleasingLabelOptions() {

        let labelOptions = ''
        let defaultLabelID = ''
        if(this.props.user && this.props.user.ReleasingLabels) {

            this.props.setParentState('projectReleasingLabelID', this.props.user.ReleasingLabels[0].id)

            labelOptions = this.props.user.ReleasingLabels.map( (label, i) =>
                <option key={i} value={label.id}>{label.name}</option>
            )
        }
        return(labelOptions)
    }

    showNotification(){

        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved and submitted for intial protection.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show() 
    };

    render() {

        return(
            <Form.Control 
                id="projectReleasingLabelID" 
                as="select" 
                className='col-form-label dropdown col-3' 
                value={this.props.value}
                onChange={this.state.onChange}
            >
                {this.getReleasingLabelOptions()}
            </Form.Control>
        )
    }

}

class ProjectTypesInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let projectTypeOptions = ''
        if(this.props.user && this.props.user.ProjectTypes) {
            projectTypeOptions = this.props.user.ProjectTypes.map( (projectType, i) =>
                <option key={i} value={projectType.id}>{projectType.name}</option>
            )
        }
        return(
            <Form.Control 
                id="projectTypeID" 
                as="select" 
                className='col-form-label dropdown col-3' 
                value={ this.props.value}
                onChange={this.props.onChange}
            >
            {projectTypeOptions}
        </Form.Control>
        )
    }
}

class ReleaseinformationPage extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("projectData") === null) {
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
                    "projectNotes" : ''
                },

                formInputAttributes : {
                    "projectID" : {},
                    "projectTitle" : {},
                    "projectArtistName" : {},
                    "projectTypeID" : {},
                    "projectReleasingLabelID" : {},
                    "projectReleaseDate" : {
                        'disabled' : false
                    },
                    "projectReleaseDateTBD" : {
                    },
                    "projectNotes" : {}
                }
            };
        } else {
            this.state = { 
                formInputs : JSON.parse(localStorage.getItem("projectData")),
                formInputAttributes : {
                    "projectID" : {},
                    "projectTitle" : {},
                    "projectArtistName" : {},
                    "projectTypeID" : {},
                    "projectReleasingLabelID" : {},
                    "projectReleaseDate" : {
                        'disabled' : false
                    },
                    "projectReleaseDateTBD" : {
                    },
                    "projectNotes" : {}
                }
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReleaseTBDChange = this.handleReleaseTBDChange.bind(this);
        this.setParentState = this.setParentState.bind(this);
        this.albumArt = this.albumArt.bind(this);
        this.handleCoverChange = this.handleCoverChange.bind(this);
    };

    handleReleaseTBDChange(event) {
        const isChecked = event.target.checked
        let inputDisabledState = {...this.state.formInputAttributes.projectReleaseDate}
            inputDisabledState.disabled = isChecked

        if(isChecked) {
            this.setState(currentState => ({formInputs : { ...this.state.formInputs, 'projectReleaseDate' : ''}}), () => {
                this.setState( {formInputAttributes : { ...this.state.formInputAttributes.projectReleaseDate, 'projectReleaseDate' : inputDisabledState}} )
                
            });
        } else {
            this.setState( {formInputAttributes : { ...this.state.formInputAttributes.projectReleaseDate, 'projectReleaseDate' : inputDisabledState}} )
            
        }
        this.setState( {formInputs : { ...this.state.formInputs, 'projectReleaseDateTBD' : isChecked}} )
    }

    handleChange(event) {

        let inputValue = '';
        if(event.target.type === 'checkbox') {
            inputValue = (event.target.checked) ? true : false;
        } else {
            inputValue = event.target.value
        }

        //this gets the inputs into the state.formInputs obj on change
        this.setState( {formInputs : { ...this.state.formInputs, [event.target.id] : inputValue}} )
        console.log('-----', this.state.formInputs)

    };

    handleCoverChange(file) {
        const {formInputs} = this.state;
        const updatedFormInputs = formInputs;
        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                updatedFormInputs['projectCoverArt'] = reader.result;
            }
            reader.onerror = function() {
                updatedFormInputs['projectCoverArt'] = '';
            }

        this.setState({formInputs : updatedFormInputs})

        console.log(updatedFormInputs)
    };

    setCoverArt(imgSrc) {
        const img = document.createElement("img");
              img.src = imgSrc;
              img.height = 188;
              img.width = 188;
              img.classList.add("obj");
              //img.file = file;

        const preview = document.getElementById('preview')
              preview.appendChild(img);
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
        this.props.history.push('/projectContacts')
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

    setParentState(id, value) {
        const {formInputs} = this.state;
        const updatedFormInputs = formInputs;

        updatedFormInputs[id] = value;

        if(formInputs !== updatedFormInputs) {
            this.setState({formInputs : updatedFormInputs})
        }
    }

    componentDidMount() {
        if(this.state.formInputs.projectCoverArt !== '') {
            this.setCoverArt(this.state.formInputs.projectCoverArt)
        }
        
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
                                <ToolTip message='Enter a title for your project here. It ay consist of any letter, number or symbol from 0-255 characters in length.' />
                                </Form.Label>
                                <Form.Control 
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
                                <ToolTip message='Enter the artist for your project here. It ay consist of any letter, number or symbol from 0-255 characters in length.' />
                                </Form.Label>
                                <Form.Control 
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
                                <ToolTip message='Select a project type for your project. This can help you differentiate and identify projects with similar titles.' />
                                </Form.Label>
                                <ProjectTypesInput
                                    user={this.props.user}
                                    value={this.state.formInputs.projectTypeID} 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Releasing Label
                                <span className="required-ind">*</span>
                                <ToolTip message='Please select the releasing labe for your project. If you only have access to a single label, your label will be pre-loaded and not require a selection.' />
                                </Form.Label>
                                <ReleasingLabelsInput 
                                    user={this.props.user} 
                                    value={this.state.formInputs.projectReleasingLabelID} 
                                    onChange={this.handleChange}
                                    setParentState={this.setParentState}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release Date
                                <span className="required-ind">*</span>
                                <ToolTip message='Projects with a release date prior to todays date will be considered post-release entries. If the projects release date is to be determined, select the TBD option.' />
                                </Form.Label>
                                    <input 
                                        id="projectReleaseDate" 
                                        className='form-control col-3' 
                                        type='date' 
                                        value={this.state.formInputs.projectReleaseDate}
                                        onChange={this.handleChange}
                                        disabled={this.state.formInputAttributes.projectReleaseDate.disabled}
                                    />
                                <Form.Label className="col-form-label col-2 tbd">Release TBD</Form.Label>
                                <label className="custom-checkbox"> 		
                                    <input id='projectReleaseDateTBD' 
                                        className='form-control col-3' 
                                        type='checkbox' 
                                        value={this.state.formInputs.projectReleaseDateTBD}
                                        onChange={this.handleReleaseTBDChange}
                                    />
                                    <span className="checkmark "></span>
                                </label>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label className="col-3 notes">Notes</Form.Label>
                                <Form.Control 
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
