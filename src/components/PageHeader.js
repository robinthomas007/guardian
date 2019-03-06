import React, { Component } from 'react';

const mockData = require('../mockData.json');

class PageHeader extends Component {

    constructor() {
        super();

        this.state = {
            user : {}
        };
    }

    componentDidMount() {
        console.log('mounted')

        const headers = new Headers(
            {
                'X-FP-API-KEY': ''
            }
        )

        fetch ('https://7qfuflvtx0.execute-api.us-east-1.amazonaws.com/dev/login', {

            method : 'POST',
            mode : 'cors',
            headers : headers,
            body : {
                "UserToken" : "0"
            }

            }).then (
                function(response) {
                    return response.json();
                }
            )
            .then (
                function (userJSON) {
                    console.log(JSON.stringify(userJSON))
                }
            )
            .catch(
                error => console.error(error)
            );
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