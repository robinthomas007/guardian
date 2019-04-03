import React, { Component } from 'react';

const mockData = require('../mockData.json');

class PageHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {}
        };
    };
   

    handleProjectCloseClick = (event) => {
        event.preventDefault();

        //clear the local storage
        localStorage.removeItem('projectData')
    };

    render() {

        return(
            <div className="row">
                <div className="col 4">
                    <h1>{mockData.project.projectTitle}</h1>
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

export default PageHeader;