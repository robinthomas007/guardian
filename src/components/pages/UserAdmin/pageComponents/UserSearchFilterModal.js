import React, { Component } from 'react';
import {Form} from 'react-bootstrap'; 
import LabelsMultiSelect from '../pageComponents/LabelsMultiSelect'
// import NameIdDropdown from '../pageComponents/NameIdDropdown';

class UserSearchFilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLabelOptions : []
        }
    }

    render() {
        return(
            <div className={this.props.showFilterModal ? "search-filters collapse show" : "search-filters collapse"} id="collapsePanel">
                <div className="card card-body">
                    <h5>Search Filters</h5>

                    <br />

                    <div className="row no-gutters">
                        <div className="col-2">
                            <label>By Label</label>	
                        </div>

                        <div className="col-10">
                            <LabelsMultiSelect 
                                options={this.props.releasingLabels} 
                                onChange={(e,label) => this.props.handleSearchFilterLabelChange(e, label) }
                                defaultText="Select Option"
                                selectedOptions={this.props.selectedFilterLabelOptions}
                                id={'filterReleasingLabels'}
                            />
                        </div>

                        <div className="col-2">
                            <label>Last Updated</label>
                        </div>

                        <div className="col-10">
                            <Form.Control 
                                id="filterStartDate"
                                type="date" 
                                onChange={this.props.handleDateFilter} 
                            />
                            &nbsp;
                            <label>to</label>
                            &nbsp; &nbsp;
                            <Form.Control 
                                id="filterEndDate"
                                type="date" 
                                onChange={this.props.handleDateFilter} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSearchFilterModal;