import React, { Component } from 'react';

class AdminStatusDropdown extends Component {
    constructor(props) {
		super(props);
		this.state = {
			selectedID : this.props.selectedID,
			selectedText : this.props.selectedText
		}
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(data) {

        if(this.state.selectedID !== data.id) {
            this.setState({
                selectedID : data.id,
                selectedText : data.name,
            }, () => {
                this.props.onChange(data, this.props.project)
            })
        }
	}

	getOptions = () => {
		if(this.props.options) {
			const inputOptions = this.props.options.map( (option, i) => {
				return(<a key={i} className={parseInt(this.props.selectedID) === option.id ? "dropdown-item selected" : "dropdown-item"} onClick={() => this.handleChange(option)}>{option.name}</a>)
			})
			return(inputOptions)
		}
	}

    render() {
        return(
			<div className="dropdown">
				<button 
					className="btn btn-secondary dropdown-toggle" 
					type="button" 
					id={this.props.id}
					ref={this.props.id}
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false">
					{this.props.selectedText}
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.getOptions()}
				</div>
			</div>
        )
    }
}

export default AdminStatusDropdown;