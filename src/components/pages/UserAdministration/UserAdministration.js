import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import {
    fetchUsers,
    updateSearchTerm,
    updateReqItems,
    updateReqPagination,
    updateReqSort,
    updateExtItems,
    updateExtPagination,
    updateExtSort,
} from 'redux/userAdmin/actions';
import UserResultView from './pageComponents/UserResultView';
import UserSearchDataTable from './pageComponents/UserSearchDataTable';
import TablePager from '../FindProject/pageComponents/TablePager';
//import ResultsPerPageDropDown from './pageComponents/ResultsPerPageDropDown.js';

class UserAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCount: [10, 25, 50],
            searchTerm: '',
            filters: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
    }

    componentDidMount(props) {
        this.handleUserSearch();
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
        updateSearchTerm(event.target.value);
    }

    handleUserSearch() {
        this.props.fetchUsers();
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
                                pageNumber={this.props.requestingUserState.pageNumber}
                                totalItems={this.props.requestingUserState.totalItems}
                                itemsPerPage={this.props.requestingUserState.itemsPerPage}
                                userList={this.props.requestingUserState.userList}
                                handlePaginationChange={this.props.updateReqPagination}
                                setItemsPerPage={this.props.updateReqItems}
                                handleColumnSort={this.props.updateReqSort}
                            />
                        </Tab>
                        <Tab eventKey="exist-users" title="Existing Users">
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
                            />
                        </Tab>
                    </Tabs>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { requestingUserState, existingUserState } = state.userAdmin;

    return {
        requestingUserState,
        existingUserState,
    };
}

const actionCreators = {
    fetchUsers,
    updateReqItems,
    updateReqPagination,
    updateReqSort,
    updateExtItems,
    updateExtPagination,
    updateExtSort,
};

export default connect(
    mapStateToProps,
    actionCreators
)(UserAdministration);
