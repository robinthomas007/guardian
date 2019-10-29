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
            activeSortDesc : true,
            activeHover : null,

        }

        this.handleSortDisplay = this.handleSortDisplay.bind(this);
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
            activeHover : null,
            activeSortColumn : columnID,
            activeSortDesc : sortDesc
        }, () => { this.props.handleColumnSort(columnID, (sortDesc) ? 'desc' : 'asc') })
    }

    handleSortDisplay = (columnID) => {
        return(
            (this.state.activeSortColumn === columnID) ? ((this.state.activeSortDesc) ? <i className={"material-icons"}>arrow_drop_down</i> : <i className={"material-icons"}>arrow_drop_up</i>) : ''
        )
    }

    handleMouseOver = (e, columnID) => {
        return (
            (this.state.activeSortColumn !== columnID) ? this.setState( {activeHover : columnID} ) : null
        )
    }

    handleMouseOut = (e, columnID) => {
        this.setState( {activeHover : null} )
    }

    handleHoverDisplay = (columnID) => {
        return(
            <i className={(this.state.activeHover === columnID) ? "material-icons" : "material-icons d-none"}>arrow_drop_up</i>
        )
    }

    handleProjectDownload = (projectID, projectFileName) => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        fetch("https://api-dev.umusic.net/guardian-media/api/Submit?projectid=" + projectID, {
            method: 'GET',
            headers: new Headers({
                "Authorization" : sessionStorage.getItem('accessToken'),
                "User-Email" : user.email,
            })
        }).then (response =>
            {
                return(response.blob())
            }
       ).then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
                a.href = url;
                a.download = projectFileName;
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
        });
    };

    renderProjects() {
        const tableRows = this.props.data.map( (project, i) => {
            return(
                <tr className="d-flex w-100" key={i}>
                    { (this.props.userData.IsAdmin) ? <td className="col-1 text-center">{parseInt(project.statusID) !== 1 ? <button onClick={ () => this.handleProjectDownload(project.projectID, project.submissionFileName)} className="btn btn-secondary"><i className="material-icons">cloud_download</i></button> : null} </td> : ''}
                    <td onClick={ () => this.handleRowClick(project.projectID) } className="col-1 text-center">{convertToLocaleTime(project.projectLastModified)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="col-2">{project.projectTitle}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="col-2">{project.projectArtistName}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="col-1">{project.projectReleasingLabel}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="col-1 status text-nowrap"><span>{project.status}</span></td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isReleaseInfoComplete)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isProjectContactsComplete)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isAudioFilesComplete)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isTrackInfoComplete)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isTerritorialRightsComplete)}</td>
                    <td onClick={ () => this.handleRowClick(project.projectID) }className="status text-center">{this.checkProjectStepStatus(project.isBlockingPoliciesComplete)}</td>
                </tr>
            )
        })

        return(tableRows)
    }

    getDataTable = () => {
        return(
            <Table className="search-table">
                <thead>
                    <tr className='d-flex w-100'>
                        { (this.props.userData.IsAdmin) ? <th className="col-1 text-center">Download</th> : null}
                        <th
                            className="col-1 sortable"
                            onMouseOver={ (e, columnID) => this.handleMouseOver(e, 'last_updated')}
                            onMouseOut={ (e, columnID) => this.handleMouseOut(e, 'last_updated')}
                            onClick={(id) => this.handleTableSort('last_updated')}
                            >Last Update{this.handleSortDisplay('last_updated')}<i className={(this.state.activeHover === 'last_updated') ? "material-icons" : "material-icons d-none"}>arrow_drop_down</i></th>
                        <th
                            className="col-2 text-nowrap sortable"
                            onMouseOver={ (e, columnID) => this.handleMouseOver(e, 'title')}
                            onMouseOut={ (e, columnID) => this.handleMouseOut(e, 'title')}
                            onClick={(id) => this.handleTableSort('title')}
                        >Project Title{this.handleSortDisplay('title')}<i className={(this.state.activeHover === 'title') ? "material-icons" : "material-icons d-none"}>arrow_drop_up</i></th>
                        <th className="col-2 sortable"
                            onMouseOver={ (e, columnID) => this.handleMouseOver(e, 'artist')}
                            onMouseOut={ (e, columnID) => this.handleMouseOut(e, 'artist')}
                            onClick={(id) => this.handleTableSort('artist')}
                        >Artist{this.handleSortDisplay('artist')}<i className={(this.state.activeHover === 'artist') ? "material-icons" : "material-icons d-none"}>arrow_drop_up</i></th>
                        <th className="col-1 sortable"
                            onMouseOver={ (e, columnID) => this.handleMouseOver(e, 'label')}
                            onMouseOut={ (e, columnID) => this.handleMouseOut(e, 'label')}
                            onClick={(id) => this.handleTableSort('label')}
                        >Label{this.handleSortDisplay('label')}<i className={(this.state.activeHover === 'label') ? "material-icons" : "material-icons d-none"}>arrow_drop_up</i></th>
                        <th className="col-1 sortable"
                            onMouseOver={ (e, columnID) => this.handleMouseOver(e, 'status')}
                            onMouseOut={ (e, columnID) => this.handleMouseOut(e, 'status')}
                            onClick={(id) => this.handleTableSort('status')}
                        >Status{this.handleSortDisplay('status')}<i className={(this.state.activeHover === 'status') ? "material-icons" : "material-icons d-none"}>arrow_drop_up</i></th>
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
        this.setState( {
            data : this.props.data,
            userData : this.props.userData
        } )
    }

    render() {
        return(
            this.getDataTable()
        )
    }
}

export default withRouter(FindProjectDataTable);
