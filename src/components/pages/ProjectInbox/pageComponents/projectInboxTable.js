import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import LoadingImg from '../../../ui/LoadingImg';
import CommentBox from '../message';
import { convertToLocaleTime } from '../../../Utils';

class ProjectInboxDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  renderProjects() {
    const { showCommentBox, index } = this.state;
    const { data } = this.props;
    const tableRows =
      data.Notifications &&
      data.Notifications.map((project, i) => {
        return (
          <React.Fragment>
            <tr
              className={`${!project.IsRead ? 'unread' : ''} d-flex w-100 inbox-table`}
              key={i}
              onMouseEnter={() =>
                !project.IsRead ? this.props.readNotification({ NotificationId: project.Id }) : null
              }
            >
              <td className="col-1 text-center">
                <button
                  className="btn btn-sm btn-secondary btn-collapse"
                  onClick={() => this.showCommentBox(i)}
                  title="Comment"
                >
                  <i className={'material-icons'}>message</i>
                </button>
              </td>
              <td className="col-1 text-center">{convertToLocaleTime(project.DateCreated)}</td>
              <td className="col-2">{project.AssignedBy} </td>
              <td className="col-2">{project.ProjectTitle}</td>
              <td className="col-1 status text-nowrap">{project.ProjectArtist}</td>
              <td className="status text-center"> {project.ProjectLabel}</td>
              <td className="status text-center">{project.Step}</td>
              <td className="status text-center">{project.Text}</td>
            </tr>
            {showCommentBox && i === index && (
              <div className="">
                <CommentBox projectID={project.ProjectId} handleClose={this.hideCommentBox} />
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
