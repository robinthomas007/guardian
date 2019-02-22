import React, { Component } from 'react';

const GetPageProjectStatus= (props) => {
    return(
        <span className="project-right">
            <span className="project-status">
                <label>STATUS:</label>#PROJECT STATUS#
            </span>
            <button className="close-project btn" onClick="location.href = 'project-search.html'">Close Project</button>
        </span>
    )
};

const ProjectContactsPage= (props) => {
    return(
        <section className="page-container h-100">
            <div className="row">
                <div className="col 4">
                    <h1>#Project Title#</h1>
                </div>
                <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
            </div>

            <h2>Step <span className="count-circle">2</span> Project Contacts</h2>

            <p>In this step, you can choose which contacts will be associated with the project that has recently been created. You can select the level of project security (i.e., who will be able to see the project) and who should be contacted regarding this project if necessary. Required fields are indicated with an <span className="required-ind">*</span>.</p>

            <br />
            
            <form>
                <section className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label className="col-form-label col-2" for="projectTitle">Project Security <span className="required-ind">*</span></label>
                            <div className="dropdown col-9">
                                <button type="button" id="projectSecurityDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
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
                            <input type="email" className="form-control col-5" id="primaryEmail" placeholder="#Users Email Default#" />>
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
                        <button type="button" className="btn btn-primary" onClick="location.href = 'audio-files.html'">Save &amp; Continue</button>
                    </div>
                </section>
            </form>
        </section>
    )
};

const NewProjectPage= (props) => {
    return(
        <section className="page-container h-100">
            <div className="row">
                <div className="col 4">
                    <h1>New Project</h1>
                </div>
                <div className="col-7">
                    <GetPageProjectStatus />
                </div>
            </div>
            <h2>Step <span className="count-circle">1</span> Release Information</h2>
            <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
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
                            <button type="button" id="labelDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">Label 1 (Default)</button>
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
                        <button type="button" className="btn btn-primary" onClick="location.href = 'project-contacts.html'">Save &amp; Continue</button>
                    </div>
                </section>
            </form>
        </section>
    )
};

const ReleaseinformationPage= (props) => {
    return(
        <section className="page-container h-100">
            <div className="row">
                <div className="col 4">
                    <h1>Release Information</h1>
                </div>
                
                <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
            </div>

            <h2>Step <span className="count-circle">1</span> Release Information</h2>
            <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>

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
                        <button type="button" className="btn btn-primary" onClick="location.href = 'project-contacts.html'">Save &amp; Continue</button>
                    </div>
                </section>
            </form>
        </section>
    )
};

const AudioFilesPage = (props) => {

    console.log('AudioFilesPage: ' + props.key)
    
    return(
        <section className="page-container h-100">
            <div className="row">
                <div className="col 4">
                    <h1>#Project Title#</h1>
                </div>
                <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
            </div>
            
            <h2>Step <span className="count-circle">3</span> Audio Files</h2>
            
            <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
            
            <form>
                <section className="row">
                    <div className="form-group col-12">
                        <label>Drag &amp; Drop Audio Files Below</label>

                        <div className="form-control audio-drop-area col-12"></div>
                    </div>
                </section>
            </form>

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Disc 1</a>
                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"> + Add A Disc</a>
                </div>
            </nav>
            
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="centered">#</th>
                            <th>Audio File</th>
                            <th>ISRC <i><span className="required-ind">(Required)</span></i></th>
                            <th>Track Title</th>
                            <th className="centered">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="centered">1</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 1</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 1</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">2</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 2</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 2</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">3</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 3</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 3</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">4</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 4</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 4</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">5</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 5</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 5</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">6</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 6</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 6</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">7</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 7</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 7</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">8</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 8</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 8</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">9</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 9</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 9</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="centered">10</td>
                            <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>Sample Track Name 10</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 10</td>
                            <td className="centered">
                                <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                                <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
        </div>
        
        <section className="row no-gutters save-buttons">
            <div className="col-9"></div>
            <div className="col-3">
                <button type="button" className="btn btn-secondary">Save</button>
                <button type="button" className="btn btn-primary">Save &amp; Continue</button>
            </div>
        </section>
    </section>

    )
};

