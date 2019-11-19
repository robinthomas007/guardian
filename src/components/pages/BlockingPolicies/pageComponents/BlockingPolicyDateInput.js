import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {formatDateToYYYYMMDD, } from '../../../Utils';

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
        e.target.velue = e.target.value
        this.setState( {value : e.target.value} );
        this.props.onChange(e);
    };


   componentWillReceiveProps(nextProps) {
        if(this.props.data != this.state.value) {
            this.setState({ value: this.props.data });
        }
    }

    render() {

        return(
            <input
                id="expirationDate" 
                className={'form-control'} 
                type='date'
                value={this.props.disabled ? '' : this.state.value}
                disabled={this.props.disabled}
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