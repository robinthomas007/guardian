import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import LoadingImg from 'component_library/LoadingImg';
import UserEditModal from './pageComponents/UserEditModal';
import UserSearchFilterModal from './pageComponents/UserSearchFilterModal';
import SelectedFilters from './pageComponents/SelectedFilters';
import RequestingAccessTab from './pageComponents/RequestingAccessTab';
import ExistingUsersTab from './pageComponents/ExistingUsersTab';
import { resetDatePicker } from '../../Utils';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as userAdminAction from './pageComponents/userAdminAction';

import _ from 'lodash';

class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserSearchCriteria: {
        searchTerm: '',
        filter: {
          labelIds: [],
          from: '',
          to: '',
        },
        itemsPerPage: 10,
        pageNumber: 1,
        sortColumn: 'date_created',
        sortOrder: 'desc',
      },
      AccessRequestSearchCriteria: {
        searchTerm: '',
        filter: {
          labelIds: [],
          from: '',
          to: '',
        },
        itemsPerPage: 10,
        pageNumber: 1,
        sortColumn: 'date_created',
        sortOrder: 'desc',
      },

      tableData: {
        UserSearchResponse: {
          Users: [],
        },
        AccessRequestSearchResponse: {
          AccessRequests: [],
        },
      },

      viewCount: [10, 25, 50],
      selectedViewCount: 10,
      filters: [],
      showFiltersPanel: false,
      activeTab: 'requestAccess',
      showloader: false,
      showUserEditModal: false,
      targetUser: {
        secondaryLabelIds: [],
      },
      showFilterModal: false,
      releasingLabels: [],
      selectedFilterLabelOptions: [],
      selectedList: [],
    };
    this.handleFilterModalView = this.handleFilterModalView.bind(this);
    this.handleLabelSelectChange = this.handleLabelSelectChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  handleTargetUserUpdate = e => {
    this.setState({ targetUser: { ...this.state.targetUser, [e.target.id]: e.target.value } });
  };

  handleColumnSort = (columnID, sortOrder, pageView) => {
    if (pageView === 'requesting') {
      const { AccessRequestSearchCriteria } = this.state;
      let modifiedAccessRequestSearchCriteria = AccessRequestSearchCriteria;
      modifiedAccessRequestSearchCriteria.sortColumn = columnID;
      modifiedAccessRequestSearchCriteria.sortOrder = sortOrder;
      this.setState({ AccessRequestSearchCriteria: modifiedAccessRequestSearchCriteria }, () =>
        this.fetchUsers(),
      );
    } else {
      const { UserSearchCriteria } = this.state;
      let modifiedAccessUserSearchCriteria = UserSearchCriteria;
      modifiedAccessUserSearchCriteria.sortColumn = columnID;
      modifiedAccessUserSearchCriteria.sortOrder = sortOrder;
      this.setState({ UserSearchCriteria: modifiedAccessUserSearchCriteria }, () =>
        this.fetchUsers(),
      );
    }
  };

  fetchUsers = () => {
    this.setState({ showloader: true });
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      AccessRequestSearchCriteria: this.state.AccessRequestSearchCriteria,
      UserSearchCriteria: this.state.UserSearchCriteria,
    });

    fetch(window.env.api.url + '/admin/search', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(userJSON => {
        this.setState({
          tableData: userJSON,
          showloader: false,
        });
        this.props.setFacets(userJSON);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  };

  handleUserUpdate = user => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      ExistingUserID: this.state.targetUser.userID,
      Action: 'MODIFY',
      FirstName: this.state.targetUser.firstName,
      LastName: this.state.targetUser.lastName,
      // LabelID : this.state.targetUser.primaryLabelID,
      LabelIds: this.state.targetUser.secondaryLabelIds,
      PhoneNumber: this.state.targetUser.phoneNumber,
      UserSearchCriteria: this.state.UserSearchCriteria,
      AccessRequestSearchCriteria: this.state.AccessRequestSearchCriteria,
      Tracking: {
        SessionId: '',
        TransactionId: '',
      },
    });

    fetch(window.env.api.url + '/admin/user', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(userJSON => {
        this.setState({
          tableData: userJSON,
          showloader: false,
          showUserEditModal: false,
        });
      })
      .catch(error => {
        this.setState({ showloader: false });
      });
  };

  setViewCount = option => {
    const { AccessRequestSearchCriteria } = this.state;
    const { UserSearchCriteria } = this.state;

    let modifiedAccessRequestSearchCriteria = AccessRequestSearchCriteria;
    modifiedAccessRequestSearchCriteria.itemsPerPage = parseInt(option);

    let modifiedUserSearchCriteria = UserSearchCriteria;
    modifiedUserSearchCriteria.itemsPerPage = parseInt(option);

    this.setState(
      {
        AccessRequestSearchCriteria: modifiedAccessRequestSearchCriteria,
        UserSearchCriteria: modifiedUserSearchCriteria,
        selectedViewCount: parseInt(option),
      },
      () => this.fetchUsers(),
    );
  };

  fetchReleasingLabels = () => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    fetch(window.env.api.url + '/labels', {
      method: 'GET',
      headers: fetchHeaders,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        this.setState({
          releasingLabels: responseJSON.ReleasingLabels,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.fetchUsers();
    this.fetchReleasingLabels();
  };

  showUserEditModal = user => {
    this.setState({
      targetUser: user,
      showUserEditModal: true,
    });
  };

  hideUserEditModal = () => {
    this.setState({
      targetUser: { secondaryLabelIds: [] },
      showUserEditModal: false,
    });
  };

  handlePaginationChange = key => {
    let AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    let UserSearchCriteria = { ...this.state.UserSearchCriteria };
    if (this.state.activeTab === 'requestAccess') {
      AccessRequestSearchCriteria.pageNumber = parseInt(key);
    } else {
      UserSearchCriteria.pageNumber = parseInt(key);
    }
    this.setState({ AccessRequestSearchCriteria, UserSearchCriteria }, () => this.fetchUsers());
  };

  handleSearchTextChange = e => {
    const { AccessRequestSearchCriteria } = this.state;
    const { UserSearchCriteria } = this.state;

    let modifiedAccessRequestSearchCriteria = AccessRequestSearchCriteria;
    modifiedAccessRequestSearchCriteria.searchTerm = e.target.value;

    let modifiedUserSearchCriteria = UserSearchCriteria;
    modifiedUserSearchCriteria.searchTerm = e.target.value;

    this.setState({
      AccessRequestSearchCriteria: modifiedAccessRequestSearchCriteria,
      UserSearchCriteria: modifiedUserSearchCriteria,
    });
  };

  handleTabClick = key => {
    const resetSearchCriteria = {
      labelIds: [],
      from: '',
      to: '',
    };
    const AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    const UserSearchCriteria = { ...this.state.UserSearchCriteria };
    AccessRequestSearchCriteria.filter = resetSearchCriteria;
    UserSearchCriteria.filter = resetSearchCriteria;
    resetDatePicker('filterEndDate');
    resetDatePicker('filterStartDate');
    this.setState(
      {
        activeTab: key,
        AccessRequestSearchCriteria,
        UserSearchCriteria,
        selectedFilterLabelOptions: [],
        selectedList: [],
      },
      () => {
        this.fetchUsers();
      },
    );
    // this.setState({ activeTab: key });
  };

  handleFilterModalView() {
    this.state.showFilterModal
      ? this.setState({ showFilterModal: false })
      : this.setState({ showFilterModal: true });
  }

  approveDenyUser = (action, request) => {
    this.setState({ showloader: true });
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      AccessRequestID: request.accessRequestID,
      Action: action.toUpperCase(),
      UserSearchCriteria: this.state.UserSearchCriteria,
      AccessRequestSearchCriteria: this.state.AccessRequestSearchCriteria,
    });

    fetch(window.env.api.url + '/admin/access', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(userJSON => {
        this.setState(
          {
            tableData: userJSON,
            showloader: false,
          },
          () => {},
        );
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  };

  revokeReinstateUser = (action, request) => {
    this.setState({ showloader: true });
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      User: { email: user.email },
      ExistingUserID: request.userID,
      Action: action.toUpperCase(),
      UserSearchCriteria: this.state.UserSearchCriteria,
      AccessRequestSearchCriteria: this.state.AccessRequestSearchCriteria,
    });

    fetch(window.env.api.url + '/admin/user', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(userJSON => {
        this.setState({
          tableData: userJSON,
          showloader: false,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  };

  handleSearchFilterLabelChange = data => {
    const AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    const UserSearchCriteria = { ...this.state.UserSearchCriteria };
    const { selectedFilterLabelOptions } = this.state;
    let modifiedselectedFilterLabelOptions = selectedFilterLabelOptions;

    const lablelIds = _.map(data, 'value');
    console.log('labelIds from accessRequest', lablelIds);
    AccessRequestSearchCriteria.filter.labelIds = lablelIds;
    UserSearchCriteria.filter.labelIds = lablelIds;
    modifiedselectedFilterLabelOptions = lablelIds;

    this.setState(
      {
        AccessRequestSearchCriteria,
        UserSearchCriteria,
        selectedFilterLabelOptions: modifiedselectedFilterLabelOptions,
        selectedList: data,
      },
      () => this.fetchUsers(),
    );
  };

  getToDate(date) {
    let toDate = new Date(date);
    toDate.setHours(23, 59, 59);
    toDate.setDate(toDate.getDate() + 1);
    toDate = toDate.toISOString().replace('Z', '');
    return toDate;
  }

  getFromDate(date) {
    let toDate = new Date(date);
    toDate.setHours(0, 0, 1);
    toDate = toDate.toISOString().replace('Z', '');
    return toDate;
  }

  removeDateFilter = source => {
    const AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    const UserSearchCriteria = { ...this.state.UserSearchCriteria };
    let sourceID = '';

    if (source === 'to') {
      AccessRequestSearchCriteria.filter.to = '';
      UserSearchCriteria.filter.to = '';
      sourceID = 'filterEndDate';
    } else {
      AccessRequestSearchCriteria.filter.from = '';
      UserSearchCriteria.filter.from = '';
      sourceID = 'filterStartDate';
    }

    resetDatePicker(sourceID);

    this.setState(
      {
        AccessRequestSearchCriteria,
        UserSearchCriteria,
      },
      () => this.fetchUsers(),
    );
  };

  handleDateFilter = e => {
    const AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    const UserSearchCriteria = { ...this.state.UserSearchCriteria };

    if (e.target.id === 'filterStartDate') {
      AccessRequestSearchCriteria.filter.from =
        e.target.value !== '' ? this.getFromDate(e.target.value) : '';
      UserSearchCriteria.filter.from =
        e.target.value !== '' ? this.getFromDate(e.target.value) : '';
    } else {
      AccessRequestSearchCriteria.filter.to =
        e.target.value !== '' ? this.getToDate(e.target.value) : '';
      UserSearchCriteria.filter.to = e.target.value !== '' ? this.getToDate(e.target.value) : '';
    }

    this.setState(
      {
        AccessRequestSearchCriteria,
        UserSearchCriteria,
      },
      () => this.fetchUsers(),
    );
  };

  getLabelIndex = labelID => {
    return this.props.labelsAll.map((label, i) => {
      if (labelID === label.id) {
        return label.name;
      } else {
        return null;
      }
    });
  };

  removeLabelsFilter = labelID => {
    const { selectedFilterLabelOptions } = this.state;
    let modifiedselectedFilterLabelOptions = selectedFilterLabelOptions;
    modifiedselectedFilterLabelOptions.splice(selectedFilterLabelOptions.indexOf(labelID), 1);

    const AccessRequestSearchCriteria = { ...this.state.AccessRequestSearchCriteria };
    const UserSearchCriteria = { ...this.state.UserSearchCriteria };

    AccessRequestSearchCriteria.filter.labelIds = modifiedselectedFilterLabelOptions;
    UserSearchCriteria.filter.labelIds = modifiedselectedFilterLabelOptions;

    const mofifiedSelectedList = this.state.selectedList.filter(item => item.value !== labelID);

    this.setState(
      {
        AccessRequestSearchCriteria,
        UserSearchCriteria,
        selectedFilterLabelOptions: modifiedselectedFilterLabelOptions,
        selectedList: mofifiedSelectedList,
      },
      () => this.fetchUsers(),
    );
  };

  handleLabelSelectChange = (e, label) => {
    const { targetUser } = this.state;
    let modifiedTargetUser = targetUser;

    if (e.target.checked) {
      modifiedTargetUser.secondaryLabelIds.push(label.id);
    } else {
      modifiedTargetUser.secondaryLabelIds.splice(
        modifiedTargetUser.secondaryLabelIds.indexOf(label.id),
        1,
      );
    }

    this.setState({ targetUser: modifiedTargetUser });
  };

  newHandleLabelSelectChange = options => {
    const { targetUser } = this.state;
    const ids = options.map(opt => opt.value);

    this.setState({ targetUser: { ...targetUser, secondaryLabelIds: ids } });
  };

  handleChangeCheckbox = data => {
    const lablelIds = _.map(data, 'value');

    const { targetUser } = this.state;
    this.setState({
      targetUser: {
        ...targetUser,
        secondaryLabelIds: lablelIds,
      },
    });
  };

  removeLabelFromEditModal = labelId => {
    const { targetUser } = this.state;
    let ids = [...targetUser.secondaryLabelIds];
    ids.splice(ids.indexOf(labelId), 1);
    this.setState({
      targetUser: { ...targetUser, secondaryLabelIds: ids },
    });
  };

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.fetchUsers();
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showloader} />

        <UserEditModal
          showModal={this.state.showUserEditModal}
          hideUserEditModal={this.hideUserEditModal}
          user={this.state.targetUser}
          handleUserUpdate={this.handleUserUpdate}
          handleTargetUserUpdate={this.handleTargetUserUpdate}
          handleLabelSelectChange={this.handleLabelSelectChange}
          newHandleLabelSelectChange={this.newHandleLabelSelectChange}
          removeLabelFromEditModal={this.removeLabelFromEditModal}
          releasingLabels={this.state.releasingLabels}
          selectedOptions={this.state.targetUser.secondaryLabelIds}
          userData={this.props.user}
          handleChangeCheckbox={this.handleChangeCheckbox}
          LabelFacets={
            this.state.activeTab === 'requestAccess'
              ? this.props.accessFacets
              : this.props.userFacets
          }
          // LabelFacets={this.state.tableData.UserSearchResponse.LabelFacets}
          selectedList={this.state.selectedList}
        />

        <div>
          <div className="row d-flex no-gutters">
            <div className="col-12">
              <h2>{t('admin:adminLabel')}</h2>
              <p>{t('admin:adminDesc')}</p>
            </div>
          </div>

          <br />
          <br />

          <ul className="row search-row">
            <li className="col-2 d-flex"></li>
            <li className="col-8 d-flex justify-content-center">
              <div className="dropdown">
                <button
                  onClick={this.handleFilterModalView}
                  className="btn btn-secondary "
                  type="button"
                  id="dropdownMenuButton"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-icons">settings</i> {t('admin:filters')}
                </button>
              </div>

              <input
                id="searchTerm"
                className="form-control"
                type="search"
                onChange={e => this.handleSearchTextChange(e)}
                value={this.state.UserSearchCriteria.searchTerm}
                onKeyUp={e => this.handleKeyUp(e)}
              />
              <button
                id="projectSearchButton"
                className="btn btn-primary"
                type="button"
                onClick={this.fetchUsers}
              >
                <i className="material-icons">search</i> {t('admin:search')}
              </button>
            </li>
            <li className="col-2 d-flex"></li>
          </ul>
          <UserSearchFilterModal
            showFilterModal={this.state.showFilterModal}
            releasingLabels={this.state.releasingLabels}
            handleSearchFilterLabelChange={this.handleSearchFilterLabelChange}
            handleDateFilter={this.handleDateFilter}
            selectedFilterLabelOptions={this.state.selectedFilterLabelOptions}
            t={this.props.t}
            LabelFacets={
              this.state.activeTab === 'requestAccess'
                ? this.props.accessFacets
                : this.props.userFacets
            }
            tagList={
              this.state.activeTab === 'requestAccess'
                ? this.props.accessTagList
                : this.props.userTagList
            }
            userData={this.props.user}
            activeTab={this.state.activeTab}
            selectedList={this.state.selectedList}
          />

          <SelectedFilters
            labelsAll={this.state.releasingLabels}
            filters={this.state.UserSearchCriteria.filter}
            removeLabelsFilter={this.removeLabelsFilter}
            removeDateFilter={this.removeDateFilter}
            removeFromDateFilter={this.removeFromDateFilter}
            t={this.props.t}
          />
        </div>
        <div>
          <Tab.Container>
            <Tabs onSelect={this.handleTabClick} defaultActiveKey="requestAccess">
              <Tab eventKey={'requestAccess'} title={t('admin:requestingUsers')}>
                <RequestingAccessTab
                  tableData={this.state.tableData.AccessRequestSearchResponse.AccessRequests}
                  activePage={this.state.AccessRequestSearchCriteria.pageNumber}
                  totalItems={this.state.UserSearchCriteria.totalItems}
                  itemsPerPage={this.state.AccessRequestSearchCriteria.itemsPerPage}
                  handlePaginationChange={this.handlePaginationChange}
                  viewCountData={this.state.viewCount}
                  viewCountOnChange={this.setViewCount}
                  viewCountDefaultValue={this.state.selectedViewCount}
                  totalSearchItems={
                    this.state.tableData.AccessRequestSearchResponse.TotalItems
                      ? this.state.tableData.AccessRequestSearchResponse.TotalItems
                      : 0
                  }
                  handleColumnSort={this.handleColumnSort}
                  pageView={'requesting'}
                  approveDenyUser={this.approveDenyUser}
                  userData={this.props.user}
                  t={this.props.t}
                />
              </Tab>

              <Tab eventKey={'existing'} title={t('admin:existingUsers')}>
                <ExistingUsersTab
                  tableData={this.state.tableData.UserSearchResponse.Users}
                  activePage={this.state.UserSearchCriteria.pageNumber}
                  totalItems={this.state.UserSearchCriteria.totalItems}
                  itemsPerPage={this.state.UserSearchCriteria.itemsPerPage}
                  handlePaginationChange={this.handlePaginationChange}
                  viewCountData={this.state.viewCount}
                  viewCountOnChange={this.setViewCount}
                  viewCountDefaultValue={this.state.selectedViewCount}
                  totalSearchItems={
                    this.state.tableData.UserSearchResponse.TotalItems
                      ? this.state.tableData.UserSearchResponse.TotalItems
                      : 0
                  }
                  handleColumnSort={this.handleColumnSort}
                  pageView={'existing'}
                  showUserEditModal={this.showUserEditModal}
                  hideUserEditModal={this.hideUserEditModal}
                  targetUserID={this.state.targetUserID}
                  revokeReinstateUser={this.revokeReinstateUser}
                  userData={this.props.user}
                  t={this.props.t}
                />
              </Tab>
            </Tabs>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setFacets: result => dispatch(userAdminAction.setFacets(result)),
});

const mapStateToProps = state => ({
  userFacets: state.userAdminNewReducer.userFacets,
  accessFacets: state.userAdminNewReducer.accessFacets,
  userTagList: state.userAdminNewReducer.userTagList,
  accessTagList: state.userAdminNewReducer.accessTagList,
});

export default withRouter(
  compose(
    withTranslation('admin'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(UserAdmin),
);

// export default withRouter(withTranslation('admin')(UserAdmin));
