import React, { Component } from 'react';
import PageHeader from '../PageHeader';

class ReviewAndSubmitPage extends Component {

    render() {
        return(
            <div>		
                <section class="page-container">
                   
                   <PageHeader />

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
};

export default ReviewAndSubmitPage;