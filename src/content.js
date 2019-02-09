import React from 'react';

const Content = () => {
    return(
		<section class="content col-10">

            <nav class="top-nav int">
				<ul>
					<li><a class="help" href="help-guide.html">Help Guide</a></li>
					<li>Welcome, #User First &amp; Last Name#</li>
					<li><a href="index.html">Log Out</a></li>
				</ul>
			</nav>
			<section class="page-container h-100">
				<div class="row">
					<div class="col 4">
						<h1>New Project</h1>
					</div>
					<div class="col-7">
						<span class="project-right">
							<span class="project-status">
								<label>STATUS:</label>
								#PROJECT STATUS#
							</span>
							<button class="close-project btn" onClick="location.href = 'project-search.html'">Close Project</button>
						</span>
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
        </section>
    )
}

export default Content;