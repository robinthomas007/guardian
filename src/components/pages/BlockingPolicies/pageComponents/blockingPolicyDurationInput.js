import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 

class BlockingPolicDurationInput extends Component {

    constructor(props) {
		super(props);
		this.state = {
            options : [
                {value : '', text : 'Select One'},
                {value : '', text : '> 30 sec'},
                {value : '', text : '> 1:00'},
                {value : '', text : '> 1:30'},
                {value : '', text : '> 2:00'},
                {value : '', text : '> 2:30'}
            ],
            value : this.props.data
        }
    }

    onChange = (e) => {
        this.props.onChange(e);
    }

    getOptions = () => {
        return(
            this.state.options.map( (option, i) => {
                const selectedOption = (option.text === this.props.data) ? 'selected' : ''
                return(
                    <option key={i} value={option.text} selectedOption>{option.text}</option>
                )
            })
        )
    };

    render() {
        return(
            <Form.Control 
                id="duration" 
                as="select" 
                className='col-form-label dropdown col-4 allowance' 
                value={this.state.value}
                onChange={this.onChange}
                siteName={this.props.siteName}
                siteIndex={this.props.siteIndex}
                setIndex={this.props.setIndex}
                inputTarget={this.props.inputTarget}
            >
            {this.getOptions()}
        </Form.Control>
        )
    }
}

export default BlockingPolicDurationInput;