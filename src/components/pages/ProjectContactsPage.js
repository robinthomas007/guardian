import React, { Component } from 'react';
import PageHeader from '../PageHeader';

class ProjectContactsPage extends Component {

    constructor() {

        super();

        this.state = {
            projectTitle: ''
        }
    }

    handleChange = (event) => {
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
    
                <form>
                    <section className="row">
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
                    </section>
                    
                    <section className="row additional-contacts">	
                        <div className="form-group col-2">
                            <label className="col-form-label">Additional Contacts</label>
                        </div>
                        <div className="form-group col-10">
                            <textarea className="form-control"></textarea>
                        </div>
                    </section>
                
                    <section className="row save-buttons">
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button type="button" className="btn btn-secondary">Save</button>
                            <button type="button" className="btn btn-primary" onClick={saveAndContinue}>Save &amp; Continue</button>
                        </div>
                    </section>
                </form>
            </section>
        )
    }
};

export default ProjectContactsPage;