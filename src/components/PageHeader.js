import React, { Component } from 'react';

const mockData = require('../mockData.json');

class PageHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {},
            project : {

            }
        };
    };
   

    handleProjectCloseClick = (event) => {
        event.preventDefault();

        //clear the local storage
        localStorage.removeItem('projectData')
    };

    componentDidMount() {
        this.setState({ project : this.props.data})
    }
    
    render() {

        return(
            <div className="row">
                <div className="col 4">
                    <h1>123{mockData.project.projectTitle}</h1>
                </div>
                <div className="col-7">
                    <span className="project-right">
                        <span className="project-status">
                            <label>STATUS:</label>111{mockData.project.projectStatus}
                        </span>
                        <button 
                            className="close-project btn" 
                            onClick={this.handleProjectCloseClick}
                            id="pageHeadCloseProject"
                        >Close Project</button>
                    </span>
                </div> 
            </div>
        )
    }
};

export default PageHeader;