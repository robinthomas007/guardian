import React, { Component } from 'react';

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
        if(this.props.data.labelFacets) {

			labelOptions = this.props.data.labelFacets.map( (label, i) => {
				const isChecked = (this.props.data.searchCriteria.filter.labelIds.indexOf(label.id) >= 0) ? true : false;
				return(
					<a className="dropdown-item" key={i}>
						<label className="custom-checkbox"> 		
							<input   
								onChange={(e) => this.props.onChange(e, label.name)}
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
};

export default LabelsInput;