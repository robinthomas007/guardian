import React, { Component } from 'react';
import { convertToLocaleTime } from '../../../Utils';
import {Table, Grid, Button, Form, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 
import { withRouter } from 'react-router-dom';

class FindProjectDataTable extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data : [],
            activeSortColumn : 'last_updated',
            activeSortDesc : true
		}
    }

    checkProjectStepStatus = (stepStatus) => {
        return ( (stepStatus) ? <i className="material-icons success">verified_user</i> : <i className="material-icons">block</i>)
    }

	handleRowClick = (projectID) => {
		this.props.history.push('/reviewSubmit/' + projectID)
	}

    handleTableSort = (columnID) => {
        let sortDesc = this.state.activeSortDesc;
        if(this.state.activeSortColumn === columnID) {
            sortDesc = !sortDesc;
        } else if (columnID === 'last_updated') {
            sortDesc = true;
        } else {
            sortDesc = false;
        }

        this.setState( {
            activeSortColumn : columnID,
            activeSortDesc : sortDesc
        }, () => { this.props.handleColumnSort(columnID, (sortDesc) ? 'desc' : 'asc') })
    }

    handleSortDisplay = (columnID) => {
        return(
            (this.state.activeSortColumn === columnID) ? ((this.state.activeSortDesc) ? <i class="material-icons">arrow_drop_down</i> : <i class="material-icons">arrow_drop_up</i>) : ''
        )
    }

    renderProjects() {
        const tableRows = this.props.data.map( (project, i) => {
            return(
                <tr className="d-flex w-100" key={i} onClick={ () => this.handleRowClick(project.projectID) }>
                    <td className="col-1 text-center"><button className="btn btn-secondary"><i class="material-icons">cloud_download</i></button></td>
                    <td className="col-1 text-center">{convertToLocaleTime(project.projectLastModified)}</td>
                    <td className="col-2">{project.projectTitle}</td>
                    <td className="col-1">{project.projectArtistName}</td>
                    <td className="col-1">{project.projectReleasingLabel}</td>
                    <td className="col-1 status text-nowrap"><span>{project.status}</span></td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isReleaseInfoComplete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isProjectContactsComplete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isAudioFilesComplete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isTrackInfoComplete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isTerritorialRightsComplete)}</td>
                    <td className="status text-center">{this.checkProjectStepStatus(project.isBlockingPoliciesComplete)}</td>
                </tr>
            )
        })
        return(tableRows)
    }

    getDataTable = () => {
        return(
            <div className='table-responsive'>
                <Table className="search-table">
                    <thead>
                        <tr className='d-flex w-100'>
                            <th className="col-1 text-center">Download</th>
                            <th className="col-1 text-center" onClick={(id) => this.handleTableSort('last_updated')}>Last Update{this.handleSortDisplay('last_updated')}</th>
                            <th className="col-2 text-nowrap" id="projectTitleHeader" onClick={(id) => this.handleTableSort('title')}>Project Title{this.handleSortDisplay('title')}</th>
                            <th className="col-1" onClick={(id) => this.handleTableSort('artist')}>Artist{this.handleSortDisplay('artist')}</th>
                            <th className="col-1" onClick={(id) => this.handleTableSort('label')}>Label{this.handleSortDisplay('label')}</th>
                            <th className="col-1" onClick={(id) => this.handleTableSort('status')}>Status{this.handleSortDisplay('status')}</th>
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
            </div>
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