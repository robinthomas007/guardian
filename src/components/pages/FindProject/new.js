import React, { Component } from 'react';
import './FindProject.css';
import IntroModal from '../../modals/IntroModal';
import FindProjectDataTable from './pageComponents/FindProjectDataTable';
import SearchFilterModal from './pageComponents/SearchFiltersModal';
import ProjectsViewDropDown from './pageComponents/ProjectsViewDropDown';
import SelectedFilters from './pageComponents/SelectedFilters';
import TablePager from './pageComponents/TablePager';
import { resetDatePicker } from '../../Utils';
import { withRouter } from 'react-router';
import LoadingImg from '../../ui/LoadingImg';
import { connect, useSelector } from 'react-redux';
import * as findProjectAction from 'actions/findProjectAction';
import Filter from './findProjectFilter';

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
  }

  componentDidMount() {
    const searchCriteria = {
      itemsPerPage: '10',
      pageNumber: '1',
    };
    this.props.handleProjectSearch({ searchCriteria: searchCriteria });
  }

  render() {
    const { loading, result } = this.props;
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

        <Filter data={result} handleProjectSearch={this.props.handleProjectSearch} />

        {/*result.Facets && <SearchFilterModal
          showFilterModal={this.state.showFilterModal}
          data={result}
          labels={this.state.defaultLabels}
          handleLabelFacetsChange={(e, i) => this.handleLabelFacetsChange(e, i)}
          handleStatusFacetsChange={this.handleStatusFacetsChange}
          handleHasAudioFacetsChange={this.handleHasAudioFacetsChange}
          handleHasBlockingFacetsChange={this.handleHasBlockingFacetsChange}
          handleHasRightsFacetsChange={this.handleHasRightsFacetsChange}
          setDateFilter={this.setDateFilter}
        />}

        <SelectedFilters
          labelFilters={this.state.defaultLabels}
          filters={this.state.searchCriteria.filter}
          removeLabelsFilter={this.removeLabelsFilter}
          removeAudioFilter={this.removeAudioFilter}
          removeBlockingFilter={this.removeBlockingFilter}
          removeRightsFilter={this.removeRightsFilter}
          removeStatusFilter={this.removeStatusFilter}
          removeToDateFilter={this.removeToDateFilter}
          removeFromDateFilter={this.removeFromDateFilter}
        />*/}

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

const mapDispatchToProps = dispatch => ({
  handleProjectSearch: val => dispatch(findProjectAction.fetchProjects(val)),
});

const mapStateToProps = state => ({
  result: state.findProjectReducer.result,
  loading: state.findProjectReducer.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FindProjectPage),
);
