import React, { Component } from 'react';
import './FindProject.css';
import IntroModal from '../../modals/IntroModal';
import FindProjectDataTable from './pageComponents/FindProjectDataTable';
import ProjectsViewDropDown from './pageComponents/ProjectsViewDropDown';
import TablePager from './pageComponents/TablePager';
import { withRouter } from 'react-router';
import LoadingImg from 'component_library/LoadingImg';
import { connect } from 'react-redux';
import * as findProjectAction from 'actions/findProjectAction';
import Filter from './findProjectFilter';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../common/InputField';
import _ from 'lodash';
import { getSearchCriteria, getToDate, getFromDate } from '../../common/commonHelper.js';
import ExportCSV from './pageComponents/ExportCSV';

class FindProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'desc',
      sortColumn: 'last_updated',
    };
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
    this.props.setProjectID('', '/findProject');
    this.props.handleProjectSearch({ searchCriteria: searchData });
  }

  formSubmit(values) {
    const formData = _.cloneDeep(values);
    const searchCriteria = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: values.searchTerm ? values.searchTerm : '',
      filter: getSearchCriteria(formData),
    };

    this.props.handleProjectSearch({ searchCriteria: searchCriteria });
  }

  handlePaginationChange(newPage) {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: newPage,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
      sortOrder: this.state.sortOrder,
      sortColumn: this.state.sortColumn,
    };
    this.props.handleProjectSearch({ searchCriteria: searchData });
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
    this.props.handleProjectSearch({ searchCriteria: searchData });
    this.props.changeItemsPerPage(count);
  }

  handleColumnSort = (columnID, columnSortOrder) => {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    this.setState({
      sortOrder: columnSortOrder,
      sortColumn: columnID,
    });
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
      sortOrder: columnSortOrder,
      sortColumn: columnID,
    };
    this.props.handleProjectSearch({ searchCriteria: searchData });
  };

  handleAdminStatusChange = (data, projectID) => {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
    };
    this.props.adminStatusChange({ ProjectIds: projectID, StatusID: data.id }, searchData);
  };

  render() {
    const { loading, result, handleSubmit, searchCriteria, facets } = this.props;
    return (
      <div className="col-10">
        <IntroModal />
        <LoadingImg show={loading} />

        <div className="row d-flex no-gutters">
          <div className="col-12">
            <h2>Project Search</h2>
            <p>
              Search for an existing project or release in the search bar below. Projects can be
              located by Artist, Track, ISRC or Project Title (Album, Compilation, EP, or Single
              name). <br />
              Can't find what you're looking for? Email us at{' '}
              <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
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
            getFromDate={getFromDate}
            getToDate={getToDate}
            {...this.props}
            data={facets}
            handleProjectSearch={this.props.handleProjectSearch}
            saveFilters={this.props.saveFilters}
            searchCriteria={searchCriteria}
            getSearchCriteria={getSearchCriteria}
          />
        </form>

        <ul className="row results-controls">
          <li className="col-4 d-flex">
            <span className="viewing">Viewing</span>
            <ProjectsViewDropDown
              itemsPerPage={searchCriteria.itemsPerPage}
              onChange={this.setProjectsView}
            />
            <span className="viewing">of {result.TotalItems} Results</span>
          </li>
          <li className="col-4 d-flex justify-content-center pagination-wrap">
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
          <li className="col-4 d-flex">
            <ExportCSV formValues={this.props.formValues} getSearchCriteria={getSearchCriteria} />
          </li>
        </ul>
        <div className="table-responsive row">
          <FindProjectDataTable
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

FindProjectPage = reduxForm({
  form: 'FindProjectPageForm',
})(FindProjectPage);

const mapDispatchToProps = dispatch => ({
  handleProjectSearch: val => dispatch(findProjectAction.fetchProjects(val)),
  saveFilters: filters => dispatch(findProjectAction.saveFilters(filters)),
  changePageNumber: pageNo => dispatch(findProjectAction.changePageNumber(pageNo)),
  changeItemsPerPage: limit => dispatch(findProjectAction.changeItemsPerPage(limit)),
  adminStatusChange: (val, searchData) =>
    dispatch(findProjectAction.adminStatusChange(val, searchData)),
});

const mapStateToProps = state => ({
  result: state.findProjectReducer.result,
  loading: state.findProjectReducer.loading,
  formValues: state.form.FindProjectPageForm,
  searchCriteria: state.findProjectReducer.searchCriteria,
  facets: state.findProjectReducer.facets,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FindProjectPage),
);
