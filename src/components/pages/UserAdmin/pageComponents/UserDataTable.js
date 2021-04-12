import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class UserDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHover: '',
      sortColumnID: 'date_created',
      sortColumnOrder: 'desc',
    };
  }

  handleMouseOver = (e, id) => {
    this.setState({ activeHover: id });
  };

  handleMouseOut = () => {
    this.setState({ activeHover: null });
  };

  handleTableSort = columnID => {
    const defaultSortOrder = columnID === 'date_created' ? 'asc' : 'desc';
    if (this.state.sortColumnID === columnID && this.state.sortColumnOrder === 'asc') {
      this.setState({ sortColumnID: columnID, sortColumnOrder: 'desc' }, () =>
        this.props.handleColumnSort(columnID, 'desc', this.props.pageView),
      );
    } else if (this.state.sortColumnID === columnID && this.state.sortColumnOrder === 'desc') {
      this.setState({ sortColumnID: columnID, sortColumnOrder: 'asc' }, () =>
        this.props.handleColumnSort(columnID, 'asc', this.props.pageView),
      );
    } else {
      this.setState({ sortColumnID: columnID }, () =>
        this.props.handleColumnSort(columnID, defaultSortOrder, this.props.pageView),
      );
    }
  };

  getUsersDataRows = () => {
    const dataRows = this.props.data.map((user, i) => {
      return (
        <tr key={i} className="d-flex w-100">
          <td className="col-2">
            {this.props.pageView === 'requesting' ? user.dateRequested : user.dateAdded}
          </td>
          <td className="col-2">{user.firstName}</td>
          <td className="col-2">{user.lastName}</td>
          <td className="col-2">{user.email}</td>
          <td className="col-2">{user.primaryLabel}</td>
          {this.getPageButtons(user)}
        </tr>
      );
    });
    return dataRows;
  };

  getPageButtons = user => {
    return (
      <td className="text-center">
        {this.props.pageView === 'requesting' ? (
          <>
            <Button
              onClick={() => this.props.approveDenyUser('approve', user)}
              className={'btn btn-primary'}
            >
              <i className="material-icons">check</i> Approve
            </Button>
            <Button
              onClick={() => this.props.approveDenyUser('deny', user)}
              className={'btn btn-secondary'}
            >
              <i className="material-icons">block</i> Deny
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => this.props.showUserEditModal(user)}
              className={'btn btn-primary'}
            >
              <i className="material-icons">edit</i> Edit
            </Button>

            {user.status.toUpperCase() === 'ACTIVE' ? (
              <Button
                onClick={() => this.props.revokeReinstateUser('revoke', user)}
                className={'btn btn-secondary'}
              >
                <i className="material-icons">block</i> Revoke
              </Button>
            ) : (
              <Button
                onClick={() => this.props.revokeReinstateUser('reinstate', user)}
                className={'btn btn-secondary'}
              >
                <i className="material-icons">check</i> Reinstate
              </Button>
            )}
          </>
        )}
      </td>
    );
  };

  handleSortCaratDisplay = columnID => {
    const defaultSortOrder = columnID === 'date_created' ? 'arrow_drop_down' : 'arrow_drop_up';

    if (this.state.sortColumnID === columnID) {
      if (this.state.sortColumnOrder === 'asc') {
        return 'arrow_drop_up';
      } else {
        return 'arrow_drop_down';
      }
    } else {
      return defaultSortOrder;
    }
  };

  render() {
    return (
      <Table>
        <thead>
          <tr className="d-flex w-100">
            <th
              className="col-2 text-nowrap sortable"
              onMouseOver={(e, columnID) => this.handleMouseOver(e, 'date_created')}
              onMouseOut={(e, columnID) => this.handleMouseOut(e, 'date_created')}
              onClick={id => this.handleTableSort('date_created')}
            >
              Request Date
              <i
                className={
                  this.state.activeHover === 'date_created' ||
                  this.state.sortColumnID === 'date_created'
                    ? 'material-icons'
                    : 'material-icons d-none'
                }
              >
                {this.handleSortCaratDisplay('date_created')}
              </i>
            </th>
            <th
              className="col-2 text-nowrap sortable"
              onMouseOver={(e, columnID) => this.handleMouseOver(e, 'first_name')}
              onMouseOut={(e, columnID) => this.handleMouseOut(e, 'first_name')}
              onClick={id => this.handleTableSort('first_name')}
            >
              First Name
              <i
                className={
                  this.state.activeHover === 'first_name' ||
                  this.state.sortColumnID === 'first_name'
                    ? 'material-icons'
                    : 'material-icons d-none'
                }
              >
                {this.handleSortCaratDisplay('first_name')}
              </i>
            </th>
            <th
              className="col-2 sortable"
              onMouseOver={(e, columnID) => this.handleMouseOver(e, 'last_name')}
              onMouseOut={(e, columnID) => this.handleMouseOut(e, 'last_name')}
              onClick={id => this.handleTableSort('last_name')}
            >
              Last Name
              <i
                className={
                  this.state.activeHover === 'last_name' || this.state.sortColumnID === 'last_name'
                    ? 'material-icons'
                    : 'material-icons d-none'
                }
              >
                {this.handleSortCaratDisplay('last_name')}
              </i>
            </th>
            <th
              className="col-2 sortable"
              onMouseOver={(e, columnID) => this.handleMouseOver(e, 'email')}
              onMouseOut={(e, columnID) => this.handleMouseOut(e, 'email')}
              onClick={id => this.handleTableSort('email')}
            >
              Email
              <i
                className={
                  this.state.activeHover === 'email' || this.state.sortColumnID === 'email'
                    ? 'material-icons'
                    : 'material-icons d-none'
                }
              >
                {this.handleSortCaratDisplay('email')}
              </i>
            </th>
            <th
              className="col-2 sortable"
              onMouseOver={(e, columnID) => this.handleMouseOver(e, 'label')}
              onMouseOut={(e, columnID) => this.handleMouseOut(e, 'label')}
              onClick={id => this.handleTableSort('label')}
            >
              Label/Co.
              <i
                className={
                  this.state.activeHover === 'label' || this.state.sortColumnID === 'label'
                    ? 'material-icons'
                    : 'material-icons d-none'
                }
              >
                {this.handleSortCaratDisplay('label')}
              </i>
            </th>
            <th className="col-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>{this.getUsersDataRows()}</tbody>
      </Table>
    );
  }
}

export default UserDataTable;
