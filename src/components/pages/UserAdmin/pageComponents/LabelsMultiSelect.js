import React, { Component } from 'react';

class LabelsMultiSelect extends Component {
    constructor(props) {
		super(props);
		this.state = {
            defaultLabels : [],
            options : [],
            selectedOptions : []
        }
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange = (e, label) => {
        this.props.onChange(e, label)
	};

    isChecked = (labelID) => {
        return (this.props.selectedOptions.indexOf(labelID) >= 0 )
    };

    getLabelOptions = () => {
        return(
            this.props.options.map( (label, i) => {
                return(
                    <a className="dropdown-item" key={i}>
                        <label className="custom-checkbox"> 		
                            <input   
                                onChange={(e) => this.handleChange(e, label)}
                                type='checkbox'
                                id={label.id}
                                value={label.id}
                                defaultChecked={this.isChecked(label.id)}
                                labelname={label.name}
                            />
                            <span className="checkmark "></span>
                        </label>
                        
                        <label htmlFor={label.id}>
                            {label.name}
                        </label>
                    </a>
                )
            })
        )
    };

    render() {
        return(
			<div className="multi-select dropdown">
				<button 
					className="btn btn-secondary dropdown-toggle" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false">
					{this.props.defaultText}
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.getLabelOptions()}
				</div>
			</div>
        )
    }
};

export default LabelsMultiSelect;