import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap';
import LoadingImg from '../../ui/LoadingImg';
import PageHeader from '../PageHeader/PageHeader';
import Noty from 'noty';
import AudioFilesTabsContainer from '../ReviewAndSubmit/pageComponents/AudioFileTabsContainer';
import { withRouter } from 'react-router-dom';

class ReviewAndSubmitPage extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            projectID : props.projectID,
            project : {
                Project : {
                    projectID : '',
                    projectTitle : '',
                    projectTypeID : '',
                    projectType : '',
                    projectArtistName : '',
                    projectReleasingLabelID : '',
                    projectReleasingLabel : '',
                    projectReleaseDate : '',
                    projectReleaseDateTBD : false,
                    projectPrimaryContact : '',
                    projectPrimaryContactEmail : '',
                    projectAdditionalContacts : '',
                    projectNotes : '',
                    projectSecurityID : '',
                    projectSecurity : '',
                    projectStatusID : '',
                    projectStatus : '',
                    projectCoverArtFileName : '',
                    projectCoverArtBase64Data : '',
                }
            },
            discs : [],
            projectID : '',
            showloader : false
        }
        this.handleSubmitProjectClick = this.handleSubmitProjectClick.bind(this);
        this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
    };

    componentDidMount() {

        this.setState( {showloader : true} )

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
                this.setState({
                    project : responseJSON,
                    discs : responseJSON.Discs
                })
                this.setState( {showloader : false} )
            }
        )
        .catch(
            error => {
                console.error(error);
                this.setState( {showloader : false} )
            }
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
            <div className="col-10">		
                <div className="page-container">

                    <LoadingImg
                        show={this.state.showloader}
                    />

                   <PageHeader 
                        data={this.state.project}
                    />

                    <div className="row no-gutters step-description review">
                        <div className="col-12">
                            <h2>Step <span className="count-circle">7</span> Review and Submit</h2>
                            <p>Take some time to review the project before submitting. Click on any of the sections in order to return the corresponding step to make changes.</p>
                        </div>
                    </div>
                </div>

                <div className="page-container review-section">
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
                            <img className="album-art" src={this.state.project.Project.projectCoverArtBase64Data}/>
                        </div>
                        <div className="col-10">
                            <div className="row no-gutters">
                                <div className="col-6">
                                    <label>Project Title:</label><span> {this.state.project.Project.projectTitle}</span>
                                </div>
                                <div className="col-6">
                                    <label>Artist:</label><span> {this.state.project.Project.projectArtistName}</span>
                                </div>
                                <div className="col-6">
                                    <label>Project Type:</label><span> {this.state.project.Project.projectType}</span>
                                </div>
                                <div className="col-6">
                                    <label>Label:</label><span> {this.state.project.Project.projectReleasingLabel}</span>
                                </div>
                                <div className="col-12">
                                    <label>Release Date:</label><span> {this.state.project.Project.projectReleaseDate}</span>
                                </div>
                                <div className="col-12">
                                    <label>Notes:</label><span> {this.state.project.Project.projectNotes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="page-container review-section">
                    <div className="row no-gutters">
                        <div className="col-10 justify-content-start">
                            <h2>Project Contacts</h2>
                        </div>
                        <div className="col-2 justify-content-end">
                            <button className="btn btn-secondary align-content-end float-right" onClick={() => this.handleProjectCategoryClick('/projectContacts/')}>
                             <i className="material-icons">edit</i>  Edit
                            </button>
                           
                        </div>
                    </div>
                    <br />
                    <div className="row no-gutters">
                        <div className="col-6">
                            <label>Primary Contact:</label><span> {this.state.project.Project.projectPrimaryContact}</span>
                        </div>
                        <div className="col-6">
                            <label>Project Security:</label><span> {this.state.project.Project.projectSecurity}</span>
                        </div>
                        <div className="col-12">
                            <label>Primary Email:</label><span> {this.state.project.Project.projectPrimaryContactEmail}</span>
                        </div>
                        <div className="col-12">
                            <label>Additional Contacts:</label><span> {this.state.project.Project.projectAdditionalContacts}</span>
                        </div>
                    </div>
                </div>
            
                <div className="page-container review-section">
                    <div className="row no-gutters">
                        <div className="col-10 justify-content-start">
                        <h2>Audio Files &amp; Track Information</h2>
                    </div>
                
                    <div className="col-2 justify-content-end">
                    <button className="btn btn-secondary align-content-end float-right" onClick={() => this.handleProjectCategoryClick('/audioFiles/')}>
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
            </div>
            
            <div className="page-container review-section">
                <div className="row no-gutters">
                    <div className="col-10 justify-content-start">
                    <h2>Territorial Rights</h2>
                </div>
                <div className="col-2 justify-content-end">
                <button className="btn btn-secondary align-content-end float-right" onClick={() => this.handleProjectCategoryClick('/territorialRights/')}>
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
            </div>
            
            <div className="page-container review-section">
                <div className="row no-gutters">
                    <div className="col-10 justify-content-start">
                    <h2>Blocking Polices</h2>
                </div>
                <div className="col-2 justify-content-end">
                <button className="btn btn-secondary align-content-end float-right" onClick={() => this.handleProjectCategoryClick('/blockingPolicies/')}>
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
            </div>
          
            <div className="col-12 row">
                <div className="col-9"></div>
                <div className="col-3 align-content-end">
                    <button type="button" className="btn btn-primary float-right" onClick={this.handleSubmitProjectClick}>Submit Project</button>
                </div>
            </div>
    
        </div>
        )
    }
};

export default withRouter(ReviewAndSubmitPage);