import React, { Component } from 'react';
import { Button, Tab, Tabs, Table } from 'react-bootstrap';
import UserSearchDataTable from './pageComponents/UserSearchDataTable';
import TablePager from '../FindProject/pageComponents/TablePager';
import UserResultView from './pageComponents/UserResultView';
import { request } from 'https';
//import ResultsPerPageDropDown from './pageComponents/ResultsPerPageDropDown.js';

class UserAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCount: [10, 25, 50],
            searchTerm: '',
            filters: [],
            requestingUserState: {
                pageNumber: 1,
                itemsPerPage: 10,
                sortColumn: '',
                sortOrder: '',
                totalItems: 0,
                userList: [],
                labelFacets: [],
            },
            existingUserState: {
                pageNumber: 1,
                itemsPerPage: 10,
                sortColumn: '',
                sortOrder: '',
                totalItems: 0,
                userList: [],
                labelFacets: [],
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
        this.handleRequestingPaginationChange = this.handleRequestingPaginationChange.bind(this);
        this.handleExistingPaginationChange = this.handleExistingPaginationChange.bind(this);
        this.setExistingItemsPerPage = this.setExistingItemsPerPage.bind(this);
        this.setRequestingItemsPerPage = this.setRequestingItemsPerPage.bind(this);
        this.handleRequestingColumnSort = this.handleRequestingColumnSort.bind(this);
        this.handleExistingColumnSort = this.handleExistingColumnSort.bind(this);
    }

    componentDidMount(props) {
        this.handleUserSearch();
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    setRequestingItemsPerPage(itemsPerPage) {
        this.setState(
            {
                requestingUserState: {
                    ...this.state.requestingUserState,
                    itemsPerPage,
                },
            },
            () => this.handleUserSearch() // Redo search after
        );
    }

    setExistingItemsPerPage(itemsPerPage) {
        this.setState(
            {
                existingUserState: {
                    ...this.state.existingUserState,
                    itemsPerPage,
                },
            },
            () => this.handleUserSearch() // Redo search after
        );
    }

    handleExistingPaginationChange(pageNumber) {
        this.setState(
            {
                existingUserState: {
                    ...this.state.existingUserState,
                    pageNumber,
                },
            },
            () => this.handleUserSearch() // Redo search after new page
        );
    }

    handleRequestingPaginationChange(pageNumber) {
        this.setState(
            {
                requestingUserState: {
                    ...this.state.requestingUserState,
                    pageNumber,
                },
            },
            () => this.handleUserSearch() // Redo search after new page
        );
    }

    handleRequestingColumnSort(columnID) {
        const sortColumn = columnID;
        let sortOrder = this.state.requestingUserState.sortOrder || 'asc';
        if (columnID === this.state.requestingUserState.sortColumn) {
            sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        }
        this.setState(
            {
                requestingUserState: {
                    ...this.state.requestingUserState,
                    sortColumn,
                    sortOrder,
                },
            },
            () => this.handleUserSearch()
        );
    }

    handleExistingColumnSort(columnID) {
        const sortColumn = columnID;
        let sortOrder = this.state.existingUserState.sortOrder || 'asc';
        if (columnID === this.state.existingUserState.sortColumn) {
            sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        } else sortOrder = 'asc';
        this.setState(
            {
                existingUserState: {
                    ...this.state.existingUserState,
                    sortColumn,
                    sortOrder,
                },
            },
            () => this.handleUserSearch()
        );
    }

    handleUserSearch() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const fetchHeaders = new Headers({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('accessToken'),
        });

        const userSearchCrit = (({ pageNumber, itemsPerPage, sortColumn, sortOrder }) => ({ pageNumber, itemsPerPage, sortColumn, sortOrder }))(
            this.state.existingUserState
        );
        const accessSearchCrit = (({ pageNumber, itemsPerPage, sortColumn, sortOrder }) => ({ pageNumber, itemsPerPage, sortColumn, sortOrder }))(
            this.state.requestingUserState
        );

        userSearchCrit.searchTerm = this.state.searchTerm;
        accessSearchCrit.searchTerm = this.state.searchTerm;

        const fetchBody = JSON.stringify({
            User: { email: user.email },
            UserSearchCriteria: userSearchCrit,
            AccessRequestSearchCriteria: accessSearchCrit,
        });

        fetch('https://api-dev.umusic.net/guardian/admin/search', {
            method: 'POST',
            headers: fetchHeaders,
            body: fetchBody,
        })
            .then(response => response.json())
            .then(responseJSON => {
                const requestingData = responseJSON.AccessRequestSearchResponse;
                let requestingUserState = {
                    ...this.state.requestingUserState,
                    totalItems: requestingData.TotalItems,
                    userList: requestingData.AccessRequests,
                    labelFacets: requestingData.LabelFacets,
                };

                const existingData = responseJSON.UserSearchResponse;
                let existingUserState = {
                    ...this.state.existingUserState,
                    totalItems: existingData.TotalItems,
                    userList: existingData.Users,
                    labelFacets: existingData.LabelFacets,
                };

                this.setState({
                    requestingUserState,
                    existingUserState,
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <section className="page-container">
                    <div className="row d-flex no-gutters">
                        <div className="col-12">
                            <h1>User Administration</h1>
                            <p>
                                Search for an existing <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
                            </p>
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
                                    <i className="material-icons">settings</i> Filters
                                </button>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <h5>Search Filters</h5>

                                    <br />

                                    <div className="row no-gutters">
                                        <div className="col-2">
                                            <label>By Label</label>
                                        </div>

                                        <div className="col-4"></div>

                                        <div className="col-2">
                                            <label>By Status</label>
                                        </div>

                                        <div className="col-4"></div>

                                        <div className="col-2">
                                            <label>Has Audio</label>
                                        </div>
                                        <div className="col-4"></div>

                                        <div className="col-2">
                                            <label>Has Blocking</label>
                                        </div>
                                        <div className="col-4"></div>

                                        <div className="col-2">
                                            <label>Last Updated</label>
                                        </div>

                                        <div className="col-10">
                                            <label> to</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <input
                                id="projectSearchInput"
                                className="form-control"
                                type="search"
                                onChange={this.handleChange}
                                onSubmit={this.handleUserSearch}
                                value={this.state.searchTerm}
                            />
                            <button id="projectSearchButton" className="btn btn-primary" type="button" onClick={this.handleUserSearch}>
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
                </section>

                <section className="page-container">
                    <Tabs id="requesting-existing-users-tabs">
                        <Tab eventKey="req-users" title="Requesting Access">
                            <UserResultView
                                type={'requesting'}
                                viewCount={this.state.viewCount}
                                pageNumber={this.state.requestingUserState.pageNumber}
                                totalItems={this.state.requestingUserState.totalItems}
                                itemsPerPage={this.state.requestingUserState.itemsPerPage}
                                userList={this.state.requestingUserState.userList}
                                handlePaginationChange={this.handleRequestingPaginationChange}
                                setItemsPerPage={this.setRequestingItemsPerPage}
                                handleColumnSort={this.handleRequestingColumnSort}
                            />
                        </Tab>
                        <Tab eventKey="exist-users" title="Existing Users">
                            <UserResultView
                                type={'existing'}
                                viewCount={this.state.viewCount}
                                pageNumber={this.state.existingUserState.pageNumber}
                                totalItems={this.state.existingUserState.totalItems}
                                itemsPerPage={this.state.existingUserState.itemsPerPage}
                                userList={this.state.existingUserState.userList}
                                handlePaginationChange={this.handleExistingPaginationChange}
                                setItemsPerPage={this.setExistingItemsPerPage}
                                handleColumnSort={this.handleExistingColumnSort}
                            />
                        </Tab>
                    </Tabs>
                </section>
            </div>
        );
    }
}

export default UserAdministration;
