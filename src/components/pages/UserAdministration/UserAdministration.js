import React, { Component } from 'react';
import {Accordion, Card, Button, Tab, Tabs, Table} from 'react-bootstrap'; 

class UserAdministration extends Component {
render() {
    return (
<div>
        <section className="page-container">
            <div className="row d-flex no-gutters">
                <div className="col-12">
                    <h1>User Administration</h1>
                        <p>Search for an existing  <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
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
									aria-expanded="false">
									<i className="material-icons">settings</i> Filters
								</button>
						
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<h5>Search Filters</h5>

									<br />
						
									<div className="row no-gutters">
										<div className="col-2">
											<label>By Label</label>	
										</div>
							
										<div className="col-4">
										
										</div>
							
										<div className="col-2">
											<label>By Status</label>
										</div>
							
										<div className="col-4">
										
										</div>

										<div className="col-2">
											<label>Has Audio</label>
											</div>
										<div className="col-4">
										
										</div>

										<div className="col-2">
										<label>Has Blocking</label>
										</div>
										<div className="col-4">
										
										</div>

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
							onKeyUp={this.handleKeyUp}
						/>
						<button 
							id="projectSearchButton" 
							className="btn btn-primary" 
							type="button" 
							onClick={this.handleProjectSearch}
						><i className="material-icons">search</i> Search</button>
					</li>
					<li className="col-2 d-flex"></li>
				</ul>
				<ul className="row search-row filters">
					<li className="col-2 d-flex"></li>
					<li className="col-8 d-flex">
						Selected Filters:
						<span><label>Label: </label> <button className="btn btn-sm btn-secondary">Label Name <i className="material-icons">close</i></button></span>
						<span><label>Last Update: </label> <button className="btn btn-sm btn-secondary">12/28/2018 <i className="material-icons">close</i></button></span>
					</li>
					<li className="col-2 d-flex"></li>
				</ul>
			</section>
			
			<section className="page-container">
			
			
				<ul className="row results-controls">
					<li className="col-4 d-flex">
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
				
						</a>
						<div className="dropdown-menu" aria-labelledby="viewCountdropdown">
							<a className="dropdown-item" onClick={this.setProjectsView}>10</a>
							<a className="dropdown-item" onClick={this.setProjectsView}>25</a>
							<a className="dropdown-item" onClick={this.setProjectsView}>50</a>
						</div>
					</div>
					
					<span className="viewing">of Count Results</span>
					</li>
					<li className="col-4 d-flex justify-content-center">
						<nav aria-label="Page navigation example">
						
						</nav>
					</li>
					<li className="col-4 d-flex"></li>
				</ul>

			<div className="table-responsive">
				<Table>
					<thead>
						<tr className='row'>
							<th className="col-1">Request Date</th>
                            <th className="col-2">First Name</th>
                            <th className="col-2">Last Name</th>
                            <th className="col-2">Email</th>
                            <th className="col-2">Label</th>
                            <th className="col-2">Phone</th>
                            <th className="col-1">Actions</th>
						</tr>
					</thead>
					<tbody>
						    <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
					</tbody>
				</Table>
				</div>
			</section>
</div>
        )
    }
};

export default UserAdministration;