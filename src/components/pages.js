import React from "react";

const getPageProjectStatus= () => {
    return(
        <span class="project-right">
            <span class="project-status">
                <label>STATUS:</label>#PROJECT STATUS#
            </span>
            <button class="close-project btn" onClick="location.href = 'project-search.html'">Close Project</button>
        </span>
    )
};

const NewProjectPage = () => {

    console.log(1)

    return(
        <section class="page-container h-100">
            <div class="row">
                <div class="col 4">
                    <h1>New Project</h1>
                </div>
                <div class="col-7">
                    <getPageProjectStatus />
                </div>
            </div>
            <h2>Step <span class="count-circle">1</span> Release Information</h2>
            <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>
            <form>
                <section class="row">
                    <div class="col-8">
                        <div class="form-group">
                            <label class="col-form-label col-3" for="projectTitle">Project Title</label>
                            <input type="text" class="form-control col-8" id="projectTitle" placeholder="Enter a Project Title" />
                        </div>
                    
                        <div class="form-group">
                            <label class="col-form-label col-3" for="artistName">Artist</label>
                            <input type="text" class="form-control col-8" id="artistName" placeholder="Enter an Artist's Name" />
                        </div>
                        <div class="form-group">
                            <label class="col-form-label col-3">Project Type <span class="required-ind">*</span></label>
                            <div class="dropdown col-8">
                                <button type="button" id="projectDropdown" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                    Private (Default)
                                </button>
                                <div class="dropdown-menu" aria-labelledby="projectDropdown">
                                    <a class="dropdown-item" href="#">Private (Default)</a>
                                    <a class="dropdown-item" href="#">Public</a>
                                </div>
                            </div>
                        </div>
                        <label class="col-form-label col-3">Releasing Label <span class="required-ind">*</span></label>
                        <div class="dropdown col-3">
                            <button type="button" id="labelDropdown" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">Label 1 (Default)</button>
                            <div class="dropdown-menu" aria-labelledby="labelDropdown">
                                <a class="dropdown-item" href="#">Label Option 2</a>
                                <a class="dropdown-item" href="#">Label Option 3</a>
                            </div>
                        </div>
                        <label class="col-form-label nested">Release Date <span class="required-ind">*</span></label>
                        <input type="date" class="form-control nested" />>
                    </div>

                    <div class="form-group col-4 cover-art">
                        <label class="col-form-label col-3">Cover Art</label>
                        <div id="droppable" class="form-control album-art-drop col-8"></div>
                    </div>

                    <div class="form-group col-12 notes-row">
                        <label class="col-form-label">Notes</label>
                        <br />
                        <textarea class="form-control"></textarea>
                    </div>
                </section>

                <section class="row save-buttons">
                    <div class="col-9"></div>
                    <div class="col-3">
                        <button type="button" class="btn btn-secondary">Save</button>
                        <button type="button" class="btn btn-primary" onClick="location.href = 'project-contacts.html'">Save &amp; Continue</button>
                    </div>
                </section>
            </form>
        </section>
    )
};

