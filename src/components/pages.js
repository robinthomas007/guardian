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

class NewProjectPage extends Component {

    constructor(props) {
        super(props);

        console.log(props)
    }


    render() {
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
                            <input type="date" className="form-control nested" />>
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
    }


};

class ReleaseinformationPage extends Component {

    constructor(props) {
        super(props);

        console.log(props.location)
    }

    render() {
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
                                <input type="text" className="form-control col-8" id="projectTitle" placeholder="Enter a Project Title" />>
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
    }
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
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">9</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 9</span></div></td>
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

export {NewProjectPage, ReleaseinformationPage, AudioFilesPage};
