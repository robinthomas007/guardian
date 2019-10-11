import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import { withAuth } from '@okta/okta-react';

export default withAuth(class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Project : {
                projectTitle : '',
                projectStatus : '',
                projectID : '',
            },
            projectID : '',
            pageViewCompact : false,
            navSteps  : {
                preRelease : [
                    {
                        description : 'Release Info',
                        path : '/releaseInformation/',
                        complete : false
                    },
                    {
                        description : 'Project Contacts',
                        path : '/projectContacts/',
                        complete : false
                    },
                    {
                        description : 'Audio Files',
                        path : '/audioFiles/',
                        complete : false
                    },
                    {
                        description : 'Track Information',
                        path : '/trackInformation/',
                        complete : false
                    },
                    {
                        description : 'Territorial Rights',
                        path : '/territorialRights/',
                        complete : false
                    },
                    {
                        description : 'Blocking Policies',
                        path : '/blockingPolicies/',
                        complete : false
                    },
                    {
                        description : 'Review & Submit',
                        path : '/reviewSubmit/',
                        complete : false
                    }
                ],
                postRelease : []
            }
        }
    }

    getNavLinks = () => {
        return(
            <ul className="d-flex justify-content-center align-items-stretch">
                {this.state.navSteps.preRelease.map( (navLink, i) => {
                    return(
                        <>
                            <li key={i} id={"step-" + (i + 1)}>
                                <NavLink className="" to={{pathname: navLink.path + this.props.projectID}}>
                                    <span className="step-description text-nowrap">{navLink.description}</span>
                                    <span className="step">{i + 1}</span>
                                    <span className="step-arrow"></span>
                                </NavLink>
                            </li>
                            { (i < this.state.navSteps.preRelease.length - 1) ? <li className="step-bar"><span></span></li> : null}
                        </>
                    )
                })}
            </ul>
        )
    };

    handleLogoutClick = (e) => {
        e.preventDefault();
        this.props.auth.logout('/');
        localStorage.clear()
    };

    handleSetProjectData = (projectData) => {
        this.setState( { Project : projectData} )
    };

    handleProjectDataLoad = () => {

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : this.props.userData.email
            },
            "ProjectID" : (this.state.projectID) ? this.state.projectID : ''
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
                    Project : responseJSON.Project, 
                    showloader : false
                })
            }
        )
        .catch(
            error => {
                console.error(error);
                this.setState( {showloader : false} )
            }
        );
    }

	componentDidUpdate = () => {
		if(this.state.projectID !== this.props.projectID) {
			this.setState( {
                projectID : this.props.projectID
            })
        }

        if(this.state.projectID !== '') {
            //TODO: this needs to be optimized - we should not be calling the API from the header every page load.
            this.handleProjectDataLoad()
        } else {
            console.log('empty projectID')
        }
    };

    getHeaderContent = () => {
        return(
            <div className="row d-flex no-gutters project-title">
                <div className="col-2"></div>
                <div className="col-9">
                    <div className="row d-flex no-gutters">
                        <div className="col-10 align-self-start">
                            <h1>{ (this.state.Project && this.state.Project.projectTitle) ? this.state.Project.projectTitle : 'New Project'}</h1>
                        </div>
                        <div className="col-2 align-self-start">
                            STATUS: { (this.state.Project && this.state.Project.projectStatus) ? this.state.Project.projectStatus : 'In Progress'}
                        </div> 
                    </div>
                    <div className="col-1"></div>
                </div>
        
                <div className="row d-flex no-gutters steps-bar">
                    <div className="col-1"></div>
                    <div className="col-10">
                        {this.getNavLinks()}
                    </div>
                    <div className="col-1"></div> 
                </div>
            </div>
        )
    }

    render() {
        return(
            <header className={ (this.state.pageViewCompact) ? "row d-flex no-gutters compact" : "row d-flex no-gutters" }>
                <div className="col-12 align-items-end flex-column flex-grow-1">
                    <div className="row d-flex no-gutters">
                        <div className="col-1"></div>
                        <div className="col-2">
                            <span className="guardian-logo"></span>
                        </div>
                        <div className="nav-bg"></div>
                        <nav className="col-8 d-flex no-gutters justify-content-end">
                            <ul>
                                <li><NavLink className="steps" to={{pathname: '/releaseInformation'}}>New Project</NavLink></li>
                                <li><NavLink className="steps" to={{pathname: '/findProject'}}>Find A Project</NavLink></li>
                                <li><NavLink className="steps" to={{pathname: '/recentProjects'}}>Recent Projects</NavLink></li>
                                { (this.props.userData.IsAdmin) ? <li><NavLink className="steps" to={{pathname: '/admin'}}>Admin</NavLink></li> : null}
                                <li> | </li>
                                <li>Welcome, {this.props.userData.name}</li>
                                <li><span onClick={this.handleLogoutClick}>Log Out</span></li>
                            </ul>
                        </nav>
                    <div className="col-1"></div>
                </div>
                { (!this.state.pageViewCompact) ? this.getHeaderContent() : null}
            </div>
        </header>
        )
    }
})
