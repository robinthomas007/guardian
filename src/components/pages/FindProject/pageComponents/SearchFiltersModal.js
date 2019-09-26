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
                            data={this.props.data.Facets.LabelFacets} 
                            onChange={this.props.handleLabelFacetsChange}
                            defaultText="Select Option"
                        />
                    </div>

                    <div className="col-2">
                        <label>By Status</label>
                    </div>

                    <div className="col-4">
                        <NameIdDropdown 
                            data={this.props.data.Facets.StatusFacets}
                            onChange={this.props.handleStatusFacetsChange}
                            defaultText="Select Option"
                        />		
                    </div>

                    <div className="col-2">
                        <label>Has Audio</label>
                    </div>
                    <div className="col-4">
                        <NameIdDropdown 
                            data={this.props.data.Facets.HasAudioFacets}
                            onChange={this.props.handleHasAudioFacetsChange}
                            defaultText="Select Option"
                        />
                    </div>

                    <div className="col-2">
                        <label>Has Blocking</label>
                    </div>
                    <div className="col-4">
                        <NameIdDropdown 
                            data={this.props.data.Facets.HasBlockingFacets}
                            onChange={this.props.handleHasBlockingFacetsChange}
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
                            onChange={this.props.setDateFilter} 
                        />
                        
                        <label> to</label>
                        
                        <Form.Control 
                            id="filterEndDate"
                            type="date" 
                            onChange={this.props.setDateFilter} 
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default SearchFilterModal;