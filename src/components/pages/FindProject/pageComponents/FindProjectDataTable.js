import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AdminStatusDropdown from '../pageComponents/AdminStatusDropdown';
import LoadingImg from '../../../ui/LoadingImg';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';
import moment from 'moment';

class FindProjectDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeSortColumn: 'last_updated',
      activeSortDesc: true,
      activeHover: null,
      showloader: false,
    };

    this.handleSortDisplay = this.handleSortDisplay.bind(this);
  }

  checkProjectStepStatus = stepStatus => {
    return stepStatus ? (
      <i className="material-icons success">verified_user</i>
    ) : (
      <i className="material-icons">block</i>
    );
  };

  handleRowClick = projectID => {
    this.props.history.push('/reviewSubmit/' + projectID);
  };

  handleTableSort = columnID => {
    let sortDesc = this.state.activeSortDesc;
    if (this.state.activeSortColumn === columnID) {
      sortDesc = !sortDesc;
    } else if (columnID === 'last_updated') {
      sortDesc = true;
    } else {
      sortDesc = false;
    }

    this.setState(
      {
        activeHover: null,
        activeSortColumn: columnID,
        activeSortDesc: sortDesc,
      },
      () => {
        this.props.handleColumnSort(columnID, sortDesc ? 'desc' : 'asc');
      },
    );
  };

  handleSortDisplay = columnID => {
    return this.state.activeSortColumn === columnID ? (
      this.state.activeSortDesc ? (
        <i className={'material-icons'}>arrow_drop_down</i>
      ) : (
        <i className={'material-icons'}>arrow_drop_up</i>
      )
    ) : (
      ''
    );
  };

  handleMouseOver = (e, columnID) => {
    return this.state.activeSortColumn !== columnID
      ? this.setState({ activeHover: columnID })
      : null;
  };

  handleMouseOut = (e, columnID) => {
    this.setState({ activeHover: null });
  };

  handleHoverDisplay = columnID => {
    return (
      <i
        className={this.state.activeHover === columnID ? 'material-icons' : 'material-icons d-none'}
      >
        arrow_drop_up
      </i>
    );
  };

  handleProjectDownload = (projectID, projectFileName) => {
    this.setState({ showloader: true });

    const user = JSON.parse(sessionStorage.getItem('user'));

    fetch(window.env.api.url + '/media/api/Submit?projectid=' + projectID, {
      method: 'GET',
      headers: new Headers({
        Authorization: sessionStorage.getItem('accessToken'),
        'User-Email': user.email,
      }),
    })
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = projectFileName;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
        this.setState({ showloader: false });
      });
  };

  handleAdminStatusChange = (data, project) => {
    const projectIds = [];
    this.props.data.Projects.forEach(item => {
      let checkName = `check_${item.projectID}`;
      if (this.state[checkName]) {
        projectIds.push(item.projectID);
      }
      this.setState({ [checkName]: null });
    });
    if (projectIds.length === 0) {
      projectIds.push(project.projectID);
    }
    this.props.handleAdminStatusChange(data, projectIds);
    this.setState({ selectAllItem: null });
  };

  handleProjectReminder = projectID => {
    this.setState({ showloader: true });

    const user = JSON.parse(sessionStorage.getItem('user'));

    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = {
      ProjectID: projectID,
    };

    fetch(window.env.api.url + '/project/reminder', {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify(fetchBody),
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        this.setState({ showloader: false });
        showNotyInfo('Your project reminder has been successfully sent.');
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
        showNotyAutoError('Your project reminder encountered an error, please try again.');
      });
  };

  checkboxChange = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  getAdminButtons = project => {
    return (
      <td className="text-center">
        {parseInt(project.statusID) !== 1 ? (
          <button
            onClick={() =>
              this.handleProjectDownload(project.projectID, project.submissionFileName)
            }
            className="btn btn-secondary"
          >
            <i className="material-icons">cloud_download</i>
          </button>
        ) : null}
        {parseInt(project.statusID) === 1 ? (
          <button
            onClick={() =>
              this.handleProjectReminder(project.projectID, project.submissionFileName)
            }
            className="btn btn-secondary"
          >
            <i className="material-icons">alarm</i>
          </button>
        ) : null}
      </td>
    );
  };

  renderProjects() {
    if (this.props.data.Projects) {
      const tableRows = this.props.data.Projects.map((project, i) => {
        let colour = '';
        if (project.projectReleaseDate && project.projectCreatedDate) {
          if (
            moment(project.projectReleaseDate).format('YYYY-MM-DD') <=
            moment(project.projectCreatedDate).format('YYYY-MM-DD')
          ) {
            colour = 'gray-shade';
          }
        }
        return (
          <tr key={i}>
            <td>
              <div className="select-all">
                <label className="custom-checkbox">
                  <input
                    onChange={this.checkboxChange}
                    className="track-multi-drag-check"
                    checked={this.state[`check_${project.projectID}`]}
                    type="checkbox"
                    id="selectAll"
                    name={`check_${project.projectID}`}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </td>
            {this.props.userData.IsAdmin ? this.getAdminButtons(project) : null}
            <td onClick={() => this.handleRowClick(project.projectID)}>
              {moment.utc(project.projectLastModified).format('DD-MM-YYYY hh:mm A')} UTC
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)}>{project.projectTitle}</td>
            <td onClick={() => this.handleRowClick(project.projectID)}>
              {project.projectArtistName}
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)}>
              {project.projectReleasingLabel}
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)}>
              {moment.utc(project.projectReleaseDate).format('DD-MM-YYYY hh:mm A')} UTC
            </td>
            <td
              onClick={() =>
                !this.props.userData.IsAdmin ? this.handleRowClick(project.projectID) : null
              }
              className="status text-nowrap"
            >
              <span>
                {this.props.userData.IsAdmin ? (
                  <AdminStatusDropdown
                    onChange={this.handleAdminStatusChange}
                    project={project}
                    selectedText={project.status}
                    selectedID={project.statusID}
                    options={this.props.data.Facets.StatusFacets}
                  />
                ) : (
                  project.status
                )}
              </span>
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className={`status text-center ${colour}`}
            >
              {this.checkProjectStepStatus(project.isAudioFilesComplete)}
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className="status text-center"
            >
              {this.checkProjectStepStatus(project.isTrackInfoComplete)}
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className={`status text-center ${colour}`}
            >
              {this.checkProjectStepStatus(project.isTerritorialRightsComplete)}
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className="status text-center"
            >
              {this.checkProjectStepStatus(project.isBlockingPoliciesComplete)}
            </td>
          </tr>
        );
      });
      return tableRows;
    }
  }

  selectAll = e => {
    const { selectAllItem } = this.state;
    const { Projects } = this.props.data;
    for (let i = 0; i < Projects.length; i++) {
      let checkName = `check_${Projects[i].projectID}`;
      if (!selectAllItem) {
        this.setState({ [checkName]: true });
      } else {
        this.setState({ [checkName]: false });
      }
    }
    this.setState({
      selectAllItem: !selectAllItem,
    });
  };

  getDataTable = () => {
    return (
      <thead>
        <tr>
          <th>
            <div className="select-all">
              <label className="custom-checkbox">
                <input
                  onChange={this.selectAll}
                  className="track-multi-drag-check"
                  checked={this.state.selectAllItem}
                  type="checkbox"
                  id="selectAll"
                  name="selectAll"
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </th>
          {this.props.userData.IsAdmin ? <th className="text-center">Actions</th> : null}
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'last_updated')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'last_updated')}
            onClick={id => this.handleTableSort('last_updated')}
          >
            Last Update{this.handleSortDisplay('last_updated')}
            <i
              className={
                this.state.activeHover === 'last_updated'
                  ? 'material-icons'
                  : 'material-icons d-none'
              }
            >
              arrow_drop_down
            </i>
          </th>
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'title')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'title')}
            onClick={id => this.handleTableSort('title')}
          >
            Project Title{this.handleSortDisplay('title')}
            <i
              className={
                this.state.activeHover === 'title' ? 'material-icons' : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'artist')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'artist')}
            onClick={id => this.handleTableSort('artist')}
          >
            Artist{this.handleSortDisplay('artist')}
            <i
              className={
                this.state.activeHover === 'artist' ? 'material-icons' : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'label')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'label')}
            onClick={id => this.handleTableSort('label')}
          >
            Label{this.handleSortDisplay('label')}
            <i
              className={
                this.state.activeHover === 'label' ? 'material-icons' : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'release_dates')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'release_dates')}
            onClick={id => this.handleTableSort('release_dates')}
          >
            Release Date{this.handleSortDisplay('release_dates')}
            <i
              className={
                this.state.activeHover === 'release_dates'
                  ? 'material-icons'
                  : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="sortable pad-lft-20"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'status')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'status')}
            onClick={id => this.handleTableSort('status')}
          >
            Status{this.handleSortDisplay('status')}
            <i
              className={
                this.state.activeHover === 'status' ? 'material-icons' : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>

          <th className="status text-center">Audio</th>
          <th className="status text-center">Tracks</th>
          <th className="status text-center">Rights</th>
          <th className="status text-center">Blocking</th>
        </tr>
      </thead>
    );
  };

  componentDidMount() {
    this.setState({
      data: this.props.data.Projects,
      userData: this.props.userData,
    });
  }

  render() {
    return (
      <div>
        <LoadingImg show={this.state.showloader} />
        <Table className="search-table find-a-project-table">
          {this.getDataTable()}
          <tbody>{this.renderProjects()}</tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(FindProjectDataTable);
