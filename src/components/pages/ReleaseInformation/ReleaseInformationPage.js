import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader'; 
import './ReleaseInformation.css';


const mockData = require('../../../mockData.json');

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
        console.log(localStorage.getItem('projectData'))

        this.props.history.push('/projectContacts')
    };



    render() {

        const user = JSON.parse(sessionStorage.getItem('user'))
        
        console.log("user")
        console.log(user)

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
                                <Form.Control 
                                    id="projectType" 
                                    as="select" 
                                    className='col-form-label dropdown col-3' 
                                    value={this.state.formInputs.projectType}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">Album (Default)</option>
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
                                    <option value="114">Universal Music</option>
                                    <option value="3">Abbey Audio</option>
                                    <option value="1">A&M</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release Date<span className="required-ind">*</span></Form.Label>
                                    <input 
                                        id="projectReleaseDate" 
                                        className='form-control col-3' 
                                        type='date' 
                                        value={this.state.formInputs.projectReleaseDate}
                                        onChange={this.handleChange}
                                    />

                                <Form.Label className="col-form-label col-2 tbd">Release TBD</Form.Label>
                                <label className="custom-checkbox"> 		
                                    <input id='projectReleaseDateTBD' 
                                        className='form-control col-3' 
                                        type='checkbox' 
                                        value={this.state.formInputs.projectReleaseDateTBD}
                                        onChange={this.handleChange}
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

export default ReleaseinformationPage;