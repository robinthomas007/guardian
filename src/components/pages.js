import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import LeftNav from './leftNav';
import Login from './Login';
import ButtonDropDown from './ButtonDropDown';

const GetPageProjectStatus= (props) => {

    const closeProject = () => {
        alert('Close Project');
    }
    
    return(
        <span className="project-right">
            <span className="project-status">
                <label>STATUS:</label>#PROJECT STATUS#
            </span>
            <button 
                className="close-project btn" 
                onClick={closeProject}
            >Close Project</button>
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
    const audioFilesMockData = {
        headers : [
            
        ],

        disc1 : {
            tracks : [
                {
                    trackSequence : 1,
                    trackAudioFile : 'Sample Track Name 1',
                    trackISRC : '012345678910',
                    trackTitle : 'Sample Track Title 1'
                },
                {
                    trackSequence : 2,
                    trackAudioFile : 'Sample Track Name 2',
                    trackISRC : '012345678910',
                    trackTitle : 'Sample Track Title 2'
                },
                {
                    trackSequence : 3,
                    trackAudioFile : 'Sample Track Name 3',
                    trackISRC : '012345678910',
                    trackTitle : 'Sample Track Title 3'
                },
                {
                    trackSequence : 4,
                    trackAudioFile : 'Sample Track Name 4',
                    trackISRC : '012345678910',
                    trackTitle : 'Sample Track Title 4'
                },
                {
                    trackSequence : 5,
                    trackAudioFile : 'Sample Track Name 5',
                    trackISRC : '012345678910',
                    trackTitle : 'Sample Track Title 5'
                }
            ]
        }
    }

    class AudioVideoDataTable extends Component {

        render() {

            const AudioVideoDataHeader = () => {

                return(
                    <thead>
                        <tr>
                            <th className="centered">#</th>
                            <th>Audio File</th>
                            <th>ISRC <i><span className="required-ind">(Required)</span></i></th>
                            <th>Track Title</th>
                            <th className="centered">Actions</th>
                        </tr>
                    </thead>
                )
            }

            const dataRows = audioFilesMockData.disc1.tracks.map( (track) => 
                <tr>
                    <td className="centered">{track.trackSequence}</td>
                    <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>{track.trackAudioFile}</span></div></td>
                    <td>{track.trackISRC}</td>
                    <td>{track.trackTitle}</td>
                    <td className="centered">
                       <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                        <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                </tr>
           )

            return (
                <table className="table">
                    <AudioVideoDataHeader />
                    <tbody>
                        {dataRows}
                    </tbody>
                </table>
            )
        }
    }

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

                <AudioVideoDataTable />
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

    const TrackInformationMockData = {
        tracks : [
            {
                trackSequence : 1,
                trackAudioFile : 'Sample Track Name 1',
                trackISRC : '012345678910',
                trackTitle : 'Sample Track Title 1',
                trackSingle: false,
                trackReleaseDate: '',
            },
            {
                trackSequence : 2,
                trackAudioFile : 'Sample Track Name 2',
                trackISRC : '012345678910',
                trackTitle : 'Sample Track Title 2',
                trackSingle : false,
                trackReleaseDate : ''
            },
            {
                trackSequence : 3,
                trackAudioFile : 'Sample Track Name 3',
                trackISRC : '012345678910',
                trackTitle : 'Sample Track Title 3',
                trackSingle : false,
                trackReleaseDate : ''
            },
            {
                trackSequence : 4,
                trackAudioFile : 'Sample Track Name 4',
                trackISRC : '012345678910',
                trackTitle : 'Sample Track Title 4',
                trackSingle : false,
                trackReleaseDate : ''
            }
        ]
    }

    class TrackInformationDataTable extends Component {

        render() {

            const TrackInformationDataHeader = () => {

                return(
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
                )
            }

            const dataRows = TrackInformationMockData.tracks.map( (track) => 
                <tr>
                    <td className="centered">{track.trackSequence}</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>{track.trackISRC}</td>
                    <td>{track.trackTitle}</td>
                    <td className="centered">
                        <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </td>
                    <td className="centered">{track.trackReleaseDate}</td>
                    <td className="centered">
                        <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                        <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                </tr>
           )

            return (
                <table className="table">
                    <TrackInformationDataHeader />
                    <tbody>
                        {dataRows}
                    </tbody>
                </table>
            )
        }
    }

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

            <TrackInformationDataTable />
        </section>
    )
};

