import React, { Component } from 'react';
import { convertToLocaleTime } from '../../../Utils';
import {Table, Grid, Button, Form, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 
import { withRouter } from 'react-router-dom';

class FindProjectDataTable extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data : []
		}
    }

    checkProjectStepStatus = (stepStatus) => {
        if(stepStatus) {
            return(
                <label className="custom-checkbox">
                    <input disabled type="checkbox" checked/>
                    <span className="static-checkmark"></span>
                </label> 
            )
        } else {
            return(
                <i className="material-icons">block</i>
            )
        }
    }

	handleRowClick = (projectID) => {
		this.props.history.push('/reviewSubmit/' + projectID)
	}

    renderProjects() {
        const tableRows = this.props.data.map( (project, i) => {
            return(
                <tr className="d-flex" key={i} onClick={ () => this.handleRowClick(project.projectID) }>
                    <td className="col-1 text-center"><button className="btn btn-secondary"><i class="material-icons">cloud_download</i></button></td>
                    <td className="col-2">{project.projectTitle}</td>
                    <td className="col-1">{project.projectArtistName}</td>
                    <td className="col-1">{project.projectReleasingLabel}</td>
                    <td className="col-1 text-center">{convertToLocaleTime(project.projectLastModified)}</td>
                    <td className="col-1 status text-nowrap"><span>In Progress</span></td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep1Complete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep2Complete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep3Complete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep4Complete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep5Complete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isStep6Complete)}</td>
                </tr>
            )
        })

        return(tableRows)
    }

    getDataTable = () => {
        return(
            <Table className="search-table">
                <thead>
                    <tr className='d-flex'>
                        <th className="col-1 text-center">Download</th>
                        <th className="col-2 text-nowrap">Project Title</th>
                        <th className="col-1">Artist</th>
                        <th className="col-1">Label</th>
                        <th className="col-1 text-center">Last Update</th>
                        <th className="col-1">Status</th>
                        <th className="status text-center">Project</th>
                        <th className="status text-center">Contacts</th>
                        <th className="status text-center">Audio</th>
                        <th className="status text-center">Tracks</th>
                        <th className="status text-center">Territories</th>
                        <th className="status text-center">Blocking</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderProjects()}
                </tbody>
            </Table>
        )
    };

    componentDidMount() {
        this.setState( {data : this.props.data} )
    }

    render() {
        return(
            this.getDataTable()
        )
    }
}

export default withRouter(FindProjectDataTable);