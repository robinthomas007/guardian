import React, { Component } from 'react';
import './FindProject.css';
import IntroModal from '../../modals/IntroModal';
import FindProjectDataTable from './pageComponents/FindProjectDataTable';
import SearchFilterModal from './pageComponents/SearchFiltersModal';
import ProjectsViewDropDown from './pageComponents/ProjectsViewDropDown';
import SelectedFilters from './pageComponents/SelectedFilters';
import TablePager from './pageComponents/TablePager';
import { resetDatePicker } from '../../Utils'
import { withRouter } from "react-router";
import LoadingImg from '../../ui/LoadingImg';

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
					labels : [],
					labelIds : [],
					hasAudio : '',
					hasAudioName : '',
					hasBlocking : '',
					hasBlockingName : '',
					statusID : '',
					statusName : '',
					from : '',
					to : ''
				},
			},

			project : {
				Projects : [
					
				],

				Facets : {
					LabelFacets : []
				},

			},

			labels : [],
			defaultLabels : [],
			showFilterModal : false,
			currentPageNumber : 1,
			showLoader : false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleProjectSearch = this.handleProjectSearch.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.setProjectsView = this.setProjectsView.bind(this);
		this.handlePaginationChange = this.handlePaginationChange.bind(this);
		this.handleFilterModalView = this.handleFilterModalView.bind(this);
		this.setDateFilter = this.setDateFilter.bind(this);
		this.handleLabelFacetsChange = this.handleLabelFacetsChange.bind(this);
		this.handleStatusFacetsChange = this.handleStatusFacetsChange.bind(this);
		this.handleHasBlockingFacetsChange = this.handleHasBlockingFacetsChange.bind(this);
		
	}

	formatDefaultLabelList = (list) => {
		return(
			list.map( (label, i) => { 
				return ( {id: label.id, name : label.name, checked : false})
			})
		)
	};

	handleProjectSearch() {
		const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
			"SearchCriteria" : this.state.searchCriteria,
		})

        fetch (window.env.api.url + '/project/search', {
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
				if(this.state.defaultLabels.length <= 0){
					this.setState( { 
						defaultLabels : this.formatDefaultLabelList(responseJSON.Facets.LabelFacets)
					})
				}

				this.setState( { 
					project : responseJSON 
				}) 
            }
        )
        .catch(
            error => console.error(error)
		);

	}

	handleLabelFacetsChange = (e, i) => {
		const { labelIds } = this.state.searchCriteria.filter;
		let labelName = e.target.getAttribute('labelname') ? e.target.getAttribute('labelname') : '';

		const { defaultLabels } = this.state;
		let modifiedDefaultLabels = defaultLabels;

		const { labels } = this.state.searchCriteria.filter;
		let modifiedLabels = labels;

		if(e.target.checked) {
			labelIds.push(e.target.value);
			modifiedLabels.push(labelName);
			modifiedDefaultLabels[i].checked = true;
		} else {
			var index = labelIds.indexOf(e.target.value);
			labelIds.splice(index, 1);
			modifiedLabels.splice(index, 1);
			modifiedDefaultLabels[i].checked = false;
		}

		this.setState(
			currentState => ({ labelIds }), () => { this.handleProjectSearch()}
		);

		this.setState(
			{ 
				labels : modifiedLabels,
				defaultLabels : modifiedDefaultLabels
			}
		)
	}

	handleStatusFacetsChange = (data) => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.statusID = data.id;
			modifiedFilter.statusName = (data.id !== '') ? data.name : '';


		this.setState(currentState => ({filter : modifiedFilter}), () => {
			this.handleProjectSearch()
		});
	}

	handleHasAudioFacetsChange = (data) => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.hasAudio = data.id;
			modifiedFilter.hasAudioName = (data.id !== '') ? data.name : '';

		this.setState(currentState => ({filter : modifiedFilter}), () => {
			this.handleProjectSearch()
		});
	}

	handleHasBlockingFacetsChange = (data) => {
		const { filter } = this.state.searchCriteria;

		let modifiedFilter = filter;
			modifiedFilter.hasBlocking = data.id;
			modifiedFilter.hasBlockingName = (data.id !== '') ? data.name : '';

		this.setState(currentState => ({filter : modifiedFilter}), () => {
			this.handleProjectSearch()
		});
	}

	componentDidMount(props) {
		this.handleProjectSearch();
	}
	
	componentDidUpdate(props) {
        this.props.setProjectID('', this.props.match.url)
    }

    handleChange(event) {
        this.setState( {searchCriteria : { ...this.state.searchCriteria, "searchTerm" : event.target.value}} )
    }

	handleKeyUp(e) {
		if(e.key === 'Enter') {
			this.handleProjectSearch()
		}		
	}

	setProjectsView(count) {
		this.setState(currentState => ({searchCriteria : { ...this.state.searchCriteria, 'itemsPerPage' : count}}), () => {
			this.handleProjectSearch()
		});
	}

	handlePaginationChange(newPage) {
		this.setState(currentState => ({searchCriteria : { ...this.state.searchCriteria, 'pageNumber' : newPage}}), () => {
			this.handleProjectSearch()
		});
		this.setState({activePage : newPage })
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

		if(e.target.id === 'filterStartDate') {
			filterState.from = (targetDate !== '') ? this.getFromDate(targetDate) : ''
		} else {
			filterState.to = (targetDate !== '') ? this.getToDate(targetDate) : ''
		}

		this.setState(currentState => ({filterState}), () => {
			this.handleProjectSearch()
			this.handleFilterModalView()
		});
	}

	handleColumnSort = (columnID, columnSortOrder) => {
		const { searchCriteria } = this.state;
		let modifiedSearchCriteria = searchCriteria;
			modifiedSearchCriteria.sortOrder = columnSortOrder;
			modifiedSearchCriteria.sortColumn = columnID;
		this.setState( {searchCriteria : modifiedSearchCriteria}, () => {this.handleProjectSearch()} )
	}
	
	removeLabelsFilter = (labelID) => {
		const { defaultLabels } = this.state;
		const modifiedDefaultLabels = defaultLabels;
			  modifiedDefaultLabels[defaultLabels.map(function(label) { return label.id; }).indexOf(labelID)].checked = false;
		
		const { labelIds } = this.state.searchCriteria.filter;
		let modifiedLabelIds = labelIds;
			modifiedLabelIds.splice(labelIds.indexOf(labelID), 1);

		this.setState( {
			defaultLabels : modifiedDefaultLabels,
			labelIds : modifiedLabelIds
		}, () => {this.handleProjectSearch()} )
	};

	removeAudioFilter = () => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.hasAudio = '';
			modifiedFilter.hasAudioName = '';

		var filterInputObj = document.getElementById('filterHasAudio');
			filterInputObj.innerHTML = 'Select Option';

		this.setState( {
			filter : modifiedFilter,
		}, () => {this.handleProjectSearch()} )
	};

	removeBlockingFilter = () => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.hasBlocking = '';
			modifiedFilter.hasBlockingName = '';

		var filterInputObj = document.getElementById('filterHasBlocking');
			filterInputObj.innerHTML = 'Select Option';

		this.setState( {
			filter : modifiedFilter,
		}, () => {this.handleProjectSearch()} )
	};

	removeStatusFilter = () => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.statusID = '';
			modifiedFilter.statusName = '';

		var filterInputObj = document.getElementById('filterStatus');
			filterInputObj.innerHTML = 'Select Option';

		this.setState( {
			filter : modifiedFilter,
		}, () => {this.handleProjectSearch()} )
	};

	removeToDateFilter = () => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.to = '';

		resetDatePicker('filterEndDate');

		this.setState( {
			filter : modifiedFilter,
		}, () => {this.handleProjectSearch()} )
	};

	removeFromDateFilter = () => {
		const { filter } = this.state.searchCriteria;
		let modifiedFilter = filter;
			modifiedFilter.from = '';

		resetDatePicker('filterStartDate');

		this.setState( {
			filter : modifiedFilter,
		}, () => {this.handleProjectSearch()} )
	};

    handleAdminStatusChange = (data, project) => {
		this.setState( { showLoader : true } )
		const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
            "ProjectID": project.projectID,
            "StatusID": data.id,
		})

        fetch (window.env.api.url + '/project/status', {
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
				this.handleProjectSearch();
				this.setState( { showLoader : false } )
            }
        )
        .catch(
            error => {
				this.setState( { showLoader : false } )
                console.error(error)
            }
        );
    };

    render() {
		return(
			<div className="col-10">
				<IntroModal />
				<LoadingImg show={this.state.showLoader} />

					<div className="row d-flex no-gutters">
						<div className="col-12">
							<h2>Find A Project</h2>
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
							><i className="material-icons">search</i> Search</button>
						</li>
						<li className="col-2 d-flex"></li>
					</ul>

					<SearchFilterModal 
						showFilterModal={this.state.showFilterModal}
						data={this.state.project} 
						labels={this.state.defaultLabels}
						handleLabelFacetsChange={ (e,i)=> this.handleLabelFacetsChange(e,i)}
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
					/>

			
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
						<FindProjectDataTable 
							userData={JSON.parse(sessionStorage.getItem('user'))}
							data={this.state.project}
							handleColumnSort={ (columnID, columnSortOrder) => this.handleColumnSort(columnID, columnSortOrder)}
							handleAdminStatusChange={this.handleAdminStatusChange}
						/>
					</div>

			</div>
		)
	}
};

export default withRouter(FindProjectPage);
