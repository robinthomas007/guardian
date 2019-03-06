import React, { Component } from 'react';
import PageHeader from '../PageHeader';

const mockData = require('../../mockData.json');

class ReleaseinformationPage extends Component {

    render() {
        const saveAndContinue = () => {
            alert('Save and Continue')
        }

        return(
            <section className="page-container h-100">
    
                <PageHeader />
    
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">1</span> Release Information</h2>
                        <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>
    
                <form>
                    <section className="row">
                        <div className="col-8">
                            <div className="form-group">
                                <label className="col-form-label col-3" htmlFor="projectTitle">Project Title</label>
                                <input type="text" className="form-control col-8" id="projectTitle" placeholder="Enter a Project Title" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label col-3" htmlFor="artistName">Artist</label>
                                <input type="text" className="form-control col-8" id="artistName" placeholder="Enter an Artist's Name" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label col-3">Project Type <span className="required-ind">*</span></label>
                            <div className="dropdown col-8">
                                <button type="button" id="projectDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
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
                                <button type="button" id="labelDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
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
                            <button type="button" className="btn btn-primary" onClick={saveAndContinue}>Save &amp; Continue</button>
                        </div>
                    </section>
                </form>
            </section>
        )
    }
};

export default ReleaseinformationPage;