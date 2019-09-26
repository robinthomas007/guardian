
import React, { Component } from 'react';

class ProjectViewDropDown extends Component {
	constructor(props) {
        super(props);
        this.state = {
            viewCount : [
                10,
                25,
                50
            ]
		}
    }
    
    onChange = (value) => {
        this.props.onChange(value)
    };

    getViewCount = () => {
        const options = this.state.viewCount.map( (option, i) => {
            return(
                <a key={i} className="dropdown-item" onClick={ (val) => this.onChange(option) }>{option}</a>
            )
        })

        return(options)
    };

    render() {
        return (
            <div className="dropdown show">
                <a 
                    className="btn btn-secondary dropdown-toggle" 
                    href="#" 
                    role="button" 
                    id="viewCountdropdown" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                >
                    {this.props.itemsPerPage}    
                </a>
                <div className="dropdown-menu" aria-labelledby="viewCountdropdown">
                    {this.getViewCount()}
                </div>
            </div>
        )
    }
};

export default ProjectViewDropDown;

