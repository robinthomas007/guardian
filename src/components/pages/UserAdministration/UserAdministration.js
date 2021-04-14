import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, NavLink } from 'react-router-dom';
import { Nav, Alert } from 'react-bootstrap';
import SearchFiltersPanel from './pageComponents/SearchFiltersPanel';
import { REQUESTING, EXISTING } from 'redux/userAdmin/constants';
import {
  showError,
  hideError,
  fetchUsers,
  updateSearchTerm,
  updateReqItems,
  updateReqPagination,
  updateReqSort,
  updateExtItems,
  updateExtPagination,
  updateExtSort,
  changeTab,
  approveDenyUser,
  showUserModal,
  hideUserModal,
  setUserToEdit,
  editUser,
  revokeReinstnateUser,
} from 'redux/userAdmin/actions';
import { fetchLabels } from 'redux/labels/actions';
import UserResultView from './pageComponents/UserResultView';
import UserEditModal from './pageComponents/UserEditModal';
//import ResultsPerPageDropDown from './pageComponents/ResultsPerPageDropDown.js';

class UserAdministration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCount: [10, 25, 50],
      searchTerm: '',
      filters: [],
      activeKey: 'requesting',
      showFiltersPanel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUserSearch = this.handleUserSearch.bind(this);
    this.setRequesting = this.setRequesting.bind(this);
    this.setExisting = this.setExisting.bind(this);
  }

  componentDidMount() {
    this.props.changeTab(this.props.match.params.userType); // Note route for this page is /admin/:userType which is "requesting" or "existing"
    this.setState({ activeKey: this.props.match.params.userType });
    this.handleUserSearch();
    this.props.fetchLabels();
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
    this.props.updateSearchTerm(event.target.value);
  }

  handleUserSearch() {
    this.props.fetchUsers();
  }

  handleFiltersPanelView() {
    this.state.showFiltersPane
      ? this.setState({ showFiltersPanel: false })
      : this.setState({ showFiltersPanel: true });
  }

  setRequesting() {
    this.setState({ activeKey: REQUESTING });
    this.props.changeTab(REQUESTING); // Note route for this page is /admin/:userType which is "requesting" or "existing"
  }

  setExisting() {
    this.setState({ activeKey: EXISTING });
    this.props.changeTab(EXISTING); // Note route for this page is /admin/:userType which is "requesting" or "existing"
  }

  renderEmptyRedirect() {
    if (!this.props.match.params.userType) return <Redirect to="/admin/requesting" />;
  }

  renderResultView() {
    if (this.props.tab === EXISTING) {
      return (
        <UserResultView
          type={'existing'}
          viewCount={this.state.viewCount}
          pageNumber={this.props.existingUserState.pageNumber}
          totalItems={this.props.existingUserState.totalItems}
          itemsPerPage={this.props.existingUserState.itemsPerPage}
          userList={this.props.existingUserState.userList}
          handlePaginationChange={this.props.updateExtPagination}
          setItemsPerPage={this.props.updateExtItems}
          handleColumnSort={this.props.updateExtSort}
          approveDenyUser={this.props.approveDenyUser}
          showUserModal={this.props.showUserModal}
          setUserToEdit={this.props.setUserToEdit}
          revokeReinstnateUser={this.props.revokeReinstnateUser}
        />
      );
    }
    return (
      <UserResultView
        type={'requesting'}
        viewCount={this.state.viewCount}
        pageNumber={this.props.requestingUserState.pageNumber}
        totalItems={this.props.requestingUserState.totalItems}
        itemsPerPage={this.props.requestingUserState.itemsPerPage}
        userList={this.props.requestingUserState.userList}
        handlePaginationChange={this.props.updateReqPagination}
        setItemsPerPage={this.props.updateReqItems}
        handleColumnSort={this.props.updateReqSort}
        approveDenyUser={this.props.approveDenyUser}
        showUserModal={this.props.showUserModal}
        setUserToEdit={this.props.setUserToEdit}
        revokeReinstnateUser={this.props.revokeReinstnateUser}
      />
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <Alert variant="danger" onClose={this.props.hideError} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{this.props.error}</p>
        </Alert>
      );
    }
  }

  render() {
    return (
      <div className="col-10">
        {this.renderEmptyRedirect()}

        <UserEditModal
          show={this.props.isShowingModal}
          onHide={this.props.hideUserModal}
          user={this.props.userToEdit}
          editUser={this.props.editUser}
          labels={this.props.lables}
        ></UserEditModal>

        <div>
          <div className="row d-flex no-gutters">
            <div className="col-12">
              <h2>User Administration</h2>
              <p>Search for an existing user or a user that is requesting access.</p>
            </div>
          </div>

          <br />
          <br />
          <ul className="row search-row">
            <li className="col-2 d-flex"></li>
            <li className="col-8 d-flex justify-content-center">
              <button
                onClick={this.handleFilterModalView}
                className="btn btn-secondary "
                type="button"
                id="dropdownMenuButton"
                data-toggle="collapse"
                data-target="#collapsePanel"
                aria-expanded="false"
                aria-controls="collapsePanel"
              >
                <i className="material-icons">settings</i> Filters
              </button>

              <input
                id="projectSearchInput"
                className="form-control"
                type="search"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
              />
              <button
                id="projectSearchButton"
                className="btn btn-primary"
                type="button"
                onClick={this.handleProjectSearch}
              >
                <i className="material-icons">search</i> Search
              </button>
            </li>
            <li className="col-2 d-flex"></li>
          </ul>
          <ul className="row search-row filters">
            <li className="col-2 d-flex"></li>
            <li className="col-8 d-flex">
              Selected Filters:
              <span>
                <label>Label: </label>{' '}
                <button className="btn btn-sm btn-secondary">
                  Label Name <i className="material-icons">close</i>
                </button>
              </span>
              <span>
                <label>Last Update: </label>{' '}
                <button className="btn btn-sm btn-secondary">
                  12/28/2018 <i className="material-icons">close</i>
                </button>
              </span>
            </li>
            <li className="col-2 d-flex"></li>
          </ul>

          <SearchFiltersPanel
            showFiltersPanel={this.state.showFiltersPanel}
            /* data={this.state.project} 
						labels={this.state.defaultLabels}
						handleLabelFacetsChange={ (e,i)=> this.handleLabelFacetsChange(e,i)}
						handleStatusFacetsChange={this.handleStatusFacetsChange}
						handleHasAudioFacetsChange={this.handleHasAudioFacetsChange}
						handleHasBlockingFacetsChange={this.handleHasBlockingFacetsChange}
						setDateFilter={this.setDateFilter} */
          />
        </div>

        <div>
          {this.renderError()}

          <Nav variant="tabs" defaultActiveKey="requesting" activeKey={this.state.activeKey}>
            <Nav.Item>
              <Nav.Link eventKey="requesting" onSelect={this.setRequesting}>
                <NavLink to="/admin/requesting">Requesting Access</NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="existing" onSelect={this.setExisting}>
                <NavLink to="/admin/existing">Existing</NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {this.renderResultView()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    tab,
    requestingUserState,
    existingUserState,
    isShowingModal,
    userToEdit,
    error,
  } = state.userAdmin;
  const { labels } = state.labels;
  return {
    tab,
    requestingUserState,
    existingUserState,
    isShowingModal,
    userToEdit,
    error,
    labels,
  };
}

const actionCreators = {
  showError,
  hideError,
  updateSearchTerm,
  fetchUsers,
  updateReqItems,
  updateReqPagination,
  updateReqSort,
  updateExtItems,
  updateExtPagination,
  updateExtSort,
  changeTab,
  approveDenyUser,
  showUserModal,
  hideUserModal,
  setUserToEdit,
  editUser,
  revokeReinstnateUser,
  fetchLabels,
};

export default withRouter(
  connect(
    mapStateToProps,
    actionCreators,
  )(UserAdministration),
);