const TerritorialRightsPage = (props) => {

    
    const TerritorialRightsMockData = {
        tracks : [
            {
                trackAudioFile : 'Sample Track Name 1',
                trackISRC : '012345678910',
            },
            {
                trackAudioFile : 'Sample Track Name 2',
                trackISRC : '012345678910',
            },
            {
                trackAudioFile : 'Sample Track Name 3',
                trackISRC : '012345678910',
            },
            {
                trackAudioFile : 'Sample Track Name 4',
                trackISRC : '012345678910',
            }
        ], 

        countriesWithRights : [
            {
                countryName: 'Country 1',
                countryID: 'C1'
            },
            {
                countryName: 'Country 2',
                countryID: 'C2'
            },
            {
                countryName: 'Country 3',
                countryID: 'C3'
            }
        ], 

        countriesWithOutRights : [
            {
                countryName: 'Country 4',
                countryID: 'C4'
            },
            {
                countryName: 'Country 5',
                countryID: 'C5'
            },
            {
                countryName: 'Country 6',
                countryID: 'C6'
            },
        ]
    }

    const createNewRightsSet = () => {
        alert('Creating New Rights Set');
    }

    const selectSavedRightsSet = () => {
        alert('Select Rights Set');
    }

    const TracksWithNoSetPolicy = TerritorialRightsMockData.tracks.map( function (noPolicyTrack, i) {
        return(
            <div key={i} className="draggable-track">
                <i className="material-icons">dehaze</i>{noPolicyTrack.trackAudioFile}
            </div>
        )
    });

    const TracksWithNoSetPolicyDrop = TerritorialRightsMockData.tracks.map( function (noPolicyTrack, i) {
        return(
            <li key={i}>
                <label className="dropdown-item custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <span>{noPolicyTrack.trackAudioFile}</span>
            </li>
        )
    });

    const CountriesWithRights = TerritorialRightsMockData.countriesWithRights.map( function (country, i) {
        return(
            <li key={i}>
                <label className="dropdown-item custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <span>{country.countryName}</span>
            </li>
        )
    });

    const CountriesWithOutRights = TerritorialRightsMockData.countriesWithOutRights.map( function (country, i) {
        return(
            <li key={i}>
                <label className="dropdown-item custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <span>{country.countryName}</span>
            </li>
        )
    });

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
                            <button 
                                onClick={createNewRightsSet}
                                className="btn btn-primary"
                            >Create a New Rights Set</button>
                            <ButtonDropDown 
                                text='test' 
                                options={[1,2,3]}

                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className="track-draggable-area">
                        {TracksWithNoSetPolicy}
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
                                <thead>
                                    <tr className="row no-gutters">
                                        <th className="col-4" nowrap>Tracks with this Rights Set</th>
                                        <th className="col-4" nowrap>Has Rights In</th>
                                        <th className="col-4" nowrap>Does Not Have Rights In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="row no-gutters">
                                        <td className="col-4">
                                            <div className="dropdown">
                                                <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                                    Select Tracks or Drag Below
                                                </button>
                                                <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                    {TracksWithNoSetPolicyDrop}
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
                                                    {CountriesWithRights}
                                                </ul>
                                            </div>
                                        </td>
                                        <td className="col-4">
                                            <div className="dropdown">
                                                <button type="button" id="excludedCountriesDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                                    Select Countries
                                                </button>
                                                <ul className="dropdown-menu countries" aria-labelledby="excludedCountriesDropdown">
                                                    {CountriesWithOutRights}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};


