import React, { Component } from 'react';

const mockData = require('../mockData.json');

class PageHeader extends Component {

    constructor() {
        super();

        this.state = {
            user : {}
        };
    }
   
    render() {
        const closeProject = () => {
            alert('Close Project');
        }

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
                            onClick={closeProject}
                        >Close Project</button>
                    </span>
                </div> 
            </div>
        )
    }
};

export default PageHeader;