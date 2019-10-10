import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import { withAuth } from '@okta/okta-react';

export default withAuth(class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectID : ''
        }
    }

    handleLogoutClick = (e) => {
        e.preventDefault();
        this.props.auth.logout('/');
        localStorage.clear()
    }

    render() {
        return(
            <header className="row d-flex no-gutters">
                <div className="col-12 align-items-end flex-column flex-grow-1">
                    <div className="row d-flex no-gutters">
                        <div className="col-1"></div>
                        <div className="col-2">
                            <span className="guardian-logo"></span>
                        </div>
                        <div className="nav-bg"></div>
                            <nav className="col-8 d-flex no-gutters justify-content-end">
                                <ul>
                                    <li><NavLink className="steps" to={{pathname: '/newProject'}}>New Project</NavLink></li>
                                    <li><NavLink className="steps" to={{pathname: '/findProject'}}>Find A Project</NavLink></li>
                                    <li><NavLink className="steps" to={{pathname: '/recentProjects'}}>Recent Projects</NavLink></li>
                                    { (this.props.userData.IsAdmin) ? <li><NavLink className="steps" to={{pathname: '/admin'}}>Admin</NavLink></li> : null}
                                    <li> | </li>
                                    <li>Welcome, {this.props.userData.name}</li>
                                    <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
                                </ul>
                            </nav>
                        <div className="col-1"></div>
                    </div>
                    <div className="row d-flex no-gutters project-title">
                        <div className="col-2"></div>
                        <div className="col-9">
                            <div className="row d-flex no-gutters">
                                <div className="col-10 align-self-start">
                                    <h1>Project Title</h1>
                                </div>
                                <div className="col-2 align-self-start">
                                    STATUS: IN PROGRESS
                                </div> 
                            </div>
                        <div className="col-1"></div>
                    </div>
            
                    <div className="row d-flex no-gutters steps-bar">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <ul className="d-flex justify-content-center align-items-stretch">
                                <li id="step-1">


                                    <a href="#" className="active">
                                        <span className="step-description text-nowrap">Release Info</span>
                                        <span className="step">1</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                    <span></span>
                                </li>
                                <li id="step-2">
                                    <a href="">
                                        <span className="step-description text-nowrap">Project Contacts</span>
                                        <span className="step">2</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                    <span></span>
                                </li>
                                <li id="step-3">
                                    <a href="">
                                        <span className="step-description text-nowrap">Audio Files</span>
                                        <span className="step">3</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                    <span></span>
                                </li>
                                <li id="step-4">
                                    <a href="">
                                        <span className="step-description text-nowrap">Track Information</span>
                                        <span className="step">4</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                    <span></span>
                                </li>
                                <li id="step-5">
                                    <a href="">
                                        <span className="step-description text-nowrap">Territorial Rights</span>
                                        <span className="step">5</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                        <span></span>
                                </li>
                                <li id="step-6">
                                    <a href="">
                                        <span className="step-description text-nowrap">Blocking Policies</span>
                                        <span className="step">6</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                                <li className="step-bar">
                                    <span></span>
                                </li>
                                <li id="step-7">
                                    <a href="">
                                        <span className="step-description text-nowrap">Review &amp; Submit</span>
                                        <span className="step">7</span>
                                        <span className="step-arrow"></span>
                                    </a>
                                </li>
                            </ul> 
                        </div>
                        <div className="col-1"></div> 
                    </div>
                </div>
            </div>
        </header>
        )
    }
})