const BlockingPoliciesPage = (props) => {

    const BlockingPoliciesMockData = {

        blockingPolicySets : [
            {
                setTitle : 'Blocking Policy Set 1',
                tracks : {},
                sites : {
                    youTube : {
                        siteImageClass : 'youtube',
                        siteMonetize : false,
                        siteBlock : false,
                        siteDuration : 'duration',
                        siteBlockUntil : 'Block Until'
                    },

                    soundCloud : {
                        siteImageClass : 'soundcloud',
                        siteMonetize : false,
                        siteBlock : false,
                        siteDuration : 'duration',
                        siteBlockUntil : 'Block Until'
                    },

                    faceBook : {
                        siteImageClass : 'faceBook',
                        siteMonetize : false,
                        siteBlock : false,
                        siteDuration : 'duration',
                        siteBlockUntil : 'Block Until'
                    },

                    instaGram : {
                        siteImageClass : 'instagram',
                        siteMonetize : false,
                        siteBlock : false,
                        siteDuration : 'duration',
                        siteBlockUntil : 'Block Until'
                    },

                    twitter : {
                        siteImageClass : 'twitter',
                        siteMonetize : false,
                        siteBlock : false,
                        siteDuration : 'duration',
                        siteBlockUntil : 'Block Until'
                    },
                }
            }
        ],

        tracks : [
            {
                trackAudioFile : 'Sample Track Name 1',
                trackISRC : '012345678910',
                trackPolicy : false
            },
            {
                trackAudioFile : 'Sample Track Name 2',
                trackISRC : '012345678910',
                trackPolicy : false
            },
            {
                trackAudioFile : 'Sample Track Name 3',
                trackISRC : '012345678910',
                trackPolicy : false
            },
            {
                trackAudioFile : 'Sample Track Name 4',
                trackISRC : '012345678910',
                trackPolicy : false
            },
            {
                trackAudioFile : 'Sample Track Name 5',
                trackISRC : '012345678910',
                trackPolicy : false
            }
        ]
    };

    const TracksWithNoSetPolicy = BlockingPoliciesMockData.tracks.map( function (noPolicyTrack, i) {
        return(
            <div key={i} className="draggable-track">{noPolicyTrack.trackAudioFile}</div>
        )
    });

    const TracksWithNoSetPolicyDrop = BlockingPoliciesMockData.tracks.map( function (noPolicyTrack, i) {
        return(
            <li key={i}>
                <label className="dropdown-item custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <span>{noPolicyTrack.trackAudioFile}</span>
            </li>
        )
    });


    class BlockingPolicySite extends Component {

        render() {
            return(
                <table className="table">
                    <thead >
                        <tr className="row no-gutters">
                            <th className="col-4 " nowrap>Site -- {this.props.set.setTitle}</th>
                            <th className="col-2 centered" nowrap>Monetize</th>
                            <th className="col-2 centered" nowrap>Block</th>
                            <th className="col-2 centered" nowrap>Duration</th>
                            <th className="col-2 centered" nowrap>Block Until</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            )
        }
    }

    const BlockingPolicySets = BlockingPoliciesMockData.blockingPolicySets.map( function (set, i) {
        return(
            <div className="set-card">
                <div className="row">
                    <div className="col-8">
                        <h3>{set.setTitle} </h3>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2"></div>
                </div>
                <div className="row no-gutters">
                    <div className="col-4">
                        <table>
                            <thead>
                                <tr className="row no-gutters">
                                    <th nowrap>Tracks to Block</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td nowrap>
                                        <div className="dropdown">
                                            <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspop="true" aria-expanded="false">
                                                Select Tracks or Drag Below
                                            </button>
                                            <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                {TracksWithNoSetPolicyDrop}
                                            </ul>
                                        </div>
                                        <div className="track-draggable-area territory-tracks"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-8">
                        <BlockingPolicySite set={set}/>
                    </div>
                </div>
            </div>
        )
    });

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
                        *Any post-release policies created here will require review and will not be complete until approval is granted.  <br />
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
                            <button
                                className="btn btn-primary"
                            >Create a New Blocking Policy</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className="track-draggable-area">
                        {TracksWithNoSetPolicy}
                    </div>
                </div>
                <div className="col-9">
                    {BlockingPolicySets}
                </div>
            </div>
        </section>
    )
};

class ReviewAndSubmitPage extends Component {

