import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Noty from 'noty';
import LoadingImg from '../../../ui/LoadingImg';
import CommentBox from '../message';

class ProjectInboxDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeSortColumn: 'received',
      activeSortDesc: true,
      activeHover: null,
      showloader: false,
      showCommentBox: false,
      index: 0,
    };

    this.handleSortDisplay = this.handleSortDisplay.bind(this);
  }

  showCommentBox = i => {
    this.setState({ showCommentBox: true, index: i });
  };

  hideCommentBox = () => {
    this.setState({ showCommentBox: false });
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
        className={this.state.activeHover === columnID ? 'material-icons' : 'material-icons d-none'}
      >
        arrow_drop_up
      </i>
    );
  };

  handleProjectDownload = (projectID, projectFileName) => {
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
      });
  };

  handleAdminStatusChange = (data, project) => {
    this.props.handleAdminStatusChange(data, project);
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
        new Noty({
          type: 'success',
          id: 'projectReminderSent',
          text: 'Your project reminder has been successfully sent.',
          theme: 'bootstrap-v4',
          layout: 'top',
          timeout: '3000',
        }).show();
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
        new Noty({
          type: 'error',
          id: 'projectReminderNotSent',
          text: 'Your project reminder encountered an error, please try again.',
          theme: 'bootstrap-v4',
          layout: 'top',
          timeout: '3000',
        }).show();
      });
  };

  getAdminButtons = project => {
    return (
      <td className="col-1 text-center">
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
    const { showCommentBox, index } = this.state;
    const tableRows = [1, 2, 3, 4].map((project, i) => {
      return (
        <React.Fragment>
          <tr className="d-flex w-100" key={i}>
            <td className="col-1 text-center">
              <button
                className="btn btn-sm btn-secondary btn-collapse"
                onClick={() => this.showCommentBox(i)}
                title="Comment"
              >
                <i className={'material-icons'}>message</i>
              </button>
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)} className="col-1">
              5/20/2020
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)} className="col-2">
              Ethan Karp
            </td>
            <td onClick={() => this.handleRowClick(project.projectID)} className="col-2">
              My Awesome Inbox Task
            </td>
            <td className="col-1 status text-nowrap">Notifications Pro</td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className="status text-center"
            >
              Just Chill Baby
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className="status text-center"
            >
              Territorial Rights
            </td>
            <td
              onClick={() => this.handleRowClick(project.projectID)}
              className="status text-center"
            >
              Dude get on these rights!
            </td>
          </tr>
          {showCommentBox && i === index && (
            <div className="">
              <CommentBox handleClose={this.hideCommentBox} />
            </div>
          )}
        </React.Fragment>
      );
    });
    return tableRows;
  }

  getDataTable = () => {
    return (
      <thead>
        <tr className="d-flex w-100">
          <th className="col-1"></th>
          <th
            className="col-1 sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'received')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'received')}
            onClick={id => this.handleTableSort('received')}
          >
            Received{this.handleSortDisplay('received')}
            <i
              className={
                this.state.activeHover === 'received' ? 'material-icons' : 'material-icons d-none'
              }
            >
              arrow_drop_down
            </i>
          </th>
          <th
            className="col-2 text-nowrap sortable"
            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'assigned_by')}
            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'assigned_by')}
            onClick={id => this.handleTableSort('assigned_by')}
          >
            Assigned By{this.handleSortDisplay('assigned_by')}
            <i
              className={
                this.state.activeHover === 'assigned_by'
                  ? 'material-icons'
                  : 'material-icons d-none'
              }
            >
              arrow_drop_up
            </i>
          </th>
          <th
            className="col-2 text-nowrap sortable"
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
            className="col-2 sortable"
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
            className="col-1 sortable"
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
          <th className="status text-center">Section/Tag</th>
          <th className="status text-center">Comment</th>
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
        <Table className="search-table">
          {this.getDataTable()}
          <tbody>{this.renderProjects()}</tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(ProjectInboxDataTable);
