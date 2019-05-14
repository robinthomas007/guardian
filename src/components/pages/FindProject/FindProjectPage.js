import React, { Component } from 'react';
import {Table, Grid, Button, Form, Pagination } from 'react-bootstrap'; 
import './FindProject.css';
import { AST_This } from 'terser';
import IntroModal from '../../modals/IntroModal';

class TablePager extends Component {
	constructor(props) {
        super(props);
        this.state = {
			activePage : 1,
			items :  this.props.items,
			limit :  5,
			pageCount : this.props.items,
			totalItems : this.props.totalItems,
			itemsPerPage : this.props.itemsPerPage,
			pagerStart : 0,
			pagerEnd : 5
		}

		this.handlePageClick = this.handlePageClick.bind(this);
		this.handlePageNextClick = this.handlePageNextClick.bind(this);
		this.handlePagePreviousClick = this.handlePagePreviousClick.bind(this);
	}

	handlePageClick(e) {
		const pageValue = parseInt(e.target.innerHTML)
		this.setState({activePage : pageValue })
		this.props.handlePaginationChange(pageValue)
	}

	handlePageNextClick() {
		const pageValue = parseInt(this.state.activePage) + 1
		let buttonCount = Math.ceil( parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage))
		let pagerStart = this.state.pagerStart
		let pagerEnd = parseInt(this.state.pagerEnd)

		if(pageValue <= buttonCount) {
			this.setState({activePage : pageValue })
			this.props.handlePaginationChange(pageValue)
		} else if(pageValue < 1) {
			this.setState({pagerStart : pageValue })
		} else if ( (pageValue > pagerStart) && (pageValue < buttonCount) ){
			this.setState({pagerStart : pageValue})
		} 

		if ( (pageValue >= pagerEnd) && buttonCount > pagerEnd) {
			this.setState({pagerStart : pageValue - 3})
			this.setState({pagerEnd : pageValue + 2})
		} 
	}

	handlePagePreviousClick() {
		const pageValue = parseInt(this.state.activePage) - 1
		let buttonCount = Math.ceil( parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage))
		let pagerStart = this.state.pagerStart
		let pagerEnd = parseInt(this.state.pagerEnd)
		let newPagerStart = (buttonCount - pagerStart)

		if(buttonCount > this.state.limit)  {
			buttonCount = this.state.limit
		}

		if(pageValue > 0) {
			this.setState({activePage : pageValue })
			this.props.handlePaginationChange(pageValue)
		} 

		if ( (pageValue <= pagerStart) && buttonCount > pagerStart) {
			this.setState({pagerStart : 0})
			this.setState({pagerEnd : buttonCount})
		}
	}

	render() {


		const buttonCount = Math.ceil( parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage))
		const paginationItems = []
		let pagerStart = this.state.pagerStart
		let pagerEnd = (buttonCount > this.state.pagerEnd) ? this.state.pagerEnd : buttonCount

		for (var i = pagerStart; i < pagerEnd; i++) {
			paginationItems.push(<Pagination.Item key={i + 1} className={this.state.activePage === i+1 ? 'active' : ''} onClick={this.handlePageClick}>{i + 1}</Pagination.Item>);
		}

		return(
			<Pagination activepage={this.state.activePage} items={5} limit={5}>
				<Pagination.Prev onClick={this.handlePagePreviousClick} />
				{paginationItems}
				<Pagination.Next onClick={this.handlePageNextClick}/>
			</Pagination>
		)
	}
}

class FindProjectPage extends Component {
  
	constructor(props) {
        super(props);
        this.state = {
			searchResults : {},
			searchCriteria : {
				searchTerm : '',
				searchId : '',
				itemsPerPage : '50',
				pageNumber : '1',
				sortColumn : '',
				sortOrder : ''
			},
			searchResultsCount : 0,
			currentPageNumber : 1
		}

		this.renderProjects = this.renderProjects.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleProjectSearch = this.handleProjectSearch.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.setProjectsView = this.setProjectsView.bind(this);
		this.handlePaginationChange = this.handlePaginationChange.bind(this);
	}


