import React, { Component } from 'react';
import ProjectInboxDataTable from './pageComponents/projectInboxTable';
import TablePager from '../FindProject/pageComponents/TablePager';
import ProjectsViewDropDown from '../FindProject/pageComponents/ProjectsViewDropDown';
import Filter from './inboxFilter';
import { reduxForm, Field } from 'redux-form';
import * as projectInboxAction from 'actions/projectInboxAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoadingImg from '../../ui/LoadingImg';
import { getSearchCriteria, getFromDate, getToDate } from '../../common/commonHelper.js';
import InputField from '../../common/InputField';
import _ from 'lodash';

class ProjectInbox extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.setProjectsView = this.setProjectsView.bind(this);
    this.handleColumnSort = this.handleColumnSort.bind(this);
  }

  componentDidMount() {
    const searchCriteria = _.cloneDeep(this.props.searchCriteria.filter);
    this.props.initialize(this.props.searchCriteria.filter);
    // if seach keyword also should remains then add the below code for searchTerm
    //  this.props.searchCriteria.searchTerm ? this.props.searchCriteria.searchTerm :
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: '',
      filter: getSearchCriteria(searchCriteria),
    };

    this.props.handleInboxSearch({ searchCriteria: searchData });
  }

  formSubmit(values) {
    const formData = _.cloneDeep(values);
    const searchCriteria = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: values.searchTerm ? values.searchTerm : '',
      filter: getSearchCriteria(formData),
    };

    this.props.handleInboxSearch({ searchCriteria: searchCriteria });
  }

  handlePaginationChange(newPage) {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: newPage,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
    };
    this.props.handleInboxSearch({ searchCriteria: searchData });
    this.props.changePageNumber(newPage);
  }

  setProjectsView(count) {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchData = {
      itemsPerPage: count,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
    };
    this.props.handleInboxSearch({ searchCriteria: searchData });
    this.props.changeItemsPerPage(count);
  }

  handleColumnSort = (columnID, columnSortOrder) => {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
      sortOrder: columnSortOrder,
      sortColumn: columnID,
    };
    this.props.handleInboxSearch({ searchCriteria: searchData });
  };

  render() {
    const { loading, result, handleSubmit, searchCriteria, facets } = this.props;

    return (
      <div className="col-10">
        <LoadingImg show={loading} />
        <div className="row d-flex no-gutters">
          <div className="col-12">
            <h2>Project Inbox</h2>
            <p>
              Here you can utilize the search input and filters the same as you can on the find a
              Project screen but the items below have been highlighted for you specifically to
              review by your peers.
            </p>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit(this.formSubmit)}>
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
              <div className="search-bar">
                <Field name="searchTerm" component={InputField} />
              </div>
              <button id="projectSearchButton" className="btn btn-primary">
                <i className="material-icons">search</i> Search
              </button>
            </li>
            <li className="col-2 d-flex"></li>
          </ul>

          <Filter
            {...this.props}
            getFromDate={getFromDate}
            getToDate={getToDate}
            data={facets}
            handleInboxSearch={this.props.handleInboxSearch}
            saveFilters={this.props.saveFilters}
            searchCriteria={searchCriteria}
            getSearchCriteria={getSearchCriteria}
          />
        </form>
        <Filter />

        <ul className="row results-controls">
          <li className="col-4 d-flex">
            <span className="viewing">Viewing</span>
            <ProjectsViewDropDown
              itemsPerPage={searchCriteria.itemsPerPage}
              onChange={this.setProjectsView}
            />
            <span className="viewing">of {result.TotalItems} Results</span>
          </li>
          <li className="col-4 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <TablePager
                activePage={searchCriteria.pageNumber}
                totalItems={result.TotalItems}
                itemsPerPage={result.ItemsPerPage}
                handlePaginationChange={this.handlePaginationChange}
                projectViewCount={searchCriteria.itemsPerPage}
              />
            </nav>
          </li>
          <li className="col-4 d-flex"></li>
        </ul>
        <div className="table-responsive">
          <ProjectInboxDataTable
            userData={JSON.parse(sessionStorage.getItem('user'))}
            data={result}
            handleColumnSort={(columnID, columnSortOrder) =>
              this.handleColumnSort(columnID, columnSortOrder)
            }
            handleAdminStatusChange={this.handleAdminStatusChange}
          />
        </div>
      </div>
    );
  }
}

ProjectInbox = reduxForm({
  form: 'ProjectInboxForm',
})(ProjectInbox);

const mapDispatchToProps = dispatch => ({
  handleInboxSearch: val => dispatch(projectInboxAction.fetchInboxNotifications(val)),
  saveFilters: filters => dispatch(projectInboxAction.saveFilters(filters)),
  changePageNumber: pageNo => dispatch(projectInboxAction.changePageNumber(pageNo)),
  changeItemsPerPage: limit => dispatch(projectInboxAction.changeItemsPerPage(limit)),
});

const mapStateToProps = state => ({
  result: state.ProjectInboxReducer.result,
  loading: state.ProjectInboxReducer.loading,
  formValues: state.form.ProjectInboxForm,
  searchCriteria: state.ProjectInboxReducer.searchCriteria,
  facets: state.ProjectInboxReducer.facets,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProjectInbox),
);
