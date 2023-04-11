import React, { Component } from 'react';
import { Tab } from 'react-bootstrap';
import ViewCountDropDown from '../pageComponents/ViewCountDropDown';
import TablePager from '../../FindProject/pageComponents/TablePager';
import UserDataTable from '../pageComponents/UserDataTable';

class RequestingAccessTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <br />

        <ul className="row results-controls">
          <li className="col-4">
            <span className="viewing">Viewing</span>
            <ViewCountDropDown
              data={this.props.viewCountData}
              onChange={this.props.viewCountOnChange}
              defaultValue={this.props.viewCountDefaultValue}
            />
            <span className="viewing">of {this.props.totalSearchItems} Results</span>
          </li>
          <li className="col-4 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <TablePager
                activePage={1}
                totalItems={this.props.totalSearchItems}
                itemsPerPage={this.props.itemsPerPage}
                handlePaginationChange={this.props.handlePaginationChange}
              />
            </nav>
          </li>
          <li className="col-4 d-flex"></li>
        </ul>

        <div className="table-responsive">
          <UserDataTable
            data={this.props.tableData}
            handleColumnSort={this.props.handleColumnSort}
            pageView={this.props.pageView}
            approveDenyUser={this.props.approveDenyUser}
            userData={this.props.userData}
          />
        </div>
      </>
    );
  }
}

export default RequestingAccessTab;
