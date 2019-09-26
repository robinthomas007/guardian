import React, { Component } from 'react';
import {Table, Grid, Button, Form, Pagination, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 
import LabelsInput from '../pageComponents/LabelsInput';
import NameIdDropdown from '../pageComponents/NameIdDropdown';

class SearchFilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return(
            <div className={this.props.showFilterModal ? "dropdown-menu search-filters d-block" : "dropdown-menu search-filters d-none"} aria-labelledby="dropdownMenuButton">
                <h5>Search Filters</h5>

                <br />

                <div className="row no-gutters">
                    <div className="col-2">
                        <label>By Label</label>	
                    </div>

                    <div className="col-4">
                        <LabelsInput 
                            data={this.props.data} 
                            onChange={this.props.onChange}
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
        )
    }
};

export default SearchFilterModal;