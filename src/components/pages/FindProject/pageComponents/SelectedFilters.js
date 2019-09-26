import React, { Component } from 'react';

class SelectedFilters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            labels : [

            ]
        }
    }

    getLabels = () => {
        const labels = this.props.data.labelIds.map( (label, i) => {
            return (
                <button className="btn btn-sm btn-secondary" onClick={ () => this.props.removeLabelsFilter(i)}>{label}<i className="material-icons">close</i></button>    
            )           
        })
        return(labels)
    }

    render() {
        return(
            <ul className="row search-row filters">
                <li className="col-2 d-flex"></li>
                <li className="col-8 d-flex">
                    Selected Filters:
                    <span><label>Label: </label> 
                       {this.getLabels()}
                    </span>
                    <span><label>Last Update: </label> <button className="btn btn-sm btn-secondary">12/28/2018 <i className="material-icons">close</i></button></span>
                </li>
                <li className="col-2 d-flex"></li>
            </ul>
        )
    }
}

export default SelectedFilters;