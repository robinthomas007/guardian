import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader';
import Notification from '../notifications/notifications';
import Noty from 'noty';

const mockData = require('../../mockData.json');

class ReleaseinformationPage extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("projectData") === null) {
            this.state = { 
                formInputs : {
                } 
            };
        } else {
            this.state = { 
                formInputs : JSON.parse(localStorage.getItem("projectData"))
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

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
        
        console.log('-------------------------------------')
        console.log(localStorage.getItem('projectData'))

        this.props.history.push('/projectContacts')

        //we need to save the form data to localStorage at this point instead of posting to the API
    };

   render() {

        const saveAndContinue = () => {
            alert('Save and Continue')
        }

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
                                <Form.Control 
                                    id="projectType" 
                                    as="select" 
                                    className='col-form-label dropdown col-3' 
                                    value={this.state.formInputs.projectType}
                                    onChange={this.handleChange}>
                                        <option value="0" selected>Album (Default)</option>
                                        <option value="1">Collection</option>
                                        <option value="2">Single</option>
                                </Form.Control>
                            </Form.Group>

                              <Form.Group>
                                <Form.Label className='col-form-label col-3'>Releasing Label<span className="required-ind">*</span></Form.Label>
                                <Form.Control 
                                    id="projectReleasingLabel" 
                                    as="select" 
                                    className='col-form-label dropdown col-3' 
                                    value={this.state.formInputs.projectReleasingLabel}
                                    onChange={this.handleChange}
                                >
                                    <option value="0" selected>User Primary Label (Default)</option>
                                    <option value="1">User Label Option 2</option>
                                    <option value="2">User Label Option 3</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release TBD</Form.Label>
                                <Form.Control 
                                    id='projectReleaseDateTBD' 
                                    className='form-control' 
                                    type='checkbox' 
                                    value={this.state.formInputs.projectReleaseDateTBD}
                                    onChange={this.handleChange}
                                />
                            
                                <Form.Label className="col-form-label col-3">Release Date<span className="required-ind">*</span></Form.Label>
                                    <input 
                                        id="projectReleaseDate" 
                                        className='form-control col-3' 
                                        type='date' 
                                        value={this.state.formInputs.projectReleaseDate}
                                        onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </div>

                        <Form.Group className="form-group col-4 cover-art">
                            <Form.Label className="col-form-label col-3">Cover Art</Form.Label>
                            <div id="droppable" className="form-control album-art-drop col-8"></div>
                        </Form.Group>

                        <Form.Group className='form-group col-12 notes-row'>
                            <Form.Label>Notes</Form.Label>
                            <br />
                            <Form.Control 
                                id="projectNotes" 
                                className='' 
                                as='textarea' 
                                rows='3' 
                                value={this.state.formInputs.projectNotes}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
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

export default ReleaseinformationPage;