import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 

class BlockingPolicDurationInput extends Component {

    constructor(props) {
		super(props);
		this.state = {
            options : [
                {value : '', text : 'Select One', selected : true},
                {value : '> 30 sec', text : '> 30 sec', selected : false},
                {value : '> 1:00', text : '> 1:00', selected : false},
                {value : '> 1:30', text : '> 1:30', selected : false},
                {value : '> 2:00', text : '> 2:00', selected : false},
                {value : '> 2:30', text : '> 2:30', selected : false}
            ],
            value : ''
        }
    }

    onChange = (e) => {
        this.setState( {value : e.target.value} )
        this.props.onChange(e);
    }

    getOptions = () => {
        return(
            this.state.options.map( (option, i) => {
                return(
                    <option key={i} value={option.value}>{option.text}</option>
                )
            })
        )
    };

    componentDidMount() {
        this.setState( {value : this.props.data} )
    }

    render() {
        return(
            <Form.Control 
                id={this.props.id} 
                as="select" 
                className='col-form-label dropdown col-4 allowance' 
                value={this.props.data}
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