import React, { Component } from 'react';
import './PageHeader.css'
import { withRouter } from "react-router";

const mockData = require('../../../mockData.json');

class PageHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {},
            

        };
    }
   

    handleProjectCloseClick = (event) => {
        event.preventDefault();

        //clear the local storage
        localStorage.removeItem('projectData')

        this.props.history.push('/findProject')

    }



    render() {


        return(
            <div className="row">
                <div className="col 8">
                    <h1>{ (this.props.data.Project) ?  this.props.data.Project.projectTitle : "New Project"}</h1>
                </div>
                <div className="col-4">
                    <span className="project-right">
                        <span className="project-status">
                            <label>STATUS:</label> { ((this.props.data.Project) ?  this.props.data.Project.projectStatus : "In Progress").toUpperCase()}
                        </span>
                        <button 
                            id="closeProjectButton"
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