const TrackInformationPage = (props) => {
    return(
        <section className="page-container h-100">
           <section className="row">
              <div className="col 4">
                 <h1>#Project Title#</h1>
              </div>
              <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
           </section>
           <h2>Step <span className="count-circle">4</span> Track Information</h2>
           <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
           <table className="table">
              <thead>
                 <tr>
                    <th className="td-2 centered">#</th>
                    <th className="td-2"></th>
                    <th className="td-5"></th>
                    <th className="td-30">ISRC <i>(Optional)</i></th>
                    <th className="td-30">Track Title</th>
                    <th className="td-10 centered">Single</th>
                    <th className="td-10 centered">Release Date</th>
                    <th className="td-10 centered">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />>
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
                 <tr>
                    <td className="centered">1</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>01234578910</td>
                    <td>Sample Track Title 1</td>
                    <td className="centered">
                       <label className="custom-checkbox">
                       <input type="checkbox" />
                       <span className="checkmark"></span>
                       </label>
                    </td>
                    <td className="centered"></td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                       <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                 </tr>
              </tbody>
           </table>
        </section>
    )
};

const TerritorialRightsPage = (props) => {
    return(
        <section className="page-container h-100">
            <div className="row">
                <div className="col 5">
                    <h1>#Project Title#</h1>
                </div>
                <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
            </div>
            <div className="row no-gutters step-description">
                <div className="col-12">
                    <h2>Step 
                        <span className="count-circle">5</span> Territorial Rights
                    </h2>
                    <p>In this step, you can set the territorial/geographic rights for each track in the project. Tracks with no specified territories will be claimed worldwide. You can either drag &amp; drop tracks         from the list or select tracks from the "Tracks with this Rights Set" dropdown before assigning rights. The section must be completed by selecting the "Save &amp; Continue" button below.</p>
                </div>
            </div>
            <div className="row no-gutters align-items-center">
                <div className="col-3">
                    <h3>Tracks With No Rights Applied</h3>
                </div>
                <div className="col-9">
                    <div className="row no-gutters align-items-center card-nav">
                        <div className="col-4">
                            <span className="drag-drop-arrow float-left">
                                <span nowrap>Drag Audio Files To The Rights Set</span>
                            </span>
                        </div>
                        <div className="col-8">
                            <button className="btn btn-primary">Create a New Rights Set</button>
                            <div className="dropdown">
                                <button type="button" id="selectRightsDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Select a Saved Rights Set
                            </button>
                                <div className="dropdown-menu" aria-labelledby="selectRightsDropdown">
                                    <a className="dropdown-item" href="#">Saved Rights Set 1</a>
                                    <a className="dropdown-item" href="#">Saved Rights Set 2</a>
                                    <a className="dropdown-item" href="#">Saved Rights Set 3</a>
                                    <a className="dropdown-item" href="#">Saved Rights Set 4</a>
                                    <a className="dropdown-item" href="#">Saved Rights Set 5</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className="track-draggable-area">
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 1
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 2
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 3
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 4
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 5
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 6
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 7
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 8
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 9
                        </div>
                        <div className="draggable-track">
                            <i className="material-icons">dehaze</i> Sample Track Name 10
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="set-card">
                        <div className="row no-gutters">
                            <div className="col-12">
                                <h3>Territorial Rights Set 1 
                                    <i className="material-icons" data-toggle="tooltip" title="Edit Rights Set Name">edit</i>
                                </h3>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <table className="table">
                                <tr className="row no-gutters">
                                    <th className="col-4" nowrap>Tracks with this Rights Set</th>
                                    <th className="col-4" nowrap>Has Rights In</th>
                                    <th className="col-4" nowrap>Does Not Have Rights In</th>
                                </tr>
                                <tr className="row no-gutters">
                                    <td className="col-4">
                                        <div className="dropdown">
                                            <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Select Tracks or Drag Below
                            </button>
                                            <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Track 1</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Track 2</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Track 3</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Track 4</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Track 5</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="track-draggable-area territory-tracks"></div>
                                    </td>
                                    <td className="col-4">
                                        <div className="dropdown">
                                            <button type="button" id="includedCountriesDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Select Countries
                            </button>
                                            <ul className="dropdown-menu countries" aria-labelledby="includedCountriesDropdown">
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 1</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 2</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 3</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 4</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 5</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td className="col-4">
                                        <div className="dropdown">
                                            <button type="button" id="excludedCountriesDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Select Countries
                            </button>
                                            <ul className="dropdown-menu countries" aria-labelledby="excludedCountriesDropdown">
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 1</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 2</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 3</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 4</span>
                                                </li>
                                                <li>
                                                    <label className="dropdown-item custom-checkbox">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <span>Country 5</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};


const BlockingPoliciesPage = (props) => {
    return(
            <section className="page-container h-100">
                <div className="row">
                    <div className="col 5">
                        <h1>#Project Title#</h1>
                    </div>
                    <div className="col-7">
                    <GetPageProjectStatus />
                </div> 
                </div>
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step 
                            <span className="count-circle">6</span> Post-Release UGC Blocking 
                            <span className="option-text">(Optional)</span>
                        </h2>
                        <p>In this optional step, you can choose to block content after commericial release until the desired date. UMG's default policy is to monetize content on licensed platforms upon commercial release. Here you can create a post-release block policy set then drag &amp; drop titles to assign specific tracks to that policy.</p>
                        <p>
                *Any post-release policies created here will require review and will not be complete until approval is granted. 
                            <br />
                *Confirmation of approval will arrive via email.
                
                        </p>
                    </div>
                </div>
                <div className="row no-gutters align-items-center">
                    <div className="col-3">
                        <h2>Tracks With No Set Policy</h2>
                    </div>
                    <div className="col-9">
                        <div className="row no-gutters align-items-center card-nav">
                            <div className="col-4">
                                <span className="drag-drop-arrow float-left">
                                    <span>Drag Audio Files To The Policy Set</span>
                                </span>
                            </div>
                            <div className="col-8">
                                <button className="btn btn-primary">Create a New Blocking Policy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="track-draggable-area">
                            <div className="draggable-track">Sample Track Name 1</div>
                            <div className="draggable-track">Sample Track Name 2</div>
                            <div className="draggable-track">Sample Track Name 3</div>
                            <div className="draggable-track">Sample Track Name 4</div>
                            <div className="draggable-track">Sample Track Name 5</div>
                            <div className="draggable-track">Sample Track Name 6</div>
                            <div className="draggable-track">Sample Track Name 7</div>
                            <div className="draggable-track">Sample Track Name 8</div>
                            <div className="draggable-track">Sample Track Name 9</div>
                            <div className="draggable-track">Sample Track Name 10</div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="set-card">
                            <div className="row">
                                <div className="col-8">
                                    <h3>Blocking Policy Set 1 </h3>
                                </div>
                                <div className="col-2"></div>
                                <div className="col-2"></div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <table>
                                        <tr className="row no-gutters">
                                            <th nowrap>Tracks to Block</th>
                                        </tr>
                                        <tr>
                                            <td nowrap>
                                                <div className="dropdown">
                                                    <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                    Select Tracks or Drag Below
                                </button>
                                                    <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                        <li>
                                                            <label className="dropdown-item custom-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <span>Track 1</span>
                                                        </li>
                                                        <li>
                                                            <label className="dropdown-item custom-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <span>Track 2</span>
                                                        </li>
                                                        <li>
                                                            <label className="dropdown-item custom-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <span>Track 3</span>
                                                        </li>
                                                        <li>
                                                            <label className="dropdown-item custom-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <span>Track 4</span>
                                                        </li>
                                                        <li>
                                                            <label className="dropdown-item custom-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <span>Track 5</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="track-draggable-area territory-tracks"></div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-8">
                                    <table className="table">
                                        <tr className="row no-gutters">
                                            <th className="col-4 " nowrap>Site</th>
                                            <th className="col-2 centered" nowrap>Monetize</th>
                                            <th className="col-2 centered" nowrap>Block</th>
                                            <th className="col-2 centered" nowrap>Duration</th>
                                            <th className="col-2 centered" nowrap>Block Until</th>
                                        </tr>
                                        <tr className="row no-gutters">
                                            <td className="col-4 centered align-self-center" nowrap>
                                                <span className="platform-sprite youtube"></span>
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                                        </tr>
                                        <tr className="row no-gutters">
                                            <td className="col-4 centered align-self-center" nowrap>
                                                <span className="platform-sprite soundcloud"></span>
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                                        </tr>
                                        <tr className="row no-gutters">
                                            <td className="col-4 centered align-self-center" nowrap>
                                                <span className="platform-sprite facebook"></span>
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                                        </tr>
                                        <tr className="row no-gutters">
                                            <td className="col-4 centered align-self-center" nowrap>
                                                <span className="platform-sprite instagram"></span>
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                                        </tr>
                                        <tr className="row no-gutters">
                                            <td className="col-4 centered align-self-center" nowrap>
                                                <span className="platform-sprite twitter"></span>
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>
                                                <input type="radio" />
                                            </td>
                                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
};

export {NewProjectPage, ReleaseinformationPage, AudioFilesPage, ProjectContactsPage, TrackInformationPage, TerritorialRightsPage, BlockingPoliciesPage};