	handleProjectSearch() {
		const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
            "User" : {
				"email" : user.email
			},
			"SearchCriteria" : this.state.searchCriteria
		})
		
        fetch ('https://api-dev.umusic.net/guardian/project/search', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        )
        .then (responseJSON => 
            {
				this.setState( {searchResults : responseJSON.Projects })
				this.updateSearchCount(responseJSON)
            }
        )
        .catch(
            error => console.error(error)
		);
	}

	componentDidMount(props) {
		this.handleProjectSearch()
    }

	updateSearchCount(responseJSON) {
		this.setState({searchResultsCount : responseJSON.TotalItems})
	}


	handleRowClick = (projectID) => {
		this.props.history.push('/reviewSubmit/' + projectID)
	}

    handleChange(event) {
        this.setState( {searchCriteria : { ...this.state.searchCriteria, "searchTerm" : event.target.value}} )
    }

	renderProjects(projects) {

		const checkStepStatus = (stepStatus) => {
			if(stepStatus) {
				return(
					<label class="custom-checkbox">
						<input disabled type="checkbox" checked/>
						<span class="static-checkmark"></span>
					</label> 
				)
			} else {
				return(
					<i className="material-icons">block</i>
				)
			}
		}

		if(projects) {
			return Object.keys(projects).map(function(project, i) {
				return(
					<tr key={i} onClick={() => this.handleRowClick(projects[project].projectID)}>
						<td>{projects[project].projectTitle}</td>
						<td>{projects[project].projectArtistName}</td>
						<td>{projects[project].projectReleasingLabel}</td>
						<td className="text-nowrap centered">{projects[project].projectLastModified}</td>
						<td className="status text-nowrap"><span>In Progress</span></td>
						<td className="status centered">{checkStepStatus(projects[project].isStep1Complete)}</td>
						<td className="status centered">{checkStepStatus(projects[project].isStep2Complete)}</td>
						<td className="status centered">{checkStepStatus(projects[project].isStep3Complete)}</td>
						<td className="status centered">{checkStepStatus(projects[project].isStep4Complete)}</td>
						<td className="status centered">{checkStepStatus(projects[project].isStep5Complete)}</td>
						<td className="status centered">{checkStepStatus(projects[project].isStep6Complete)}</td>
					</tr>
				)
			}.bind(this))
		}
	}

	handleKeyUp(e) {
		if(e.key === 'Enter') {
			this.handleProjectSearch()
		}		
	}

	setProjectsView(e) {
		const itemCount = parseInt(e.target.innerHTML)
		this.setState(currentState => ({searchCriteria : { ...this.state.searchCriteria, 'itemsPerPage' : itemCount}}), () => {
			this.handleProjectSearch()
		});
	}

	handlePaginationChange(newPage) {
		const page = (parseInt(newPage) -1 )
		this.setState(currentState => ({searchCriteria : { ...this.state.searchCriteria, 'pageNumber' : newPage}}), () => {
			this.handleProjectSearch()
		});
	}



    render() {

        const saveAndContinue = () => {
            alert('Save Contacts and Continue')
        }

		return(
            <div>
				
				<IntroModal />

				<section className="page-container">
					<div className="row">
						<div className="col 4">
							<h1>Find A Project</h1>
						</div>
						<div className="col-7">
						</div> 
					</div>
				
					<div className="row no-gutters step-description">
						<div className="col-12">
							<p>Search for an existing project or release in the search bar below. Projects can be located by Artist, Track, ISRC or Project Title (Album, Compilation, EP, or Single name). <br />
							Can't find what you're looking for? Email us at <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
							</p>
					</div> 
				</div>
				<ul className="row search-row">
					<li className="col-2 d-flex"></li>
					<li className="col-8 d-flex justify-content-center">
						<button className="btn btn-secondary" type="button"><i className="material-icons">settings</i> Filters</button>
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
			
			
				<ul className="row no-gutters results-controls">
					<li className="col-4 d-flex">
					<span>Viewing</span>
					
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
							{this.state.searchCriteria.itemsPerPage}
						</a>
						<div className="dropdown-menu" aria-labelledby="viewCountdropdown">
							<a className="dropdown-item" onClick={this.setProjectsView}>10</a>
							<a className="dropdown-item" onClick={this.setProjectsView}>25</a>
							<a className="dropdown-item" onClick={this.setProjectsView}>50</a>
						</div>
					</div>
					
					<span>of {this.state.searchResultsCount} Results</span>
					</li>
					<li className="col-4 d-flex justify-content-center">
						<nav aria-label="Page navigation example">
							<TablePager 
								activePage={this.state.searchCriteria.pageNumber} 
								totalItems={this.state.searchResultsCount} 
								itemsPerPage={this.state.searchCriteria.itemsPerPage}
								handlePaginationChange={this.handlePaginationChange}
								projectViewCount={this.state.searchCriteria.itemsPerPage}
							/>
						</nav>
					</li>
					<li className="col-4 d-flex"></li>
				</ul>

			<div className="table-responsive">
				<Table>
					<thead>
						<tr>
							<th className="w-15 text-nowrap">Project Title</th>
							<th className="w-10">Artist</th>
							<th className="w-5">Label</th>
							<th className="w-5 centered text-nowrap">Last Update</th>
							<th className="w-5">Status</th>
							<th className="centered">Project</th>
							<th className="centered">Contacts</th>
							<th className="centered">Audio</th>
							<th className="centered">Tracks</th>
							<th className="centered">Territories</th>
							<th className="centered">Blocking</th>
						</tr>
					</thead>
					<tbody>
						{this.renderProjects(this.state.searchResults)}
					</tbody>
				</Table>
				</div>
			</section>
    	</div>

		)
	}
}

export default FindProjectPage;