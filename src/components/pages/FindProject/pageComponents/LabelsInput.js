import React, { Component } from 'react';

class LabelsInput extends Component {
    constructor(props) {
		super(props);
		this.state = {
            defaultLabels : []
        }
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange = (e, i) => {
        this.props.onChange(e, i);
	}

    getLabelOptions = () => {

        if(this.state.defaultLabels !== this.props.data && this.state.defaultLabels.length <= 0) {
            this.setState( {defaultLabels : this.props.data} )
        }
        
        const labelOptions = this.state.defaultLabels.map( (label, i) => {
            const index = i;
            return(
                <a className="dropdown-item" key={i}>
                    <label className="custom-checkbox"> 		
                        <input   
                            onClick={(e, i) => this.handleChange(e, index)}
                            type='checkbox'
                            id={label.id}
                            value={label.id}
                            checked={label.checked}
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
        
        return(labelOptions)
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

export default LabelsInput;