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
            compactViewPages : ['findProject', 'admin'],
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
                        stepComplete : true,
                        preRelease : true
                    },
                    {
                        description : 'Contacts',
                        path : '/projectContacts/',
                        complete : false,
                        stepComplete : false,
                        preRelease : true
                    },
                    {
                        description : 'Audio Files',
                        path : '/audioFiles/',
                        complete : false,
                        stepComplete : false,
                        preRelease : false
                    },
                    {
                        description : 'Track Info',
                        path : '/trackInformation/',
                        complete : false,
                        stepComplete : false,
                        preRelease : true
                    },
                    {
                        description : 'Rights',
                        path : '/territorialRights/',
                        complete : false,
                        stepComplete : false,
                        preRelease : false
                    },
                    {
                        description : 'Blocking',
                        path : '/blockingPolicies/',
                        complete : false,
                        stepComplete : false,
                        preRelease : true
                    },
                    {
                        description : 'Review',
                        path : '/reviewSubmit/',
                        complete : false,
                        stepComplete : false,
                        preRelease : true
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
                                <NavLink className="" to={{pathname: navLink.path + ((this.state.Project && this.state.Project.projectID) ? this.state.Project.projectID : '')}}>
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

    handleHeaderViewType = () => {
        return( (this.state.compactViewPages.indexOf(this.props.pagePath.split('/')[1]) >= 0 ) ? true : false)
    }

    componentDidUpdate() {
        if(this.props.pagePath !== this.state.pagePath) {
            this.setState( {
                pagePath : this.props.pagePath,
                pageViewCompact : this.handleHeaderViewType(),
            })
        }

        if(this.props.projectData !== this.state.Project) {
            this.setState( {
                Project : this.props.projectData
            })
        }

        this.props.setPageViewType(this.state.pageViewCompact)
    }

    componentDidMount = () => {
        if(this.props.pagePath !== this.state.pagePath) {
            const pageView = (this.props.pagePath.indexOf('findProject') >= 0) ? true : false;
            this.setState( {
                pagePath : this.props.pagePath,
                pageViewCompact : pageView
            })
        }

        if(this.props.projectData !== this.state.Project) {
            this.setState( {
                Project : this.props.projectData
            })
        }

        this.props.setPageViewType(this.state.pageViewCompact)

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
                                <li>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Recent Projects
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">Recent Project 1</a>
                                            <a className="dropdown-item" href="#">Recent Project 2</a>
                                            <a className="dropdown-item" href="#">Recent Project 3</a>
                                            <a className="dropdown-item" href="#">Recent Project 4</a>
                                            <a className="dropdown-item" href="#">Recent Project 5</a>
                                        </div>
                                    </div>
                                </li>
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
