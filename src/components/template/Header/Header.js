import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, withRouter } from "react-router-dom";
import { withAuth } from '@okta/okta-react';
import RecentProjectsDrop from "../Header/RecentProjectsDrop";

export default withRouter(class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Project : {
                projectTitle : '',
                projectStatus : '',
                projectID : '',
            },
            compactViewPages : {
                findProject : {
                    titleText : 'Find A Project'
                },
                admin : {
                   titleText : 'User Admin'
                }
            },
            projectID : '',
            pagePath : '',
            pageViewCompact : true,
            showProgressBar : true,
            showHeaderSizeToggle : true,
            showProjectStatus : true,
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
                postRelease : [
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
                        description : 'Track Info',
                        path : '/trackInformation/',
                        complete : false,
                        stepComplete : false,
                        preRelease : true
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
                ]
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

    getDefaultPageTitle = (defaultText) => {
        const isDefaultCompactViewPage = this.state.compactViewPages[this.props.pagePath.split('/')[1]];

        return(isDefaultCompactViewPage ? isDefaultCompactViewPage.titleText : defaultText)
    };

    handleHeaderViewType = () => {
        const isDefaultCompactViewPage = this.state.compactViewPages[this.props.pagePath.split('/')[1]];

        if(isDefaultCompactViewPage) {
            //this.setDefaultPageTitle(isDefaultCompactViewPage)
            this.props.clearProject()
        }

        return(isDefaultCompactViewPage ? true : false)
    };

    headerToggle = () => {
        const isCompactView = this.handleHeaderViewType();

         this.setState( {
            showProgressBar : (this.handleHeaderViewType()) ? false : !this.state.showProgressBar,
            pageViewCompact : !this.state.pageViewCompact
        } )
    };

    setHeaderView = () => {
        const isCompactView = this.handleHeaderViewType();

        if(isCompactView) {
            this.setState( {
                showProgressBar : false,
                pageViewCompact : true,
                showHeaderSizeToggle : false,
                showProjectStatus : false
            } )
        } else {
            (this.state.showProgressBar) ? 
                this.setState( { 
                    showProgressBar : true, 
                    pageViewCompact : false, 
                    showHeaderSizeToggle : true ,
                    showProjectStatus : true
                } ) 
                : 
                this.setState( { 
                    showProgressBar : false, 
                    pageViewCompact : true, 
                    showHeaderSizeToggle : true,
                    showProjectStatus : true
                } )
        }
    };

    componentDidUpdate() {

        if(this.props.pagePath !== this.state.pagePath) {
            this.setState( {
                pagePath : this.props.pagePath,
                showProgressBar : !this.handleHeaderViewType(), 
                pageViewCompact : this.handleHeaderViewType(), 
                showHeaderSizeToggle : !this.handleHeaderViewType() 

            }, this.setHeaderView())
        }

        if(this.props.projectData !== this.state.Project) {
            this.setState( {
                Project : this.props.projectData
            })
        }


        this.props.setPageViewType(this.state.pageViewCompact)
    };

    componentDidMount = () => {
        if(this.props.pagePath !== this.state.pagePath) {
            this.setState( {
                pagePath : this.props.pagePath,
                pageViewCompact : this.handleHeaderViewType()
            })
        }

        if(this.props.projectData !== this.state.Project) {
            this.setState( {
                Project : this.props.projectData
            })
        }

        this.setHeaderView()
        this.props.setPageViewType(this.state.pageViewCompact)
    };

    getHeaderContent = () => {
        return(
            <div className="row d-flex no-gutters project-title">
                <div className="col-2"></div>
                <div className="col-9">
                    <div className="row d-flex no-gutters">
                        <div className="col-10 align-self-start">
                            <h1>{ (this.props.projectData && this.props.projectData.projectTitle) ? this.props.projectData.projectTitle : this.getDefaultPageTitle('New Project')}</h1>
                        </div>
                        <div className="col-2 align-self-start">
                            {
                                (this.state.showProjectStatus) ? 
                                    'STATUS:' + (this.props.projectData && this.props.projectData.projectStatus ? this.props.projectData.projectStatus : 'In Progress') :
                                null
                            }
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>

                <div className="row d-flex no-gutters steps-bar">
                    <div className="col-1"></div>
                    <div className="col-10">
                        {(this.state.showProgressBar) ? this.getNavLinks() : null}
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    };

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
                                <li><NavLink className="steps" to={{pathname: '/releaseInformation'}} onClick={ ()=> this.props.clearProject()}>New Project</NavLink></li>
                                <li><NavLink className="steps" to={{pathname: '/findProject'}}>Find A Project</NavLink></li>
                                <li>
                                    <RecentProjectsDrop 
                                        updateHistory={ (projectID)=> this.props.updateHistory(projectID)}
                                    />
                                </li>
                                { (this.props.userData.IsAdmin) ? <li><NavLink className="steps" to={{pathname: '/admin'}}>Admin</NavLink></li> : null}
                                <li> | </li>
                                <li>Welcome, {this.props.userData.name}</li>
                                <li><span onClick={ (e)=> this.props.handleLogoutClick(e)}>Log Out</span></li>
                            </ul>
                        </nav>
                    <div className="col-1"></div>
                </div>
                { this.getHeaderContent()}

                <ul className="button-bar">
                    {(this.state.showHeaderSizeToggle) ?
                        <li>
                            <button className="btn btn-sm btn-secondary btn-collapse" onClick={this.headerToggle} title="Collapse/Expand Header"><i class="material-icons">unfold_more</i></button>
                        </li>
                        :
                        null
                    }

                    <li>
                        <button className="btn btn-sm btn-secondary btn-video" onClick="" title="Tutorial Video"><i class="material-icons">videocam</i></button>
                    </li>
                    <li>
                        <button className="btn btn-sm btn-primary btn-help" onClick="/help" title="Help/FAQs"><i class="material-icons">contact_support</i> Help</button>
                    </li>
                </ul>
            </div>
           
        </header>
        )
    }
})
