import React, { Component } from 'react';

class LabelsMultiSelect extends Component {
    constructor(props) {
		super(props);
		this.state = { }
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange = (e, option) => {
        this.props.onChange(e, option)
	};

    getLabelOptions = () => {
        return(
            this.props.options.map( (option, i) => {
                return(
                    <a className="dropdown-item" key={i}>
                        <label className="custom-checkbox"> 		
                            <input   
                                onChange={(e) => this.handleChange(e, option)}
                                type='checkbox'
                                id={option.id}
                                value={option.id}
                                checked={this.props.selectedOptions.indexOf(option.id) >= 0 ? true : false}
                                labelname={option.name}
                            />
                            <span className="checkmark "></span>
                        </label>
                        
                        <label htmlFor={option.id} className={'option-label'}>
                            {option.name}
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