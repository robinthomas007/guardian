import React, { Component } from 'react';
import ProjectInboxDataTable from './pageComponents/projectInboxTable';
import TablePager from '../FindProject/pageComponents/TablePager';
import ProjectsViewDropDown from '../FindProject/pageComponents/ProjectsViewDropDown';

export default class ProjectInbox extends Component {
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
  render() {
    return (
      <div className="col-10">
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

        {/*<SearchFilterModal
          showFilterModal={this.state.showFilterModal}
          data={this.state.project}
          labels={this.state.defaultLabels}
          handleLabelFacetsChange={(e, i) => this.handleLabelFacetsChange(e, i)}
          handleStatusFacetsChange={this.handleStatusFacetsChange}
          handleHasAudioFacetsChange={this.handleHasAudioFacetsChange}
          handleHasBlockingFacetsChange={this.handleHasBlockingFacetsChange}
          setDateFilter={this.setDateFilter}
        />

        <SelectedFilters
          labelFilters={this.state.defaultLabels}
          filters={this.state.searchCriteria.filter}
          removeLabelsFilter={this.removeLabelsFilter}
          removeAudioFilter={this.removeAudioFilter}
          removeBlockingFilter={this.removeBlockingFilter}
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
            <span className="viewing">of {this.state.project.TotalItems} Results</span>
          </li>
          <li className="col-4 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <TablePager
                activePage={this.state.searchCriteria.pageNumber}
                totalItems={this.state.project.TotalItems}
                itemsPerPage={this.state.project.ItemsPerPage}
                handlePaginationChange={this.handlePaginationChange}
                projectViewCount={this.state.searchCriteria.itemsPerPage}
              />
            </nav>
          </li>
          <li className="col-4 d-flex"></li>
        </ul>
        <div className="table-responsive">
          <ProjectInboxDataTable
            userData={JSON.parse(sessionStorage.getItem('user'))}
            data={this.state.project}
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
