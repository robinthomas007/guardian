import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import './FindProject.css';

class FindProjectPage extends Component {
  
    render() {

        const saveAndContinue = () => {
            alert('Save Contacts and Continue')
        }

        return(
            <div>
				<section class="page-container">
					<div class="row">
						<div class="col 4">
							<h1>Find A Project</h1>
						</div>
						<div class="col-7">
						</div> 
					</div>
				
					<div class="row no-gutters step-description">
						<div class="col-12">
							<p>Search for an existing project or release in the search bar below. Projects can be located by Artist, Track, ISRC or Project Title (Album, Compilation, EP, or Single name). <br />
							Can't find what you're looking for? Email us at <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
							</p>
					</div> 
				</div>
				<ul class="row search-row">
					<li class="col-2 d-flex"></li>
					<li class="col-8 d-flex justify-content-center">
						<button class="btn btn-secondary" type="button"><i class="material-icons">settings</i> Filters</button>
						<input class="form-control" type="search" />
						<button class="btn btn-primary" type="button"><i class="material-icons">search</i> Search</button>
					</li>
					<li class="col-2 d-flex"></li>
				</ul>
				<ul class="row search-row filters">
					<li class="col-2 d-flex"></li>
					<li class="col-8 d-flex">
						Selected Filters:
						<span><label>Label: </label> <button class="btn btn-sm btn-secondary">Label Name <i class="material-icons">close</i></button></span>
						<span><label>Last Update: </label> <button class="btn btn-sm btn-secondary">12/28/2018 <i class="material-icons">close</i></button></span>
					</li>
					<li class="col-2 d-flex"></li>
				</ul>
			</section>
			
			<section class="page-container">
			
			
				<ul class="row no-gutters results-controls">
					<li class="col-4 d-flex">
					<span>Viewing</span>
					
					<div class="dropdown show">
						<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="viewCountdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						10
						</a>

						<div class="dropdown-menu" aria-labelledby="viewCountdropdown">
						<a class="dropdown-item" href="#">10</a>
						<a class="dropdown-item" href="#">25</a>
						<a class="dropdown-item" href="#">50</a>
						</div>
					</div>
					
					<span>of #Results Count# Results</span>
					</li>
					<li class="col-4 d-flex justify-content-center">
						<nav aria-label="Page navigation example">
							<ul class="pagination">
							<li class="page-item">
								<a class="page-link" href="#" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
								<span class="sr-only">Previous</span>
								</a>
							</li>
							<li class="page-item"><a class="page-link" href="#">1</a></li>
							<li class="page-item"><a class="page-link" href="#">2</a></li>
							<li class="page-item"><a class="page-link" href="#">3</a></li>
							<li class="page-item">
								<a class="page-link" href="#" aria-label="Next">
								<span aria-hidden="true">&raquo;</span>
								<span class="sr-only">Next</span>
								</a>
							</li>
							</ul>
						</nav>
					</li>
					<li class="col-4 d-flex"></li>
				</ul>

			
				<table class="table">
					<thead>
						<tr>
							<th>Project Title</th>
							<th>Artist</th>
							<th>Label</th>
							<th class="centered">Last Update</th>
							<th>Status</th>
							<th class="centered">Project</th>
							<th class="centered">Contacts</th>
							<th class="centered">Audio</th>
							<th class="centered">Tracks</th>
							<th class="centered">Territories</th>
							<th class="centered">Blocking</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
						<tr>
							<td>Project Title Name</td>
							<td>Artist Name</td>
							<td>Label Name</td>
							<td class="centered">12/28/2018</td>
							<td class="status"><span>In Progress</span></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
							<td class="status centered"><i class="material-icons">block</i></td>
						</tr>
					</tbody>
				</table>
			</section>
    </div>

				)
	}
}
export default FindProjectPage;
	
