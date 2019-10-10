import React, { Component } from 'react';
import TablePager from '../../FindProject/pageComponents/TablePager';
import UserSearchDataTable from './UserSearchDataTable';

class UserResultView extends Component{
	constructor(props) {
		super(props);
	}

	getViewCount = () => {
		const options = this.props.viewCount.map((option, i) => {
			return(
				<a key={i} className="dropdown-item" onClick={val => this.props.setItemsPerPage(option)}>{ option }</a>
			)
		});
		return(options);
	};

	render() {
		return (
			<>
				<br></br>
				<ul className="row results-controls">
					<li className="col-4">
						<span className="viewing">Viewing</span>

						<div className="dropdown show">
							<a 
								className="btn btn-secondary dropdown-toggle" 
								href="#" 
								role="button" 
								id="viewCountdropdown" 
								data-toggle="dropdown" 
								aria-haspopup="true" 
								aria-expanded="false"
							>
								{this.props.itemsPerPage}
							</a>
							<div className="dropdown-menu" aria-labelledby="viewCountdropdown">
								{this.getViewCount()}
							</div>
						</div>

						<span className="viewing">of Count Results</span>

					</li>
					<li className="col-4 d-flex justify-content-center">
						<nav aria-label="Page navigation example">
							<TablePager 
								activePage={this.props.pageNumber} 
								totalItems={this.props.totalItems} 
								itemsPerPage={this.props.itemsPerPage}
								handlePaginationChange={this.props.handlePaginationChange}
							/>
						</nav>
					</li>
					<li className="col-4 d-flex"></li>
				</ul>

				<div className="table-responsive">
					<UserSearchDataTable
						type={this.props.type}
						userData={JSON.parse(sessionStorage.getItem('user'))}
						data={this.props.userList}
						handleColumnSort={this.props.handleColumnSort}
					/>
				</div>
			</>
		)
  }
}

export default UserResultView;