import React, { Component } from 'react';

class SelectedFilters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data : {
                labels : [],
                audios : [],

            }
        }
    }

    getFilterBubbles = (headerText, bubbles) => {
        return(
            <span>
                <label>{headerText}:</label>
                {bubbles}
            </span>
        )
    };

    formatToDateText = (date) => {
		let toDate = new Date(date);
			toDate.setHours(0,0,0);	
			toDate.setDate(toDate.getDate() - 1);
		return((toDate.getMonth() + 1).toString().padStart(2, '0') + ' / ' + toDate.getDate().toString().padStart(2, '0') + ' / ' + toDate.getFullYear())
    };

    formatFromDateText = (date) => {
		let toDate = new Date(date)
			toDate.setHours(0,0,0);	
            toDate.setDate(toDate.getDate() + 1)
		return((toDate.getMonth() + 1).toString().padStart(2, '0') + ' / ' + toDate.getDate().toString().padStart(2, '0') + ' / ' + toDate.getFullYear())
    };

    getDatebubbles = () => {
        const toDate = this.getToDateFilters();
        const fromDate = this.getFromDateFilters();
        return( (toDate || fromDate) ? <span className="date-bubbles"><label>Last Update: </label><div>{fromDate}</div><div>{toDate}</div></span> : null)
    };

    isSelectedLabel = (labelID) => {
        return(
            this.props.labelsAll.map( (label, i) => {
                if(labelID === label.id) {
                    return(label.name)
                } else {
                    return(null)
                }
            })
        )        
    };

    getLabelFilters = () => {
        let count = 0;
        const labels = this.props.filters.labelIds.map( (labelID, i) => {
            let labelName = this.isSelectedLabel(labelID);
            return ( (labelName) ? <button key={i} className="btn btn-sm btn-secondary" onClick={ () => this.props.removeLabelsFilter(labelID)}>{labelName}<i className="material-icons">close</i></button> : null)
        })
         return( (labels.length > 0 ) ? this.getFilterBubbles('Labels', labels) : null)
    };

     getToDateFilters = () => {
        return ( this.props.filters.to ? this.getFilterBubbles('To', <button className="btn btn-sm btn-secondary" onClick={ (e) => this.props.removeDateFilter('to')}>{this.formatToDateText(this.props.filters.to)}<i className="material-icons">close</i></button>) : '')
    };

    getFromDateFilters = () => {
        return ( this.props.filters.from ? this.getFilterBubbles('From', <button className="btn btn-sm btn-secondary" onClick={ () => this.props.removeDateFilter('from')}>{this.formatFromDateText(this.props.filters.from)}<i className="material-icons">close</i></button>) : '')
    };

    componentDidMount() {
        if(this.state.labels !== this.props.data) {
            this.setState( {labels : this.props.data} )
        } 
    };



    getSelectedFilters = () => {
        const labelFilters = this.getLabelFilters();
        const dateFilters = this.getDatebubbles();

        if(labelFilters || dateFilters) {
            return(
                <div className="selected-filters row d-flex flex-nowrap no-gutters">
                    <div className="col-auto">
                    Selected Filters:
                    </div>
                    <div className="col-10">
                        {labelFilters}
                        {dateFilters} 
                    </div>
                </div>
            )
        } else {
            return(null)
        }
    };

    render() {
        return(
            <ul className="row search-row filters">
                <li className="col-2 d-flex"></li>
                <li className="col-8 d-flex">{this.getSelectedFilters()}</li>
                <li className="col-2 d-flex"></li>
            </ul>
        )
    }
}

export default SelectedFilters;