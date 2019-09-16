import React, { Component } from 'react';
import { Form } from 'react-bootstrap'; 

class BlockingPolicyDateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            disabled : false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = this.state;
        let modifiedValue = e.target.value;
        this.setState( {value : modifiedValue} );
        this.props.onChange(e);
    };

    render() {
        return(
            <input
                id="expirationDate" 
                className={'form-control'} 
                type='date'
                value={this.state.value}
                disabled={this.state.disabled}
                onChange={this.handleChange}
                siteName={this.props.siteName}
                siteIndex={this.props.siteIndex}
                setIndex={this.props.setIndex}
                inputTarget={this.props.inputTarget}
            />
        )
    }
};

export default BlockingPolicyDateInput;