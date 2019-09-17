import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {formatDateToYYYYMMDD} from '../../../Utils';

class BlockingPolicyDateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : this.props.value,
            disabled : false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = this.state;
        let modifiedValue = formatDateToYYYYMMDD(e.target.value);
        this.setState( {value : modifiedValue} );
        this.props.onChange(e);
    };

    componentDidMount() {
        this.setState( {value : this.props.data} )
    }

    render() {
        return(
            <input
                id="expirationDate" 
                className={'form-control'} 
                type='date'
                value={this.props.data}
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