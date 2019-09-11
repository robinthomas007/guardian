import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 

class BlockingPolicDurationInput extends Component {

    constructor(props) {
		super(props);
		this.state = {
            options : [
                {value : '', text : 'Select Duration'},
                {value : '', text : '> 30 sec'},
                {value : '', text : '> 1:00'},
                {value : '', text : '> 1:30'},
                {value : '', text : '> 2:00'},
                {value : '', text : '> 2:30'}
            ]
        }
    }

    onChange = (e) => {
        
    }

    getOptions = () => {
        return(
            this.state.options.map( (option, i) => {
                return(
                    <option key={i} value={option.text}>{option.text}</option>
                )
            })
        )
    };

    render() {
        return(
            <Form.Control 
                id="projectTypeID" 
                as="select" 
                className='col-form-label dropdown col-4' 
                value={this.props.data}
                onChange={this.onChange}
            >
            {this.getOptions()}
        </Form.Control>
        )
    }

}

export default BlockingPolicDurationInput;