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
            navLoaded : false,
            headerDataLoaded : false,
            projectID : '',
            pagePath : '',
            pageViewCompact : true,
            navSteps  : {
                preRelease : [
                    {
                        description : 'Release Info',
                        path : '/releaseInformation/',
                        complete : false,
                        stepComplete : true
                    },
                    {
                        description : 'Project Contacts',
                        path : '/projectContacts/',
                        complete : false,
                        stepComplete : false
                    },
                    {
                        description : 'Audio Files',
                        path : '/audioFiles/',
                        complete : false,
                        stepComplete : false
                    },
                    {
                        description : 'Track Information',
                        path : '/trackInformation/',
                        complete : false,
                        stepComplete : false
                    },
                    {
                        description : 'Territorial Rights',
                        path : '/territorialRights/',
                        complete : false,
                        stepComplete : false
                    },
                    {
                        description : 'Blocking Policies',
                        path : '/blockingPolicies/',
                        complete : false,
                        stepComplete : false
                    },
                    {
                        description : 'Review & Submit',
                        path : '/reviewSubmit/',
                        complete : false,
                        stepComplete : false
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
                        <React.Fragment key={i}>
                            <li key={i} id={"step-" + (i + 1)}>
                                <NavLink className="" to={{pathname: navLink.path + ((this.props.projectData && this.props.projectData.projectID) ? this.props.projectData.projectID : '')}}>
                                    <span className="step-description text-nowrap">{navLink.description}</span>
                                    <span className="step">{i + 1}</span>
                                    <span className="step-arrow"></span>
                                </NavLink>
                            </li>
                            { (i < this.state.navSteps.preRelease.length - 1) ? <li className="step-bar"><span></span></li> : null}
                        </React.Fragment>
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

    setPageDisplay = (pagePath) => {
        console.log(pagePath)
    }

    handlePagePath = (pagePath) => {
        
    }

    componentDidUpdate() {
        if(this.props.pagePath !== this.state.pagePath) {
            const pageView = (this.props.pagePath.indexOf('findProject') >= 0) ? true : false;
            this.setState( {
                pagePath : this.props.pagePath,
                pageViewCompact : pageView
            })
        }
    }

    componentDidMount = () => {
        if(this.props.pagePath !== this.state.pagePath) {
            const pageView = (this.props.pagePath.indexOf('findProject') >= 0) ? true : false;
            this.setState( {
                pagePath : this.props.pagePath,
                pageViewCompact : pageView
            })
        }

    }

    getHeaderContent = () => {
        return(
            <div className="row d-flex no-gutters project-title">
                <div className="col-2"></div>
                <div className="col-9">
                    <div className="row d-flex no-gutters">
                        <div className="col-10 align-self-start">
                            <h1>{ (this.props.projectData && this.props.projectData.projectTitle) ? this.props.projectData.projectTitle : 'New Project'}</h1>
                        </div>
                        <div className="col-2 align-self-start">
                            STATUS: { (this.props.projectData && this.props.projectData.projectStatus) ?this.props.projectData.projectStatus : 'In Progress'}
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
