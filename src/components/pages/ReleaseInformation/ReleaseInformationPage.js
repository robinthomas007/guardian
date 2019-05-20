import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader'; 
import './ReleaseInformation.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UUID from 'uuid';

class ReleasingLabelsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.user,
            value : this.props.value,
            onChange : this.props.onChange,
        }

        this.getReleasingLabelOptions = this.getReleasingLabelOptions.bind(this);
    }

    getReleasingLabelOptions() {

        let labelOptions = ''
        let defaultLabelID = ''
        if(this.props.user && this.props.user.ReleasingLabels) {
            labelOptions = this.props.user.ReleasingLabels.map( (label, i) =>
                <option key={i} value={label.id}>{label.name}</option>
            )
        }
        return(labelOptions)
    }

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
            this.handleChange(event)
        }

        
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
        console.log(this.state.formInputs)
    };

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('projectData', JSON.stringify(this.state.formInputs));
        this.props.history.push('/projectContacts')
    };

    componentDidUpdate() {
        if(this.props.user && this.props.user.DefaultReleasingLabelID && (this.state.formInputs.projectReleasingLabelID !== this.props.user.DefaultReleasingLabelID)) {
            this.setState( {formInputs : { ...this.state.formInputs, "projectReleasingLabelID" : this.props.user.DefaultReleasingLabelID}} )
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
                                <Form.Label className='col-form-label col-3'>Project Title<span className="required-ind">*</span></Form.Label>
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
                                <Form.Label className='col-form-label col-3'>Artist<span className="required-ind">*</span></Form.Label>
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
                                <Form.Label className='col-form-label col-3'>Project Type<span className="required-ind">*</span></Form.Label>
                                <ProjectTypesInput
                                    user={this.props.user} 
                                    value={this.state.formInputs.projectTypeID} 
                                    onChange={this.handleChange}
                                />

                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Releasing Label<span className="required-ind">*</span></Form.Label>
                                <ReleasingLabelsInput 
                                    user={this.props.user} 
                                    value={this.state.formInputs.projectReleasingLabelID} 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release Date<span className="required-ind">*</span></Form.Label>
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
                                <div id="droppable" className="form-control album-art-drop col-8"></div>
                            </Form.Group>
                        </div> 
                    </div>
                    
                    <div className="row notes-row no-gutters">
                        <div className="col-12"></div>
                    </div>     
                
                    <section className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save &amp; Continue</button>
                        </div>
                    </section>
                </Form> 
            </section>
        )
    }
};

export default withRouter(ReleaseinformationPage);
