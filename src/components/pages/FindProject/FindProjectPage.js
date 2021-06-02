import React, { Component } from 'react';
import './FindProject.css';
import IntroModal from '../../modals/IntroModal';
import FindProjectDataTable from './pageComponents/FindProjectDataTable';
import ProjectsViewDropDown from './pageComponents/ProjectsViewDropDown';
import TablePager from './pageComponents/TablePager';
import { withRouter } from 'react-router';
import LoadingImg from '../../ui/LoadingImg';
import { connect } from 'react-redux';
import * as findProjectAction from 'actions/findProjectAction';
import Filter from './findProjectFilter';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../common/InputField';
import _ from 'lodash';

class FindProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {},
      searchCriteria: {
        searchTerm: '',
        searchId: '',
        itemsPerPage: '10',
        pageNumber: '1',
        sortColumn: '',
        sortOrder: '',
        filter: {
          labels: [],
          labelIds: [],
          hasAudio: '',
          hasAudioName: '',
          hasRights: '',
          hasRightsName: '',
          hasBlocking: '',
          hasBlockingName: '',
          statusID: '',
          statusName: '',
          from: '',
          to: '',
        },
      },

      project: {
        Projects: [],

        Facets: {
          LabelFacets: [],
        },
      },

      labels: [],
      defaultLabels: [],
      showFilterModal: false,
      currentPageNumber: 1,
      showLoader: false,
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    const searchCriteria = _.cloneDeep(this.props.searchCriteria.filter);
    this.props.initialize(this.props.searchCriteria.filter);
    _.forOwn(searchCriteria, function(item, key) {
      if (!item) {
        searchCriteria[key] = '';
      }
      if (item && item.value) {
        searchCriteria[key] = item.value;
      } else {
        if (Array.isArray(item)) {
          searchCriteria[key] = _.map(item, 'value');
        }
        if (key === 'from') {
          searchCriteria[key] = this.getFromDate(item);
        }
        if (key === 'to') {
          searchCriteria[key] = this.getToDate(item);
        }
      }
    });

    delete searchCriteria['searchTerm'];

    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: this.props.searchCriteria.searchTerm ? this.props.searchCriteria.searchTerm : '',
      filter: searchCriteria,
    };

    this.props.handleProjectSearch({ searchCriteria: searchData });
  }

  getToDate(date) {
    if (!date) return '';
    let toDate = new Date(date);
    toDate.setHours(23, 59, 59);
    toDate.setDate(toDate.getDate() + 1);
    toDate = toDate.toISOString().replace('Z', '');
    return toDate;
  }

  getFromDate(date) {
    if (!date) return '';
    let toDate = new Date(date);
    toDate.setHours(0, 0, 1);

    toDate = toDate.toISOString().replace('Z', '');
    return toDate;
  }

  formSubmit(values) {
    const formData = _.cloneDeep(values);
    _.forOwn(formData, function(item, key) {
      if (!item) {
        formData[key] = '';
      }
      if (item && item.value) {
        formData[key] = item.value;
      } else {
        if (Array.isArray(item)) {
          formData[key] = _.map(item, 'value');
        }
        if (key === 'from') {
          formData[key] = this.getFromDate(item);
        }
        if (key === 'to') {
          formData[key] = this.getToDate(item);
        }
      }
    });

    delete formData['searchTerm'];

    const searchCriteria = {
      itemsPerPage: '10',
      pageNumber: '1',
      searchTerm: values.searchTerm,
      filter: { ...formData },
    };
    this.props.handleProjectSearch({ searchCriteria: searchCriteria });
  }

  render() {
    const { loading, result, handleSubmit } = this.props;
    return (
      <div className="col-10">
        <IntroModal />
        <LoadingImg show={loading} />

        <div className="row d-flex no-gutters">
          <div className="col-12">
            <h2>Find A Project</h2>
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
            getFromDate={this.getFromDate}
            getToDate={this.getToDate}
            {...this.props}
            data={result}
            handleProjectSearch={this.props.handleProjectSearch}
            saveFilters={this.props.saveFilters}
          />
        </form>

        <ul className="row results-controls">
          <li className="col-4 d-flex">
            <span className="viewing">Viewing</span>
            <ProjectsViewDropDown
              itemsPerPage={this.state.searchCriteria.itemsPerPage}
              onChange={this.setProjectsView}
            />
            <span className="viewing">of {result.TotalItems} Results</span>
          </li>
          <li className="col-4 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <TablePager
                activePage={this.state.searchCriteria.pageNumber}
                totalItems={result.TotalItems}
                itemsPerPage={result.ItemsPerPage}
                handlePaginationChange={this.handlePaginationChange}
                projectViewCount={this.state.searchCriteria.itemsPerPage}
              />
            </nav>
          </li>
          <li className="col-4 d-flex"></li>
        </ul>
        <div className="table-responsive">
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
});

const mapStateToProps = state => ({
  result: state.findProjectReducer.result,
  loading: state.findProjectReducer.loading,
  formValues: state.form.FindProjectPageForm,
  searchCriteria: state.findProjectReducer.searchCriteria,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FindProjectPage),
);
