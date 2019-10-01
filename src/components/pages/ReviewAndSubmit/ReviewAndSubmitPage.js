import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap';

import PageHeader from '../PageHeader/PageHeader';
import './ReviewAndSubmit.css';
import Noty from 'noty';
import AudioFilesTabsContainer from '../ReviewAndSubmit/pageComponents/AudioFileTabsContainer';
import { withRouter } from 'react-router-dom';

class ReviewAndSubmitPage extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            projectID : props.projectID,
            project : {
                projectCoverArtBase64Data : ''
            },
            discs : [],
            projectID : ''
        }
        this.handleSubmitProjectClick = this.handleSubmitProjectClick.bind(this);
        this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
    };

    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "ProjectID" : (this.props.match.params.projectID) ? this.props.match.params.projectID : ''
        })

        fetch ('https://api-dev.umusic.net/guardian/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 

            {
                this.setState({project : responseJSON.Project})
                this.setState({discs : responseJSON.Discs})
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    handleProjectCategoryClick(category) {
        this.props.history.push(category + this.props.match.params.projectID)
    }

    handleSubmitProjectClick() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "ProjectID" : (this.props.match.params.projectID) ? this.props.match.params.projectID : ''
        })

        fetch ('https://api-dev.umusic.net/guardian/project/submit', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 
            {
                new Noty ({
                    type: 'success',
                    id:'tracksSaved',
                    text: 'Your project has been successfully saved and submitted for review.',
                    theme: 'bootstrap-v4',
                    layout: 'top',
                    timeout: '3000'
                }).show() 
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    }

    render() {
        return(
            <div>		
                <section className="page-container">

                   <PageHeader projectTitle={this.state.projectTitle}/>

                    <div className="row no-gutters step-description review">
                        <div className="col-12">
                            <h2>Step <span className="count-circle">7</span> Review and Submit</h2>
                            <p>Take some time to review the project before submitting. Click on any of the sections in order to return the corresponding step to make changes.</p>
                        </div>
                    </div>
                </section>
                <section className="page-container review-section">
                    <div className="row no-gutters">
                        <div className="col-10 justify-content-start">
                            <h2>Release Information</h2>
                        </div>
                        <div className="col-2 justify-content-end">
                        <button className="btn btn-secondary align-content-end float-right" onClick={() => this.handleProjectCategoryClick('/releaseInformation/')}>
                             <i className="material-icons">edit</i>  Edit
                            </button>
                        </div>
                    </div>
                    <br />
                    <div className="row no-gutters">
                        <div className="col-2">
                            <img className="album-art" src={this.state.project.projectCoverArtBase64Data}/>
                        </div>
                        <div className="col-10">
                            <div className="row no-gutters">
                                <div className="col-6">
                                    <label>Project Title:</label><span> {this.state.project.projectTitle}</span>
                                </div>
                                <div className="col-6">
                                    <label>Artist:</label><span> {this.state.project.projectArtistName}</span>
                                </div>
                                <div className="col-6">
                                    <label>Project Type:</label><span> {this.state.project.projectType}</span>
                                </div>
                                <div className="col-6">
                                    <label>Label:</label><span> {this.state.project.projectReleasingLabel}</span>
                                </div>
                                <div className="col-12">
                                    <label>Release Date:</label><span> {this.state.project.projectReleaseDate}</span>
                                </div>
                                <div className="col-12">
                                    <label>Notes:</label><span> {this.state.project.projectNotes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            
                <section className="page-container review-section" onClick={() => this.handleProjectCategoryClick('/projectContacts/')}>
                    <div className="row no-gutters">
                        <div className="col-10 justify-content-start">
                            <h2>Project Contacts</h2>
                        </div>
                        <div className="col-2 justify-content-end">
                            <button className="btn btn-secondary align-content-end float-right">
                             <i className="material-icons">edit</i>  Edit
                            </button>
                           
                        </div>
                    </div>
                    <br />
                    <div className="row no-gutters">
                        <div className="col-6">
                            <label>Primary Contact:</label><span> {this.state.project.projectPrimaryContact}</span>
                        </div>
                        <div className="col-6">
                            <label>Project Security:</label><span> {this.state.project.projectSecurity}</span>
                        </div>
                        <div className="col-12">
                            <label>Primary Email:</label><span> {this.state.project.projectPrimaryContactEmail}</span>
                        </div>
                        <div className="col-12">
                            <label>Additional Contacts:</label><span> {this.state.project.projectAdditionalContacts}</span>
                        </div>
                    </div>
                </section>
            
                <section className="page-container review-section" onClick={() => this.handleProjectCategoryClick('/audioFiles/')}>
                    <div className="row no-gutters">
                        <div className="col-10 justify-content-start">
                        <h2>Audio Files &amp; Track Information</h2>
                    </div>
                
                    <div className="col-2 justify-content-end">
                    <button className="btn btn-secondary align-content-end float-right">
                             <i className="material-icons">edit</i>  Edit
                            </button>
                    </div>
                    <div className="col-12">
                    <br />
                    
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <AudioFilesTabsContainer 
                                discs={this.state.discs}
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="page-container review-section" onClick={() => this.handleProjectCategoryClick('/territorialRights/')}>
                <div className="row no-gutters">
                    <div className="col-10 justify-content-start">
                    <h2>Territorial Rights</h2>
                </div>
                <div className="col-2 justify-content-end">
                <button className="btn btn-secondary align-content-end float-right">
                             <i className="material-icons">edit</i>  Edit
                            </button>
                </div>
                <div className="col-12">
                    <br />
                    <div className="review-card">
                        <table className="table">
                            <tbody>
                                <tr className="row no-gutters">
                                    <th className="col-3">Rights Policy Name</th>
                                    <th className="col-3">Tracks With This Policy</th>
                                    <th className="col-3">Owned In</th>
                                    <th className="col-3">Not Owned In</th>
                                </tr>
                                <tr className="row no-gutters">
                                    <td className="col-3">Global Rights Policy</td>
                                    <td className="col-3">Track Name 2</td>
                                    <td className="col-3">Worldwide</td>
                                    <td className="col-3">N/A</td>
                                </tr>
                                <tr className="row no-gutters">
                                    <td className="col-3"></td>
                                    <td className="col-3">Track Name 4</td>
                                    <td className="col-3">USA, Canada, UK</td>
                                    <td className="col-3">N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </section>
            
            <section className="page-container review-section" onClick={() => this.handleProjectCategoryClick('/blockingPolicies/')}>
                <div className="row no-gutters">
                    <div className="col-10 justify-content-start">
                    <h2>Blocking Polices</h2>
                </div>
                <div className="col-2 justify-content-end">
                <button className="btn btn-secondary align-content-end float-right">
                             <i className="material-icons">edit</i>  Edit
                            </button>
                </div>
                <div className="col-12">
                    <br />
                    <div className="review-card">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="align-text-bottom" nowrap="nowrap">Blocking Policy Name</th>
                                    <th className="align-text-bottom" nowrap="nowrap">Tracks With This Policy</th>
                                    <th className="align-items-center"><span className="platform-sprite small youtube"></span></th>
                                    <th className="align-items-center"><span className="platform-sprite small soundcloud"></span></th>
                                    <th className="align-items-center"><span className="platform-sprite small facebook"></span></th>
                                    <th className="align-items-center"><span className="platform-sprite small instagram"></span></th>
                                    <th className="align-items-center"><span className="platform-sprite small twitter"></span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td nowrap="nowrap">Blocking Policy 1</td>
                                    <td className="" nowrap="nowrap">Track Name 1</td>
                                    <td className="align-items-center" nowrap="nowrap">Leave Up All</td>
                                    <td className="align-items-center" nowrap="nowrap">Block &lt; 30 Sec</td>
                                    <td className="align-items-center" nowrap="nowrap">Block All<br />
                                    <span className="block-date">Until 12/28/2019</span>
                                    </td>
                                    <td className="align-items-center" nowrap="nowrap">Leave Up All</td>
                                    <td className="align-items-center" nowrap="nowrap">Leave Up All</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="row save-buttons">
                <div className="col-9"></div>
                <div className="col-3 align-content-end">
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmitProjectClick}>Submit Project</button>
                </div>
            </section>
        </div>
        )
    }
};

export default withRouter(ReviewAndSubmitPage);