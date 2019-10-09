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
            <div className="search-filters collapse" id="collapseExample">
                <div className="card card-body">
                    <h5>Search Filters</h5>

                    <br />

                    <div className="row no-gutters">
                        <div className="col-2">
                            <label>By Label</label>	
                        </div>

                        <div className="col-4">
                            <LabelsInput 
                                data={this.props.labels} 
                                onChange={(e,i) => this.props.handleLabelFacetsChange(e,i)}
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
                                id={'filterStatus'}
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
                                id={'filterHasAudio'}
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
                                id={'filterHasBlocking'}
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
                            
                            <label> to </label>
                            
                            <Form.Control 
                                id="filterEndDate"
                                type="date" 
                                onChange={this.props.setDateFilter} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchFilterModal;