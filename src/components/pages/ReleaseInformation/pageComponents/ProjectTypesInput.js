import React, { Component } from 'react';
import {Table, Grid, Button, Form, Alert } from 'react-bootstrap'; 

class ProjectTypesInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let projectTypeOptions = ''
        if(this.props.user && this.props.user.ProjectTypes) {
            projectTypeOptions = this.props.user.ProjectTypes.map( (projectType, i) =>
                <option key={i} value={projectType.id}>{projectType.name}</option>
            )
        }
        return(
            <Form.Control 
                id="projectTypeID" 
                as="select" 
                className='col-form-label dropdown col-3' 
                value={ this.props.value}
                onChange={this.props.onChange}
            >
            {projectTypeOptions}
        </Form.Control>
        )
    }
}

export default ProjectTypesInput;