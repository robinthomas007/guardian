import React, { Component } from 'react';

class LabelsInput extends Component {
    constructor(props) {
		super(props);
		this.state = {
            selectedLabels : [],
            data : [],
            labelList : [],
            defaultLabels : []
        }
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(e) {
        const { selectedLabels } = this.state;
        let modifiedSelectedLabels = selectedLabels;

        (e.target.checked) ? modifiedSelectedLabels.push(e.target.value) : modifiedSelectedLabels.splice(modifiedSelectedLabels.indexOf(e.target.value), 1);
        e.target.checked = e.target.checked

        this.setState( {
            selectedLabels : modifiedSelectedLabels,
        } )

		this.props.onChange(e);
	}

    getLabelOptions = () => {

        if(this.state.defaultLabels !== this.props.data && this.state.defaultLabels.length <= 0) {
            this.setState( {defaultLabels : this.props.data} )
        }
        
        const labelOptions = this.state.defaultLabels.map( (label, i) => {

            const isChecked = (this.state.selectedLabels.indexOf(label.id) >= 0) ? true : false;

            return(
                <a className="dropdown-item" key={i}>
                    <label className="custom-checkbox"> 		
                        <input   
                            onClick={(e) => this.handleChange(e)}
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