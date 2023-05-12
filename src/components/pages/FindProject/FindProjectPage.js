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
import * as reviewActions from 'actions/reviewActions';
import Filter from './findProjectFilter';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../common/InputField';
import _ from 'lodash';
import { getSearchCriteria, getToDate, getFromDate } from '../../common/commonHelper.js';
import ExportCSV from './pageComponents/ExportCSV';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

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

  refetchProjects = () => {
    const filter = _.cloneDeep(this.props.searchCriteria.filter);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const searchCriteria = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm,
      // filter: this.props.searchCriteria.filter,
      filter: getSearchCriteria(filter),
      sortOrder: this.state.sortOrder,
      sortColumn: this.state.sortColumn,
    };

    this.props.handleProjectSearch({ searchCriteria: searchCriteria });
  };

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

  handleAdminStatusChange = (data, projectID, publishIds) => {
    const searchCriteria = _.cloneDeep(this.props.formValues.values);
    const searchTerm = _.get(this.props, 'formValues.values.searchTerm', '');
    const languageCode = localStorage.getItem('languageCode') || 'en';
    const searchData = {
      itemsPerPage: this.props.searchCriteria.itemsPerPage,
      pageNumber: this.props.searchCriteria.pageNumber,
      searchTerm: searchTerm,
      filter: getSearchCriteria(searchCriteria),
    };

    if (data.id === '5' && data.name === this.props.t('search:Published')) {
      this.props.handlePublish(
        { ProjectIds: projectID, PublishTrackIds: publishIds, languageCode: languageCode },
        searchData,
      );
    } else {
      this.props.adminStatusChange({ ProjectIds: projectID, StatusID: data.id }, searchData);
    }
  };

  render() {
    let { loading, result, handleSubmit, searchCriteria, facets, t } = this.props;
    let data = { ...result };
    if (data.Projects) {
      const projects = data.Projects.map(project => {
        let Discs = project.Discs.map(disk => {
          let Tracks = disk.Tracks.map(track => {
            let isPublish =
              project.status === t('search:Published') ? track.isPublish : !track.nonExclusive;
            return { ...track, isPublish };
          });
          return { ...disk, Tracks };
        });
        return { ...project, Discs };
      });
      data.Projects = projects;
    }
    return (
      <div className="col-10">
        <IntroModal />
        <LoadingImg show={loading} />

        <div className="row d-flex no-gutters">
          <div className="col-12">
            <h2>{t('search:ProjectSearch')}</h2>
            <p>
              {t('search:DescriptionMain')} <br />
              {t('search:DescriptionSub')}{' '}
              <a href="mailto:guardian-support@umusic.com">{t('search:Email')}</a>.
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
                <i className="material-icons">settings</i>
                {t('search:Filters')}
              </button>
              <div className="search-bar">
                <Field name="searchTerm" component={InputField} />
              </div>
              <button id="projectSearchButton" className="btn btn-primary">
                <i className="material-icons">search</i> {t('search:Search')}
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
            userData={this.props.user}
          />
        </form>

        <ul className="row results-controls">
          <li className="col-4 d-flex">
            <span className="viewing">{t('search:Viewing')}</span>
            <ProjectsViewDropDown
              itemsPerPage={searchCriteria.itemsPerPage}
              onChange={this.setProjectsView}
            />
            <span className="viewing">
              {t('search:of')} {result.TotalItems} {t('search:Results')}{' '}
            </span>
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
            <ExportCSV
              t={t}
              formValues={this.props.formValues}
              getSearchCriteria={getSearchCriteria}
            />
          </li>
        </ul>
        <div className="">
          <FindProjectDataTable
            t={t}
            userData={JSON.parse(sessionStorage.getItem('user'))}
            data={data}
            handleColumnSort={(columnID, columnSortOrder) =>
              this.handleColumnSort(columnID, columnSortOrder)
            }
            handleAdminStatusChange={this.handleAdminStatusChange}
            afterProjectDelete={this.refetchProjects}
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
  handlePublish: (val, searchData) => dispatch(reviewActions.handlePublish(val, searchData)),
});

const mapStateToProps = state => ({
  result: state.findProjectReducer.result,
  loading: state.findProjectReducer.loading,
  formValues: state.form.FindProjectPageForm,
  searchCriteria: state.findProjectReducer.searchCriteria,
  facets: state.findProjectReducer.facets,
});

export default withRouter(
  compose(
    withTranslation('search'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(FindProjectPage),
);
