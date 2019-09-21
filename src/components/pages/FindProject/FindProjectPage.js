import React, { Component } from 'react';
import {Table, Grid, Button, Form, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 
import './FindProject.css';
import { AST_This } from 'terser';
import IntroModal from '../../modals/IntroModal';
import FilterDropdown from './pageComponents/FilterDropdown';
import FindProjectDataTable from './pageComponents/FindProjectDataTable';

import { convertToLocaleTime } from '../../Utils';

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
			pagerEnd : 5,
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

		if ( (pageValue < pagerStart) && buttonCount > pagerStart) {
			this.setState({pagerStart : (pageValue - 3) > 0 ? pageValue : 0})
			this.setState({pagerEnd : buttonCount})	
		}
	}

	componentDidUpdate() {
		let buttonCount = Math.ceil( parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage))
		const pageValue = parseInt(this.state.activePage) - 1

		if (pageValue > buttonCount) {
			this.setState(currentState => ({activePage : buttonCount }), () => {
				this.props.handlePaginationChange(this.state.activePage)
			});
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

class LabelsInput extends Component {
    constructor(props) {
		super(props);
		this.state = {}
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(e) {
		this.props.onChange(e);
	}

    render() {
        let labelOptions = ''
        if(this.props.pageState.labelFacets) {

			labelOptions = this.props.pageState.labelFacets.map( (label, i) => {
				const isChecked = (this.props.pageState.searchCriteria.filter.labelIds.indexOf(label.id) >= 0) ? true : false;
				return(
					<a className="dropdown-item" key={i}>
						<label className="custom-checkbox"> 		
							<input   
								onClick={(e) => this.props.onChange(e)}
								type='checkbox'
								id={label.id}
								value={label.id}
								checked={isChecked}
							/>
							<span className="checkmark "></span>
						</label>
						
						<label htmlFor={label.id}>
							{label.name}
						</label>
					</a>
				   )
			})
        }
        return(
			<div className="multi-select dropdown">
				<button 
					className="btn btn-secondary dropdown-toggle" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false">
					Select Option
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{labelOptions}
				</div>
			</div>
        )
    }
}

class NameIdDropdown extends Component {
    constructor(props) {
		super(props);
		this.state = {
			selectedID : '',
			selectedText : this.props.defaultText
		}
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(data) {

        const currentState = this.state;
		const modifiedState = currentState;
			  modifiedState.selectedID = data.id;
			  modifiedState.selectedText = data.name;

		this.setState({currentState : modifiedState})
		this.props.onChange(data);
	}

	getDefaultOption(defaultText) {
		const data = {}
			  data.name = defaultText;
			  data.id = '';

		if(defaultText && defaultText !== '') {
			return(
				<a className="dropdown-item selected" onClick={() => this.handleChange(data)}>{defaultText}</a>
			)
		} else {
			return(null)
		}
	}

    render() {
        let inputOptions = []


		if(this.props.data) {
			inputOptions = this.props.data.map( (data, i) =>
				<a className="dropdown-item selected" onClick={() => this.handleChange(data)}>{data.name}</a>
			)
		}
		
        return(
			<div className="dropdown">
				<button 
					className="btn btn-secondary dropdown-toggle" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false">
					{this.state.selectedText}
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.getDefaultOption(this.props.defaultText)}
					{inputOptions}
				</div>
			</div>
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
				itemsPerPage : '10',
				pageNumber : '1',
				sortColumn : '',
				sortOrder : '',
				filter : {
					labelIds : [],
					hasAudio : '',
					hasBlocking : '',
					statusID : '',
					from : '',
					to : ''
				},
			},

			project : {
				Projects : []
			},

			labelFacets : [],
			hasAudioFacets : [],
			hasBlockingFacets : [],
			statusFacets : [],

			showFilterModal : false,
			searchResultsCount : 0,
			currentPageNumber : 1
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleProjectSearch = this.handleProjectSearch.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.setProjectsView = this.setProjectsView.bind(this);
		this.handlePaginationChange = this.handlePaginationChange.bind(this);
		this.handleFilterModalView = this.handleFilterModalView.bind(this);
		this.setDateFilter = this.setDateFilter.bind(this);
		this.handleAudioFacetsChange = this.handleAudioFacetsChange.bind(this);
		this.handleLabelFacetsChange = this.handleLabelFacetsChange.bind(this);
		this.handleStatusFacetsChange = this.handleStatusFacetsChange.bind(this);
		this.handleHasBlockingFacetsChange = this.handleHasBlockingFacetsChange.bind(this);
		
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
			"SearchCriteria" : this.state.searchCriteria,
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

				this.setState( { 
					searchResults : responseJSON.Projects,
					project : responseJSON 
				}) 

				if(this.state.labelFacets.length <= 0 ) {
					this.setState( {labelFacets : responseJSON.LabelFacets })
				}

				// if(this.state.statusFacets.length <= 0 ) {
				// 	//this.setState( {statusFacets : responseJSON.StatusFacets })
				// }
				
				// if(this.state.hasBlockingFacets.length <= 0 ) {
				// 	this.setState( {hasBlockingFacets : responseJSON.HasBlockingFacets })
				// }
				
				// if(this.state.hasAudioFacets.length <= 0 ) {
				// 	this.setState( {hasAudioFacets : responseJSON.HasAudioFacets })
				// }

            }
        )
        .catch(
            error => console.error(error)
		);

	}

	handleAudioFacetsChange(data){
		const { filter } = this.state.searchCriteria;
		let modifiedHasAudio = filter;
			modifiedHasAudio.hasAudio = data.id;

		this.setState(currentState => ({filter : modifiedHasAudio}), () => {
			this.handleProjectSearch()
		});
	}

	handleLabelFacetsChange(e){

		
		const { labelIds } = this.state.searchCriteria.filter;
		let modifiedLabelFacets = [];

		if(e.target.checked) {
			labelIds.push(e.target.value)
		} else {
			var index = labelIds.indexOf(e.target.value)
			labelIds.splice(index, 1)
		}

		this.setState(currentState => ({ labelIds }), () => {
			this.handleProjectSearch()
		});
	}

	handleStatusFacetsChange(data) {
		const { filter } = this.state.searchCriteria;
		let modifiedStatus = filter;
			modifiedStatus.statusID = data.id;

		this.setState(currentState => ({filter : modifiedStatus}), () => {
			this.handleProjectSearch()
		});
	}

	handleHasBlockingFacetsChange(data) {
		const { filter } = this.state.searchCriteria;
		let modifiedHasBlocking = filter;
			modifiedHasBlocking.hasBlocking = data.id;

		this.setState(currentState => ({filter : modifiedHasBlocking}), () => {
			this.handleProjectSearch()
		});
	}

	componentDidMount(props) {
		this.handleProjectSearch()
    }

    handleChange(event) {
        this.setState( {searchCriteria : { ...this.state.searchCriteria, "searchTerm" : event.target.value}} )
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

		this.setState({activePage : newPage })
	}

	setFilter(e) {
		e.preventDefault();
	}

	handleSearchModalClick(e) {
		e.stopPropagation();
	}

	handleFilterModalView() {
		(this.state.showFilterModal) ? this.setState({ showFilterModal: false }) :  this.setState({ showFilterModal: true })
	}

	getToDate(date) {
		let toDate = new Date(date)
			toDate.setHours(23,59,59);	
			toDate.setDate(toDate.getDate() + 1)
		toDate = toDate.toISOString().replace('Z', '')
		return(toDate)
	}

	getFromDate(date) {
		let toDate = new Date(date)
			toDate.setHours(0,0,1);	

		toDate = toDate.toISOString().replace('Z', '')
		return(toDate)
	}

	setDateFilter(e) {
		let targetDate = (e.target.value) ?  e.target.value : ''
		let filterState = this.state.searchCriteria.filter

		if(e.target.id == 'filterStartDate') {
			filterState.from = (targetDate != '') ? this.getFromDate(targetDate) : ''
		} else {
			filterState.to = (targetDate != '') ? this.getToDate(targetDate) : ''
		}

		this.setState(currentState => ({filterState}), () => {
			this.handleProjectSearch()
			this.handleFilterModalView()
		});
	}

	saveAndContinue = () => {
		alert('Save Contacts and Continue')
	}
	
	handleColumnSort = (columnID, columnSortOrder) => {
		const { searchCriteria } = this.state;
		let modifiedSearchCriteria = searchCriteria;
			modifiedSearchCriteria.sortOrder = columnSortOrder;
			modifiedSearchCriteria.sortColumn = columnID;
		this.setState( {searchCriteria : modifiedSearchCriteria}, () => {this.handleProjectSearch()} )
	}
	
    render() {
		return(
            <div>
				
				<IntroModal />

				<section className="page-container">
					<div className="row d-flex no-gutters">
						<div className="col-12">
							<h1>Find A Project</h1>
							<p>
								Search for an existing project or release in the search bar below. Projects can be located by Artist, Track, ISRC or Project Title (Album, Compilation, EP, or Single name). <br />
								Can't find what you're looking for? Email us at <a href="mailto:guardian-support@umusic.com">guardian-support@umusic.com</a>.
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
						
								<div className={this.state.showFilterModal ? "dropdown-menu search-filters d-block" : "dropdown-menu search-filters d-none"} aria-labelledby="dropdownMenuButton">
									<h5>Search Filters</h5>

									<br />
						
									<div className="row no-gutters">
										<div className="col-2">
											<label>By Label</label>	
										</div>
							
										<div className="col-4">
											<LabelsInput 
												pageState={this.state} 
												onChange={this.handleLabelFacetsChange}
												defaultText="Select Option"
											/>
										</div>
							
										<div className="col-2">
											<label>By Status</label>
										</div>
							
										<div className="col-4">
											<NameIdDropdown 
												data={this.state.statusFacets}
												onChange={this.handleStatusFacetsChange} 
												defaultText="Select Option"
											/>		
										</div>

										<div className="col-2">
											<label>Has Audio</label>
										</div>
										<div className="col-4">
											<NameIdDropdown 
												data={this.state.hasAudioFacets} 
												onChange={this.handleAudioFacetsChange} 
												defaultText="Select Option"
											/>
										</div>

										<div className="col-2">
											<label>Has Blocking</label>
										</div>
										<div className="col-4">
											<NameIdDropdown 
												data={this.state.hasBlockingFacets} 
												onChange={this.handleHasBlockingFacetsChange} 
												defaultText="Select Option"
											/>
										</div>

									<div className="col-2">
										<label>Last Updated</label>
									</div>
							
									<div className="col-10">
										<Form.Control 
											id="filterStartDate"
											type="date" 
											onChange={this.setDateFilter} 
										/>
										
										<label> to</label>
										
										<Form.Control 
											id="filterEndDate"
											type="date" 
											onChange={this.setDateFilter} 
										/>
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
								{this.state.searchCriteria.itemsPerPage}
							</a>
							<div className="dropdown-menu" aria-labelledby="viewCountdropdown">
								<a className="dropdown-item" onClick={this.setProjectsView}>10</a>
								<a className="dropdown-item" onClick={this.setProjectsView}>25</a>
								<a className="dropdown-item" onClick={this.setProjectsView}>50</a>
							</div>
						</div>
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
					<FindProjectDataTable 
						data={this.state.project.Projects}
						handleColumnSort={ (columnID, columnSortOrder) => this.handleColumnSort(columnID, columnSortOrder)}
					/>
				</div>
			</section>
    	</div>

		)
	}
}

export default FindProjectPage;