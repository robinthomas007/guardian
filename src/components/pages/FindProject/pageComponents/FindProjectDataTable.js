import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AdminStatusDropdown from '../pageComponents/AdminStatusDropdown';
import LoadingImg from 'component_library/LoadingImg';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';
import moment from 'moment';
import ExtendedTracks from './ExtendedTracks';
class FindProjectDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeSortColumn: 'last_updated',
      activeSortDesc: true,
      activeHover: null,
      showloader: false,
      expandedTracks: {},
    };

    this.handleSortDisplay = this.handleSortDisplay.bind(this);
  }

  expandTracks = (projectID, tracks) => {
    const { expandedTracks } = this.state;
    this.setState({ expandedTracks: { ...expandedTracks, [projectID]: tracks } });
  };

  shrinkTracks = projectID => {
    const { expandedTracks } = this.state;
    let { [projectID]: _omit, ...result } = expandedTracks;
    this.setState({ expandedTracks: result });
  };

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
        className={
          this.state.activeHover === columnID ? 'material-icons' : 'material-icons invisible'
        }
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
        showNotyInfo(this.props.t('search:NotyInfo'));
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
        showNotyAutoError(this.props.t('search:NotyError'));
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
          <React.Fragment key={i}>
            <tr>
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
                {moment.utc(project.projectLastModified).format('MM-DD-YYYY hh:mm A')} UTC
              </td>
              <td onClick={() => this.handleRowClick(project.projectID)}>{project.projectTitle}</td>
              <td onClick={() => this.handleRowClick(project.projectID)}>
                {project.projectArtistName}
              </td>
              <td onClick={() => this.handleRowClick(project.projectID)}>
                {project.projectReleasingLabel}
              </td>
              <td onClick={() => this.handleRowClick(project.projectID)}>
                {project.projectReleaseDate
                  ? `${moment.utc(project.projectReleaseDate).format('MM-DD-YYYY hh:mm A')} UTC`
                  : 'TBD'}
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
              <td className="text-nowrap">
                <button
                  className="btn btn-sm btn-secondary btn-collapse"
                  onClick={() => this.expandTracks(project.projectID, [])}
                  title="Comment"
                  type="button"
                >
                  {9}
                  <i className={`material-icons`}>arrow_drop_down</i>
                </button>
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
            {this.state.expandedTracks[project.projectID] ? (
              <ExtendedTracks
                projectID={project.projectID}
                handleClose={this.shrinkTracks}
                tracks={[]}
              />
            ) : null}
          </React.Fragment>
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
    const { t } = this.props;
    return (
      <thead style={{ position: 'sticky', top: '155px', background: '#fff' }}>
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
          {this.props.userData.IsAdmin ? (
            <th className="text-center">{t('search:Actions')}</th>
          ) : null}
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'last_updated')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'last_updated')}
            onClick={id => this.handleTableSort('last_updated')}
          >
            {t('search:LastUpdate')}
            {this.handleSortDisplay('last_updated')}
            <i
              className={
                this.state.activeHover === 'last_updated'
                  ? 'material-icons'
                  : 'material-icons invisible'
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
            {t('search:ProjectTitle')}
            {this.handleSortDisplay('title')}
            <i
              className={
                this.state.activeHover === 'title' ? 'material-icons' : 'material-icons invisible'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'artist')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'artist')}
            onClick={id => this.handleTableSort('artist')}
          >
            {t('search:Artist')}
            {this.handleSortDisplay('artist')}
            <i
              className={
                this.state.activeHover === 'artist' ? 'material-icons' : 'material-icons invisible'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'label')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'label')}
            onClick={id => this.handleTableSort('label')}
          >
            {t('search:Label')}
            {this.handleSortDisplay('label')}
            <i
              className={
                this.state.activeHover === 'label' ? 'material-icons' : 'material-icons invisible'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'release_date')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'release_date')}
            onClick={id => this.handleTableSort('release_date')}
          >
            {t('search:ReleaseDate')}
            {this.handleSortDisplay('release_date')}
            <i
              className={
                this.state.activeHover === 'release_date'
                  ? 'material-icons'
                  : 'material-icons invisible'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th className="status text-center">{t('search:Tracks')}</th>
          <th
            className="text-nowrap text-center sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'status')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'status')}
            onClick={id => this.handleTableSort('status')}
          >
            {t('search:Status')}
            {this.handleSortDisplay('status')}
            <i
              className={
                this.state.activeHover === 'status' ? 'material-icons' : 'material-icons invisible'
              }
            >
              arrow_drop_up
            </i>
          </th>

          <th className="status text-center">{t('search:Audio')}</th>
          <th className="status text-center">{t('search:Tracks')}</th>
          <th className="status text-center">{t('search:Rights')}</th>
          <th className="status text-center">{t('search:Blocking')}</th>
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
        <Table className="search-table find-a-project-table responsive">
          {this.getDataTable()}
          <tbody>{this.renderProjects()}</tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(FindProjectDataTable);
