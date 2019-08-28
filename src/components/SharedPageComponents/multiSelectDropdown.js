
import React, { Component } from 'react';

class MultiSelectDropDown extends Component {
    constructor(props) {
		super(props);
		this.state = {
			value : [],
			show : false
        }
		this.handleChange = this.handleChange.bind(this);
    }

	toggleShow = () => {
		this.setState( {show : true} )
	}

	handleChange(e) {
        const { value } = this.state;
        let modifiedValue = value;
        let inputValue = e.target.value;

        if(e.target.checked) {
            modifiedValue.push(inputValue)
        } else {
            let index = modifiedValue.indexOf(inputValue) 
            if(index !== -1) {
                modifiedValue.splice(index, 1) 
            }
        }

        this.setState( {value : modifiedValue} )
        if(this.props.onChange) {
            this.props.onChange(e, modifiedValue) 
        }
	}

    getInputOptions = () => {
        let labelOptions = ''
        if(this.props.data) {
			labelOptions = this.props.data.map( (option, i) => {
				return(
					<a className="dropdown-item" key={i}>
						<label className="custom-checkbox"> 		
							<input   
								onChange={(e) => this.handleChange(e)}
								type='checkbox'
								id={this.props.id + '_check_' + i}
								value={option.id}
							/>
							<span className="checkmark "></span>
						</label>
						
						<label htmlFor={this.props.id + '_check_' + i}>
							{option.name}
						</label>
					</a>
				   )
            })
            return(labelOptions)
        } else {
            return(null)
        }
    }

    render() {
        return(
			<div className="multi-select dropdown">
				<button 
					className="btn btn-secondary dropdown-toggle" 
					type="button" 
					id="dropdownMenuButton" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false"
				>
					{this.props.placeHolder}
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.getInputOptions()}
				</div>
			</div>
        )
    }
};

export default MultiSelectDropDown;