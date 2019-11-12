import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap';
import LoadingImg from '../../ui/LoadingImg';
import PageHeader from '../PageHeader/PageHeader';
import Noty from 'noty';
import AudioFilesTabsContainer from '../ReviewAndSubmit/pageComponents/AudioFileTabsContainer';
import TerritorialRightsTable from '../ReviewAndSubmit/pageComponents/TerritorialRightsTable';
import BlockingPoliciesDataTable from '../ReviewAndSubmit/pageComponents/BlockingPoliciesDataTable';
import { withRouter } from 'react-router-dom';

class ReviewAndSubmitPage extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            showloader : false
        }
        this.handleSubmitProjectClick = this.handleSubmitProjectClick.bind(this);
        this.handleProjectCategoryClick = this.handleProjectCategoryClick.bind(this);
    };

    componentDidMount() {
        this.setState({
            project : this.props.data,
        })
        this.setState( {showloader : false} )
    }

    handleProjectCategoryClick(category) {
        this.props.history.push(category + this.props.match.params.projectID)
    }

    handleSubmitProjectClick() {

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
                this.setState( {showloader : false} )
                new Noty ({
                    type: 'success',
                    id:'tracksSaved',
                    text: 'Your project has been successfully saved and submitted for review.',
                    theme: 'bootstrap-v4',
                    layout: 'top',
                    timeout: '5000'
                }).on('afterClose', ()  => {
                    return( this.props.history.push({pathname : '/findProject/'}))
                }).show()
            }
        )
        .catch(
            error => {
                console.error(error)
                this.setState( {showloader : false} )
            }
        );
    }

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    }

    getPage = () => {
        return(
            <div>
                <div className="page-container">

                    <LoadingImg
                        show={this.state.showloader}
                    />

                   <PageHeader 
                        data={this.props.data.Project}
                    />

                    <div className="row no-gutters step-description review">
                        <div className="col-11">
                            <h2>Step <span className="count-circle">7</span> Review and Submit</h2>
                            <p>In this FINAL step, please take some time to review the project for accuracy before submitting.  Click on any of the sections to return to the corresponding step and make changes.  Once a project is submitted as final in this step, only a Guardian administrator can unlock the project for additional editing.</p>
                        </div>
                        <div className="col-1">
                            <button type="button" className="btn btn-primary float-right" onClick={this.handleSubmitProjectClick}>Submit Project</button>
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
                    <div className="review-card">
                        <div className="row no-gutters">
                            <div className="col-2">
                                <img className="album-art" src={(this.props.data && this.props.data.Project ) ? this.props.data.Project.projectCoverArtBase64Data : ''}/>
                            </div>
                            <div className="col-10">
                                <div className="row no-gutters">
                                    <div className="col-6">
                                        <label>Project Title:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectTitle : ''}</span>
                                    </div>
                                    <div className="col-6">
                                        <label>Artist:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectArtistName : ''}</span>
                                    </div>
                                    <div className="col-6">
                                        <label>Project Type:</label><span> {(this.props.data.Project) ?this.props.data.Project.projectType : ''}</span>
                                    </div>
                                    <div className="col-6">
                                        <label>Label:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectReleasingLabel : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <label>Release Date:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectReleaseDate : ''}</span>
                                    </div>
                                    <div className="col-12">
                                        <label>Notes:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectNotes : ''}</span>
                                    </div>
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
                    <div className="review-card">
                        <div className="row no-gutters">
                            <div className="col-6">
                                <label>Primary Contact:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectPrimaryContact : ''}</span>
                            </div>
                            <div className="col-6">
                                <label>Project Security:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectSecurity : ''}</span>
                            </div>
                            <div className="col-12">
                                <label>Primary Email:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectPrimaryContactEmail : ''}</span>
                            </div>
                            <div className="col-12">
                                <label>Additional Contacts:</label><span> {(this.props.data.Project) ? this.props.data.Project.projectAdditionalContacts : ''}</span>
                            </div>
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
                    <div className="review-card">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <AudioFilesTabsContainer 
                                discs={this.props.data.Discs}
                            />
                        </div>
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
                        <TerritorialRightsTable 
                            data={this.props.data}
                        />
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
                        <BlockingPoliciesDataTable 
                            data={this.props.data}
                        />
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="row d-flex no-gutters">
                <div className="col-12 align-content-end submit-project">
                    <button type="button" className="btn btn-primary float-right" onClick={this.handleSubmitProjectClick}>Submit Project</button>
                </div>
            </div>
            </div>
        )
    }

    

    render() {

        console.log(this.props.data.Project)

        return(
            <div className="col-10">		
                {(this.props.data) ? this.getPage() : null }
            </div>
        )
    }
};

export default withRouter(ReviewAndSubmitPage);