import React, { Component } from 'react';
import { convertToLocaleTime } from '../../../Utils';
import {Table, Grid, Button, Form, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 
import { withRouter } from 'react-router-dom';

class FindProjectDataTable extends Component {
	constructor(props) {
        super(props);
        this.state = {
    	}
    }

	handleRowClick = (projectID) => {
		this.props.history.push('/reviewSubmit/' + projectID)
	}

    renderProjects() {
        const tableRows = this.props.data.map( (project, i) => {
            return(
                <tr className="row d-flex w-100" key={i} onClick={ () => this.handleRowClick(project.projectID) }>
                    <td className="col-1 text-center"><button className="btn btn-secondary"><i class="material-icons">cloud_download</i></button></td>
                    <td className="col-1 text-center">{convertToLocaleTime(project.projectLastModified)}</td>
                    <td className="col-2">{project.projectTitle}</td>
                    <td className="col-1">{project.projectArtistName}</td>
                    <td className="col-1">{project.projectReleasingLabel}</td>
                    <td className="col-1 status text-nowrap"><span>{project.status}</span></td>
                    <td className="status text-center"><i className="material-icons">{(project.isReleaseInfoComplete) ? 'verified_user' : 'block'}</i></td>
                    <td className="status text-center"><i className="material-icons">{(project.isProjectContactsComplete) ? 'verified_user' : 'block'}</i></td>
                    <td className="status text-center"><i className="material-icons">{(project.isAudioFilesComplete) ? 'verified_user' : 'block'}</i></td>
                    <td className="status text-center"><i className="material-icons">{(project.isTrackInfoComplete) ? 'verified_user' : 'block'}</i></td>
                    <td className="status text-center"><i className="material-icons">{(project.isTerritorialRightsComplete) ? 'verified_user' : 'block'}</i></td>
                    <td className="status text-center"><i className="material-icons">{(project.isBlockingPoliciesComplete) ? 'verified_user' : 'block'}</i></td>
                </tr>
            )
        })
        return(tableRows)
    }

    sortTable = (columnID) => {
        this.props.handleColumnSort(columnID)
    }

    getDataTable = () => {
        return(
            <div className={'table-responsive'}>
                <Table className="search-table">
                    <thead>
                        <tr className='row d-flex w-100'>
                            <th className="col-1 text-center">Download</th>
                            <th className="col-1 text-center" onClick={(id) => this.sortTable('last_updated')}>Last Update</th>
                            <th className="col-2 text-nowrap" id="projectTitleHeader" onClick={(id) => this.sortTable('title')}>Project Title</th>
                            <th className="col-1" onClick={(id) => this.sortTable('artist')}>Artist</th>
                            <th className="col-1" onClick={(id) => this.sortTable('label')}>Label</th>
                            <th className="col-1" onClick={(id) => this.sortTable('')}>Status</th>
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