    render() {
        return(

            <div>		
                    <section class="page-container">
                        <div class="row">
                            <div class="col 5">
                                <h1>#Project Title#</h1>
                            </div>
                    
                            <div class="col-7">
                                <span class="project-right">
                                    <span class="project-status"><label>STATUS:</label>#PROJECT STATUS# </span>
                                    <button class="close-project btn" onClick="location.href = 'project-search.html'">Close Project</button>
                                </span>
                            </div> 
                        </div>

                        <div class="row no-gutters step-description review">
                            <div class="col-12">
                                <h2>Step <span class="count-circle">7</span> Review and Submit</h2>
                                <p>Take some time to review the project before submitting. Click on any of the sections in order to return the corresponding step to make changes.</p>
                            </div>
                        </div>
                    </section>
                    <section class="page-container review-section" onClick="location.href = 'release-information.html'">
                        <div class="row no-gutters">
                            <div class="col-10 justify-content-start">
                                <h2>Release Information</h2>
                            </div>
                            <div class="col-2 justify-content-end">
                                <i class="material-icons align-content-end float-right">edit</i>
                            </div>
                        </div>
                        <br />
                        <div class="row no-gutters">
                            <div class="col-2">
                                <img class="album-art" />
                            </div>
                            <div class="col-10">
                                <div class="row no-gutters">
                                    <div class="col-6">
                                        <label>Project Title:</label><span> Sample Project Title With A Longer Name</span>
                                    </div>
                                    <div class="col-6">
                                        <label>Artist:</label><span> Sample Artist Name</span>
                                    </div>
                                    <div class="col-6">
                                        <label>Project Type:</label><span> Sample Project Type</span>
                                    </div>
                                    <div class="col-6">
                                        <label>Label:</label><span> Sample Label Name</span>
                                    </div>
                                    <div class="col-12">
                                        <label>Release Date:</label><span> 12/25/2020</span>
                                    </div>
                                    <div class="col-12">
                                        <label>Notes:</label><span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
                    <section class="page-container review-section" onClick="location.href = 'project-contacts.html'">
                        <div class="row no-gutters">
                            <div class="col-10 justify-content-start">
                                <h2>Project Contacts</h2>
                            </div>
                            <div class="col-2 justify-content-end">
                                <i class="material-icons align-content-end float-right">edit</i>
                            </div>
                        </div>
                        <br />
                        <div class="row no-gutters">
                            <div class="col-6">
                                <label>Primary Contact:</label><span> John Doe</span>
                            </div>
                            <div class="col-6">
                                <label>Project Security:</label><span> Public (Viewable by all label members)</span>
                            </div>
                            <div class="col-12">
                                <label>Primary Email:</label><span> john.doe@umusic.com</span>
                            </div>
                            <div class="col-12">
                                <label>Additional Contacts:</label><span> jane.doe@umusic.com; another.email@umusic.com</span>
                            </div>
                        </div>
                    </section>
                
                    <section class="page-container review-section" onClick="location.href = 'track-information.html'">
                        <div class="row no-gutters">
                            <div class="col-10 justify-content-start">
                            <h2>Audio Files &amp; Track Information</h2>
                        </div>
                    
                        <div class="col-2 justify-content-end">
                            <i class="material-icons align-content-end float-right">edit</i>
                        </div>
                        <div class="col-12">
                        <br />
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Disc 1</a>
                            </div>
                        </nav>
                        
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <br />
                                <table class="table">
                                    <thead>
                                        <tr class="row no-gutters">
                                            <th class="col-1 centered">#</th>
                                            <th class="col-2">Audio File</th>
                                            <th class="col-2">Track Title</th>
                                            <th class="col-2">ISRC</th>
                                            <th class="col-2">Artist</th>
                                            <th class="col-1 centered">Single</th>
                                            <th class="col-2 centered">Release Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="row no-gutters">
                                            <td class="col-1 centered">1</td>
                                            <td class="col-2">audio-file-name.mp3</td>
                                            <td class="col-2">Track Name 1</td>
                                            <td class="col-2">123456789101</td>
                                            <td class="col-2">Example Artist Name 1</td>
                                            <td class="col-1 centered">
                                                <label class="custom-checkbox"> 		
                                                <input disabled type="checkbox" checked/>
                                                <span class="static-checkmark">				
                                                </span>
                                                </label>
                                            </td>
                                            <td class="col-2 centered">12/28/18</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section class="page-container review-section" onClick="location.href = 'track-information.html'">
                    <div class="row no-gutters">
                        <div class="col-10 justify-content-start">
                        <h2>Territorial Rights</h2>
                    </div>
                    <div class="col-2 justify-content-end">
                        <i class="material-icons align-content-end float-right">edit</i>
                    </div>
                    <div class="col-12">
                        <br />
                        <div class="review-card">
                        <table class="table">
                            <tr class="row no-gutters">
                                <th class="col-3">Rights Policy Name</th>
                                <th class="col-3">Tracks With This Policy</th>
                                <th class="col-3">Owned In</th>
                                <th class="col-3">Not Owned In</th>
                            </tr>
                            <tr class="row no-gutters">
                                <td class="col-3">Global Rights Policy</td>
                                <td class="col-3">Track Name 2</td>
                                <td class="col-3">Worldwide</td>
                                <td class="col-3">N/A</td>
                            </tr>
                            <tr class="row no-gutters">
                                <td class="col-3"></td>
                                <td class="col-3">Track Name 4</td>
                                <td class="col-3">USA, Canada, UK</td>
                                <td class="col-3">N/A</td>
                            </tr>
                        </table>
                        </div>
                        </div>
                    </div>
                </section>
                
                <section class="page-container review-section" onClick="location.href = 'track-information.html'">
                    <div class="row no-gutters">
                        <div class="col-10 justify-content-start">
                        <h2>Blocking Polices</h2>
                    </div>
                    <div class="col-2 justify-content-end">
                        <i class="material-icons align-content-end float-right">edit</i>
                    </div>
                    <div class="col-12">
                        <br />
                        <div class="review-card">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="align-text-bottom" nowrap>Blocking Policy Name</th>
                                        <th class="align-text-bottom" nowrap>Tracks With This Policy</th>
                                        <th class="align-items-center"><span class="platform-sprite small youtube"></span></th>
                                        <th class="align-items-center"><span class="platform-sprite small soundcloud"></span></th>
                                        <th class="align-items-center"><span class="platform-sprite small facebook"></span></th>
                                        <th class="align-items-center"><span class="platform-sprite small instagram"></span></th>
                                        <th class="align-items-center"><span class="platform-sprite small twitter"></span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td nowrap>Blocking Policy 1</td>
                                        <td class="" nowrap>Track Name 1</td>
                                        <td class="align-items-center" nowrap>Leave Up All</td>
                                        <td class="align-items-center" nowrap>Block &lt; 30 Sec</td>
                                        <td class="align-items-center" nowrap>Block All<br />
                                        <span class="block-date">Until 12/28/2019</span>
                                        </td>
                                        <td class="align-items-center" nowrap>Leave Up All</td>
                                        <td class="align-items-center" nowrap>Leave Up All</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <section class="row save-buttons">
                        <div class="col-9"></div>
                        <div class="col-3 align-content-end">
                            <button type="button" class="btn btn-secondary">Save</button>
                            <button type="button" class="btn btn-primary" onClick="location.href = 'project-contacts.html'">Save &amp; Continue</button>
                        </div>
                    </section>
                </section>
            </div>

        )
    }
}

