import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader';
import Notification from '../notifications/notifications';


class ReleaseInformationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A project title was submitted: ' + this.state.value);
        event.preventDefault();
    }
}


const mockData = require('../../mockData.json');


class ReleaseinformationPage extends Component {
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
            alert('Save and Continue')
        }

        return (
            <section className="page-container h-100">


                <PageHeader />

                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">1</span> Release Information</h2>
                        <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>

               <Form>
                    <div className="row">
                        <div className="col-8">
                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Project Title<span className="required-ind">*</span></Form.Label>
                                <Form.Control id='projectTitle' className='form-control col-8' type='text' placeholder='Enter a project title' value={this.state.value}
                                    onChange={this.handleChange}></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Artist<span className="required-ind">*</span></Form.Label>
                                <Form.Control id='artistName' className='form-control col-8' type='text' placeholder='Enter an artist name' value={this.state.value}
                                    onChange={this.handleChange}></Form.Control>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label className='col-form-label col-3'>Project Type<span className="required-ind">*</span></Form.Label>
                                <Form.Control id="projectTypedropdown" as="select" className='col-form-label dropdown col-3' value={this.state.value}
                                    onChange={this.handleChange}>
                                    <option selected>Album (Default)</option>
                                    <option>Collection</option>
                                    <option>Single</option>
                                </Form.Control>
                            </Form.Group>

                              <Form.Group>
                                <Form.Label className='col-form-label col-3'>Releasing Label<span className="required-ind">*</span></Form.Label>
                                    <Form.Control id="releasingLabeldropdown" as="select" className='col-form-label dropdown col-3' value={this.state.value}
                                    onChange={this.handleChange}>
                                    <option selected>User Primary Label (Default)</option>
                                    <option>User Label Option 2</option>
                                    <option>User Label Option 3</option>
                                    </Form.Control>
                                </Form.Group>

                            <Form.Group>
                                <Form.Label className="col-form-label col-3">Release TBD</Form.Label>
                                <Form.Control id='releaseDatetbd' className='form-control' type='checkbox' checked value={this.state.value} onChange={this.handleChange}></Form.Control>
                            
                                <Form.Label className="col-form-label col-3">Release Date<span className="required-ind">*</span></Form.Label>
                                <input className='form-control col-3' type='date' value={this.state.value} onChange={this.handleChange}></input>
                            </Form.Group>
                            </div>

                            <Form.Group className="form-group col-4 cover-art">
                                <Form.Label className="col-form-label col-3">Cover Art</Form.Label>
                                <div id="droppable" className="form-control album-art-drop col-8"></div>
                            </Form.Group>

                            <Form.Group className='form-group col-12 notes-row'>
                                <Form.Label>Notes</Form.Label>
                                <br />
                                <Form.Control className='' as='textarea' rows='3' value={this.state.value} onChange={this.handleChange}></Form.Control>
                            </Form.Group>

                        
                    </div>
                    <section className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <Notification />
                        </div>
                    </section>
                </Form> 

{/* 
                <form onSubmit={this.handleSubmit}>
                    <section className="row">
                        <div className="col-8">
                            <div className="form-group">
                                <label className="col-form-label col-3" htmlFor="projectTitle">Project Title<span className="required-ind">*</span></label>
                                <input
                                    type="text"
                                    className="form-control col-8"
                                    id="projectTitle"
                                    placeholder="Enter a Project Title"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label col-3" htmlFor="artistName">Artist<span className="required-ind">*</span></label>
                                <input
                                    type="text"
                                    className="form-control col-8"
                                    id="artistName"
                                    placeholder="Enter an Artist's Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label col-3">Project Type <span className="required-ind">*</span></label>
                                <div className="dropdown col-8">


                                    <button type="button" id="projectDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Private (Default)
                                </button>
                                    <div className="dropdown-menu" aria-labelledby="projectDropdown">
                                        <a className="dropdown-item" href="#">Private (Default)</a>
                                        <a className="dropdown-item" href="#">Public</a>
                                    </div>
                                </div>
                            </div>

                            <label className="col-form-label col-3">Releasing Label <span className="required-ind">*</span></label>
                            <div className="dropdown col-3">
                                <button type="button" id="labelDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Label 1 (Default)
                            </button>
                                <div className="dropdown-menu" aria-labelledby="labelDropdown">
                                    <a className="dropdown-item" href="#">Label Option 2</a>
                                    <a className="dropdown-item" href="#">Label Option 3</a>
                                </div>
                            </div>
                            <label className="col-form-label nested">Release Date <span className="required-ind">*</span></label>
                            <input type="date" className="form-control nested" />
                        </div>
                        <div className="form-group col-4 cover-art">
                            <label className="col-form-label col-3">Cover Art</label>
                            <div id="droppable" className="form-control album-art-drop col-8"></div>
                        </div>
                        <div className="form-group col-12 notes-row">
                            <label className="col-form-label">Notes</label>
                            <br />
                            <textarea className="form-control"></textarea>
                        </div>
                    </section>
                    <section className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="button" className="btn btn-secondary">Save</button>
                            <Notification />
                        </div>
                    </section>
                </form>
                 */}
            </section>
           
        )
    }
};

export default ReleaseinformationPage;