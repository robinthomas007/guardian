import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap';

class LabelsDropDown extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    getLabelOptions = () => {
        const { data } = this.props;
        let modifiedData = data;
        if(modifiedData[0].id !== '') {
            modifiedData.unshift( {id: '', name:''} )
        }
        const labelOptions = modifiedData.map( (option) => {
            return(
                <option value={option.id}>{option.name}</option>
            )
        })
        return(labelOptions)
    };

    render() {
        return(
            <div>
                <Form.Label id="labelName">Label/Company</Form.Label> 
                <Form.Control 
                    id={this.props.id}
                    as="select" 
                    className='col-form-label dropdown col-4 requiredInput' 
                    value={this.state.Labels}
                    onChange={this.props.onChange}
                >
                    {this.getLabelOptions()}

                </Form.Control>
            </div>
        )
    };
};

export default LabelsDropDown;