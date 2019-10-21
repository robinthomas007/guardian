import React, { Component } from 'react';
import { convertToLocaleTime } from '../../../Utils';
import { Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { APPROVE, DENY } from 'redux/userAdmin/constants';

class UserSearchDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeSortColumn: 'last_updated',
            activeSortDesc: true,
            activeHover: null,
        };

        this.handleSortDisplay = this.handleSortDisplay.bind(this);
    }

    checkProjectStepStatus = stepStatus => {
        return stepStatus ? <i className="material-icons success">verified_user</i> : <i className="material-icons">block</i>;
    };

    handleRowClick = projectID => {
        this.props.history.push('/reviewSubmit/' + projectID);
    };

    handleTableSort = columnID => {
        this.props.handleColumnSort(columnID);
    };

    handleSortDisplay = columnID => {
        return this.state.activeSortColumn === columnID ? (
            this.state.activeSortDesc ? (
                <i className={'material-icons'}>arrow_drop_down</i>
            ) : (
                <i className={'material-icons'}>arrow_drop_up</i>
            )
        ) : (
            ''
        );
    };

    handleMouseOver = (e, columnID) => {
        return this.state.activeSortColumn !== columnID ? this.setState({ activeHover: columnID }) : null;
    };

    handleMouseOut = (e, columnID) => {
        this.setState({ activeHover: null });
    };

    handleHoverDisplay = columnID => {
        return <i className={this.state.activeHover === columnID ? 'material-icons' : 'material-icons d-none'}>arrow_drop_up</i>;
    };

    handleProjectDownload = (projectID, projectFileName) => {
        const user = JSON.parse(sessionStorage.getItem('user'));

        fetch('https://api-dev.umusic.net/guardian-media/api/Submit?projectid=' + projectID, {
            method: 'GET',
            headers: new Headers({
                Authorization: sessionStorage.getItem('accessToken'),
                'User-Email': user.email,
            }),
        })
            .then(response => {
                return response.blob();
            })
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = projectFileName;
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove(); //afterwards we remove the element again
            });
    };

    renderProjects() {
        const tableRows = this.props.data.map((user, i) => {
            return (
                <tr className="w-100" key={i}>
                    <td>{convertToLocaleTime(user.dateAdded || user.dateRequested)}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td className="status text-nowrap">
                        <span>{user.primaryLabel}</span>
                    </td>
                    <td className="status text-nowrap">
                        {this.props.type === 'requesting' ? (
                            <>
                                <Button variant="light" onClick={() => this.props.approveDenyUser(user.accessRequestID, DENY)}>
                                    Deny
                                </Button>
                                <Button onClick={() => this.props.approveDenyUser(user.accessRequestID, APPROVE)}>Approve</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="light">Edit</Button>
                                <Button>Revoke</Button>
                            </>
                        )}
                    </td>
                </tr>
            );
        });

        return tableRows;
    }

    getDataTable = () => {
        return (
            <Table className="search-table">
                <thead>
                    <tr>
                        <th
                            className="text-nowrap sortable"
                            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'date_created')}
                            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'date_created')}
                            onClick={id => this.handleTableSort('date_created')}
                        >
                            Request Date
                            {this.handleSortDisplay('date_created')}
                            <i className={this.state.activeHover === 'date_created' ? 'material-icons' : 'material-icons d-none'}>arrow_drop_down</i>
                        </th>
                        <th
                            className="text-nowrap sortable"
                            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'first_name')}
                            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'first_name')}
                            onClick={id => this.handleTableSort('first_name')}
                        >
                            First Name
                            {this.handleSortDisplay('first_name')}
                            <i className={this.state.activeHover === 'first_name' ? 'material-icons' : 'material-icons d-none'}>arrow_drop_up</i>
                        </th>
                        <th
                            className="sortable"
                            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'last_name')}
                            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'last_name')}
                            onClick={id => this.handleTableSort('last_name')}
                        >
                            Last Name
                            {this.handleSortDisplay('last_name')}
                            <i className={this.state.activeHover === 'last_name' ? 'material-icons' : 'material-icons d-none'}>arrow_drop_up</i>
                        </th>
                        <th
                            className="sortable"
                            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'email')}
                            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'email')}
                            onClick={id => this.handleTableSort('email')}
                        >
                            Email
                            {this.handleSortDisplay('email')}
                            <i className={this.state.activeHover === 'email' ? 'material-icons' : 'material-icons d-none'}>arrow_drop_up</i>
                        </th>
                        <th
                            className="sortable"
                            onMouseOver={(e, columnID) => this.handleMouseOver(e, 'label')}
                            onMouseOut={(e, columnID) => this.handleMouseOut(e, 'label')}
                            onClick={id => this.handleTableSort('label')}
                        >
                            Label/Co.
                            {this.handleSortDisplay('label')}
                            <i className={this.state.activeHover === 'label' ? 'material-icons' : 'material-icons d-none'}>arrow_drop_up</i>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderProjects()}</tbody>
            </Table>
        );
    };

    componentDidMount() {
        this.setState({
            data: this.props.data,
            userData: this.props.userData,
        });
    }

    render() {
        return this.getDataTable();
    }
}

export default withRouter(UserSearchDataTable);