class LoginPage extends Component {

    state = {
        redirect : false
    }

    setRedirect = () => {

        console.log('setRedirect')

        this.setState(
            {
                redirect : true
            }
        )
    }

    renderRedirect = () => {
        console.log('renderRedirect')

        if (this.state.redirect) {
            ReactDOM.render(<Login />, document.getElementById('root'))
        }
    }

    render() {
        return(
            <section className="container-fluid landing">
                <section className="logo"><img src="/static/images/guardian-logo.png" /></section>
                <nav className="top-nav ext">
                    <ul>
                        <li><a href="">Help Guide</a></li>
                        <li><a href="">Request Access</a></li>
                        <li><a href="release-information.html">Log In</a></li>
                    </ul>
                </nav>
    
                <section className="over-bar">
                    <h1>WELCOME TO THE GUARDIAN</h1>
                    <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
                    <span>
                        <button className="access btn">Request Access</button>
                        <button className="log-in btn" onClick={this.setRedirect}>Log In</button>

                        {this.renderRedirect()}

                        {/*
                        <Button
                            onClick={this.setRedirect}
                            className="log-in btn"
                        >
                            Log In
                        </Button>
                        */}
    
                    </span>
                </section>
    
                <section className="bar"></section>
                
            </section>
        )
    }
}


export {LoginPage, NewProjectPage, ReleaseinformationPage, AudioFilesPage, ProjectContactsPage, TrackInformationPage, TerritorialRightsPage, BlockingPoliciesPage, ReviewAndSubmitPage};
