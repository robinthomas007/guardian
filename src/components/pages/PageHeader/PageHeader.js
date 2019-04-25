import React, { Component } from 'react';
import './PageHeader.css'
import { withRouter } from "react-router";

const mockData = require('../../../mockData.json');

class PageHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {},
            projectTitle : props.projectTitle

        };
    }
   

    handleProjectCloseClick = (event) => {
        event.preventDefault();

        //clear the local storage
        localStorage.removeItem('projectData')

        this.props.history.push('/findProject')

    }

    getProjectTitle = () => {
        if(this.props.projectTitle) {
            return(
                <h1>{this.props.projectTitle}</h1>
            )
        } else {
            return(
                <h1></h1>
            )
        }
    }

    render() {

        return(
            <div className="row">
                <div className="col 4">
                    {this.getProjectTitle()}
                </div>
                <div className="col-7">
                    <span className="project-right">
                        <span className="project-status">
                            <label>STATUS:</label>{mockData.project.projectStatus}
                        </span>
                        <button 
                            className="close-project btn" 
                            onClick={this.handleProjectCloseClick}
                        >Close Project</button>
                    </span>
                </div> 
            </div>
        )
    }
};

export default withRouter(PageHeader);