const ReleaseinformationPage = () => {
    return(
        <section class="page-container h-100">
            <div class="row">
                <div class="col 4">
                    <h1>Release Information</h1>
                </div>
                
                <div class="col-7">
                    <getPageProjectStatus />
                </div> 
            </div>

            <h2>Step <span class="count-circle">1</span> Release Information</h2>
            <p>In this step, you can create a new project by submitting basic release information for the system. Required fields are indicated with an *. This section must be completed by selecting the 'Save &amp; Continue' button below.</p>

            <form>
                <section class="row">
                    <div class="col-8">
                        <div class="form-group">
                            <label class="col-form-label col-3" for="projectTitle">Project Title</label>
                            <input type="text" class="form-control col-8" id="projectTitle" placeholder="Enter a Project Title" />>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label col-3" for="artistName">Artist</label>
                            <input type="text" class="form-control col-8" id="artistName" placeholder="Enter an Artist's Name" />
                        </div>
                        <div class="form-group">
                            <label class="col-form-label col-3">Project Type <span class="required-ind">*</span></label>
                        <div class="dropdown col-8">
                            <button type="button" id="projectDropdown" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Private (Default)
                            </button>
                            <div class="dropdown-menu" aria-labelledby="projectDropdown">
                                <a class="dropdown-item" href="#">Private (Default)</a>
                                <a class="dropdown-item" href="#">Public</a>
                            </div>
                        </div>
                        </div>
                    
                        <label class="col-form-label col-3">Releasing Label <span class="required-ind">*</span></label>
                        <div class="dropdown col-3">
                            <button type="button" id="labelDropdown" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                Label 1 (Default)
                            </button>
                            <div class="dropdown-menu" aria-labelledby="labelDropdown">
                                <a class="dropdown-item" href="#">Label Option 2</a>
                                <a class="dropdown-item" href="#">Label Option 3</a>
                            </div>
                        </div>		
                            <label class="col-form-label nested">Release Date <span class="required-ind">*</span></label>
                            <input type="date" class="form-control nested" />	
                        </div>
                    <div class="form-group col-4 cover-art">
                        <label class="col-form-label col-3">Cover Art</label>
                        <div id="droppable" class="form-control album-art-drop col-8"></div>
                    </div>
                    <div class="form-group col-12 notes-row">
                        <label class="col-form-label">Notes</label>	
                            <br />
                        <textarea class="form-control"></textarea>
                    </div>
                </section>
                <section class="row save-buttons">
                    <div class="col-9"></div>
                    <div class="col-3">
                        <button type="button" class="btn btn-secondary">Save</button>
                        <button type="button" class="btn btn-primary" onClick="location.href = 'project-contacts.html'">Save &amp; Continue</button>
                    </div>
                </section>
            </form>
        </section>
    )
};

const AudioFilesPage = () => {
    return(
        <section class="page-container h-100">
            <div class="row">
                <div class="col 4">
                    <h1>#Project Title#</h1>
                </div>
                <div class="col-7">
                    <getPageProjectStatus />
                </div> 
            </div>
            
            <h2>Step <span class="count-circle">3</span> Audio Files</h2>
            
            <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
            
            <form>
                <section class="row">
                    <div class="form-group col-12">
                        <label>Drag &amp; Drop Audio Files Below</label>

                        <div class="form-control audio-drop-area col-12"></div>
                    </div>
                </section>
            </form>

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Disc 1</a>
                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"> + Add A Disc</a>
                </div>
            </nav>
            
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="centered">#</th>
                            <th>Audio File</th>
                            <th>ISRC <i><span class="required-ind">(Required)</span></i></th>
                            <th>Track Title</th>
                            <th class="centered">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="centered">1</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 1</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 1</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">2</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 2</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 2</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">3</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 3</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 3</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">4</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 4</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 4</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">5</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 5</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 5</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">6</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 6</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 6</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">7</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 7</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 7</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">8</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 8</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 8</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">9</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 9</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 9</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="centered">10</td>
                            <td><div class="sortable-audio-file"><i class="material-icons">format_line_spacing</i><span>Sample Track Name 10</span></div></td>
                            <td>01234578910</td>
                            <td>Sample Track Title 10</td>
                            <td class="centered">
                                <button class="btn btn-secondary action"><i class="material-icons">refresh</i></button>
                                <button class="btn btn-secondary action"><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
        </div>
        
        <section class="row no-gutters save-buttons">
            <div class="col-9"></div>
            <div class="col-3">
                <button type="button" class="btn btn-secondary">Save</button>
                <button type="button" class="btn btn-primary">Save &amp; Continue</button>
            </div>
        </section>
    </section>

    )
};

export {NewProjectPage, ReleaseinformationPage, AudioFilesPage};
