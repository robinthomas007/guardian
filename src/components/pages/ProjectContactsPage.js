import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader';

class ProjectContactsPage extends Component {
    constructor() {

        super();

        this.state = {
            projectTitle: ''
        }
    }

    handleChange = (event) => {

        {/* 
        this is dynamically changing / adding to the state whenever the inputs are updated
         - it also uses their id as the state attribute so this.state.x = the current value of the input named x
     */}
        const eventTarget = event.target.id;
        this.setState(
            { eventTarget: event.target.value }
        )

        console.log(this.state.eventTarget)
        }
    
    render() {

        const saveAndContinue = () => {
            alert('Save Contacts and Continue')
        }

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
                    <Form.Control id='projectSecuritydropdown' as='select' className='col-form-label dropdown col-2' value={this.state.value} onChange={this.handleChange}>
                        <option selected>Private (Viewable By You)</option>
                        <option>Public (Viewable By All Label Users)</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label className='col-form-label col-2'>Primary Contact <span className='required-ind'>*</span></Form.Label>
                    <Form.Control className='form-control col-5'  id='primaryContact' value={this.state.value} onChange={this.handleChange} ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label className='col-form-label col-2'>Primary Contact Email<span className='required-ind'>*</span></Form.Label>
                    <Form.Control className='form-control col-5'  id='primaryContactemail' value={this.state.value} onChange={this.handleChange} ></Form.Control>
                </Form.Group>

                <div className='row additional-contacts'>
                <Form.Group className="form-group col-2">
                    <Form.Label>Addtional Contacts</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group col-10">
                     <Form.Control className='' as='textarea' rows='5' value={this.state.value} onChange={this.handleChange}></Form.Control>
                 </Form.Group>
                    </div>
                </div>
            </div>
            <div className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="button" className="btn btn-secondary">Save</button>
                            <button type="button" className="btn btn-primary" onClick={saveAndContinue}>Save &amp; Continue</button>
                        </div>
                    </div>
            </Form>





{/*

                <form>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label className="col-form-label col-2" htmlFor="projectTitle">Project Security <span className="required-ind">*</span></label>
                                <div className="dropdown col-9">
                                    <button type="button" id="projectSecurityDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Private (Viewable on by you)
                                    </button>
                                
                                    <div className="dropdown-menu" aria-labelledby="projectSecurityDropdown">
                                        <a className="dropdown-item" href="#">Private (Viewable on by you)</a>
                                        <a className="dropdown-item" href="#">Public (Viewable by all label members)</a>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-group">
                                <label className="col-form-label col-2">Primary Contact <span className="required-ind">*</span></label>
                                <input type="text" className="form-control col-5" id="primaryContact" placeholder="#Users First &amp; Last Name#" />
                            </div>
                        
                            <div className="form-group">
                                <label className="col-form-label col-2">Primary Contact Email <span className="required-ind">*</span></label>
                                <input type="email" className="form-control col-5" id="primaryEmail" placeholder="#Users Email Default#" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="row additional-contacts">	
                        <div className="form-group col-2">
                            <label className="col-form-label">Additional Contacts</label>
                        </div>
                        <div className="form-group col-10">
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>
                
                    <div className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="button" className="btn btn-secondary">Save</button>
                            <button type="button" className="btn btn-primary" onClick={saveAndContinue}>Save &amp; Continue</button>
                        </div>
                    </div>
                </form>
                 */}
            </section>
        )
    }
};

export default ProjectContactsPage;