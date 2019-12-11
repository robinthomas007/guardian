import React, { Component } from 'react';
import {Form} from 'react-bootstrap'; 


class SearchFiltersPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="search-filters collapse" id="collapsePanel">
                <div className="card card-body">
                    <h5>Search Filters</h5>

                    <br />

                    <div className="row no-gutters">
                       <div className="col-4">
                        
                            <label>By Label</label>	
                            Dropdown
                          
                        </div> 

                    <div className="col-8">
                      
                            <label>Date Created</label>
                      
                    
                            <Form.Control 
                                id="filterStartDate"
                                type="date" 
                                onChange={this.props.setDateFilter} 
                            />
                            &nbsp;
                            <label>to</label>
                            &nbsp; &nbsp;
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

export default SearchFiltersPanel;