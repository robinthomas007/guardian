import React, { Component } from 'react';
import {Table, Grid, Button, Form, Alert } from 'react-bootstrap'; 
import Noty from 'noty';

class ReleasingLabelsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.user,
            value : this.props.value,
            onChange : this.props.onChange,
        }

        this.getReleasingLabelOptions = this.getReleasingLabelOptions.bind(this);
    }

    getReleasingLabelOptions() {

        let labelOptions = ''
        let defaultLabelID = ''
        if(this.props.user && this.props.user.ReleasingLabels) {
            labelOptions = this.props.user.ReleasingLabels.map( (label, i) =>
                <option key={i} value={label.id}>{label.name}</option>
            )
        }
        return(labelOptions)
    }

    showNotification(){

        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved and submitted for intial protection.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show() 
    };

    render() {

        return(
            <Form.Control 
                id="projectReleasingLabelID" 
                as="select" 
                className='col-form-label dropdown col-3' 
                value={this.props.value}
                onChange={this.state.onChange}
            >
                {this.getReleasingLabelOptions()}
            </Form.Control>
        )
    }
}

export default ReleasingLabelsInput;